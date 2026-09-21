#!/usr/bin/env python3
"""Resolve Facebook post/photo/page URLs to og: metadata (Task-5 method:
mobile UA + follow redirects + parse og: tags from the returned HTML).
Falls back to the alt param variants when a URL 400s."""
import re
import subprocess
import sys
import json
from urllib.parse import quote_plus

UA_MOBILE = ("Mozilla/5.0 (Linux; Android 10; SM-G975F) AppleWebKit/537.36 "
             "(KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36")
UA_DESKTOP = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
              "(KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36")

TARGETS = [
    ("new-post-28184897451130526", "https://www.facebook.com/niklaas.n.kisilipile/posts/28184897451130526"),
    ("photo-28115554454731493", "https://www.facebook.com/niklaas.n.kisilipile/photos/28115554454731493"),
    ("photo-27784498791170396", "https://www.facebook.com/niklaas.n.kisilipile/photos/27784498791170396"),
    ("photo-26853117410975210", "https://www.facebook.com/niklaas.n.kisilipile/photos/26853117410975210"),
    ("page-post-pfbid022X6dok", "https://www.facebook.com/fixeagle/posts/pfbid022X6dokNtBZEYtKcihkCt5P6DHUkMFt88yNnchzb8r1UbPyGKkprCtK1AMRqLavXql"),
    ("page-og", "https://www.facebook.com/fixeagle"),
]


def fetch(url: str, ua: str) -> tuple[int, str]:
    """GET the URL, return (status, body)."""
    try:
        out = subprocess.run(
            ["curl", "-sL", "--max-time", "30", "-A", ua,
             "-w", "\n%{http_code}", url],
            capture_output=True, text=True, timeout=40,
        )
    except subprocess.TimeoutExpired:
        return 0, ""
    body = out.stdout
    if "\n" in body:
        head, _, code = body.rpartition("\n")
        return code.strip(), head
    return 0, body


def og_fields(html: str) -> dict:
    fields = {}
    for prop in ("og:title", "og:description", "og:image", "og:url", "og:type"):
        m = re.search(
            r'<meta[^>]+property="' + re.escape(prop) + r'"[^>]+content="([^"]*)"',
            html)
        if not m:
            m = re.search(
                r'<meta[^>]+content="([^"]*)"[^>]+property="' + re.escape(prop) + '"',
                html)
        if m:
            fields[prop] = m.group(1).replace("&amp;", "&")
    # og:image may appear multiple times; collect user-posted scontent images
    imgs = re.findall(
        r'<meta[^>]+property="og:image"[^>]+content="([^"]*)"', html)
    fields["og:image_all"] = list(dict.fromkeys(
        i.replace("&amp;", "&") for i in imgs))
    return fields


def main():
    results = {}
    for key, url in TARGETS:
        for label, ua in (("mobile", UA_MOBILE), ("desktop", UA_DESKTOP)):
            status, html = fetch(url, ua)
            fields = og_fields(html)
            results[key] = {"status": status, "ua": label, **fields}
            if fields.get("og:image") or fields.get("og:title"):
                break
            # retry the other UA
        print(f"[{key}] status={status} title={fields.get('og:title', '')[:80]!r}")
        for i in fields.get("og:image_all", [])[:6]:
            print(f"    img: {i[:150]}")
        if fields.get("og:description"):
            print(f"    desc: {fields['og:description'][:160]!r}")
    with open("/tmp/fb-resolve.json", "w") as f:
        json.dump(results, f, indent=2)
    print("\nsaved /tmp/fb-resolve.json")


if __name__ == "__main__":
    main()
