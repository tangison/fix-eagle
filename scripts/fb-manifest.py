#!/usr/bin/env python3
"""Build the download manifest from the per-post browser captures:
- dedupe signed scontent URLs per post, prefer variants with the largest
  cstp cap (mx2048) since dropping ctp yields the original size
- extract full post text and date
- emit /tmp/fb/manifest.json
"""
import json
import re
from pathlib import Path

POSTS = Path("/tmp/fb/posts")
OUT = Path("/tmp/fb/manifest.json")


def best_urls(urls: list[str]) -> dict[str, str]:
    """Group signed urls by photo id; keep the one with the largest cstp cap."""
    best: dict[str, str] = {}
    for u in urls:
        m = re.search(r"/(\d{9,15})_(\d{9,25})_\d+_n\.(?:jpg|png|webp)", u)
        if not m:
            continue
        bid = f"{m.group(1)}_{m.group(2)}"
        cap = 0
        mm = re.search(r"cstp=mx(\d+)x(\d+)", u)
        if mm:
            cap = int(mm.group(1)) * int(mm.group(2))
        cur = best.get(bid)
        if cur is None or cap > cur[0]:
            best[bid] = (cap, u)
    return {k: v[1] for k, v in best.items()}


def clean_text(t: str) -> str:
    t = re.sub(r"\s+", " ", t)
    # cut the login scaffolding
    for pat in (r"Log in Forgotten account\? (.*)$",
                r"Niklaas Nicky Kisilipile's post (.*)$"):
        m = re.search(pat, t)
        if m:
            t = m.group(1)
            break
    return t.strip()


def main():
    manifest = {}
    for f in sorted(POSTS.glob("*.json")):
        key = f.stem
        raw = f.read_text().strip()
        if raw.startswith('"'):
            raw = json.loads(raw)
        d = json.loads(raw)
        urls = best_urls(d.get("imgs", []))
        text = clean_text(d.get("text", ""))
        dm = re.search(
            r"(\d{1,2} \w+ at \d{1,2}:\d{2}|\d{1,2} \w+|Just now|Yesterday)", text)
        manifest[key] = {
            "photo_urls": urls,
            "og_image": d.get("og", {}).get("og:image"),
            "og_title": d.get("og", {}).get("og:title"),
            "text": text[:1600],
            "date_hint": dm.group(1) if dm else None,
            "links": [l.split("?")[0] for l in d.get("links", [])][:6],
        }
        print(f"== {key}: {len(urls)} photos, date={manifest[key]['date_hint']!r}")
        print("   text:", text[:280])
        for bid, u in urls.items():
            print(f"    {bid} cap={'mx2048' if 'mx2048' in u else 'other'}")
    OUT.write_text(json.dumps(manifest, indent=2))
    print(f"\nmanifest saved: {OUT}")


if __name__ == "__main__":
    main()
