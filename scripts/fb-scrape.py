#!/usr/bin/env python3
"""Scrapling StealthyFetcher run against Fix Eagle's public Facebook
surface. The client owns this page and its content (their own posts and
photos), so this is an authorized harvest of their own assets.

Targets the mobile endpoints, which historically render more of the
public feed without a login. Saves raw HTML for offline parsing.
"""
import time
import re
from pathlib import Path
from scrapling.fetchers import StealthyFetcher

OUT = Path("/tmp/fb")
OUT.mkdir(exist_ok=True)

TARGETS = [
    ("m-page", "https://m.facebook.com/fixeagle/"),
    ("m-page-videos", "https://m.facebook.com/fixeagle/videos/"),
    ("m-page-photos", "https://m.facebook.com/fixeagle/photos/"),
    ("m-page-photos-all", "https://m.facebook.com/fixeagle/photos_all"),
    ("m-profile", "https://m.facebook.com/niklaas.n.kisilipile"),
    ("m-profile-photos", "https://m.facebook.com/niklaas.n.kisilipile/photos"),
]

POST_LINK_RE = re.compile(
    r'https://(?:www|m)\.facebook\.com/(?:fixeagle|niklaas\.n\.kisilipile)'
    r'/(?:posts|photos|videos|reels)/(?:pfbid[\w]+|\d+)[/\w:.-]*')
IMG_RE = re.compile(r'https://scontent[^"\'\\ ]+?(?:jpg|png|webp)[^"\'\\ ]*')


def report(key: str, html: str):
    (OUT / f"{key}.html").write_text(html)
    posts = sorted(set(m.group(0).split("?")[0] for m in POST_LINK_RE.finditer(html)))
    imgs = sorted(set(m.group(0) for m in IMG_RE.finditer(html)))
    login_wall = "login" in html[:4000].lower() and "password" in html[:20000].lower()
    print(f"== {key}: {len(html)} bytes | login_wall={login_wall} "
          f"| posts={len(posts)} imgs={len(imgs)}")
    for p in posts[:20]:
        print("   post:", p[:130])
    for i in imgs[:8]:
        print("   img :", i[:130])
    return posts, imgs


def main():
    everything = {}
    for key, url in TARGETS:
        try:
            page = StealthyFetcher.fetch(
                url, headless=True, network_idle=True,
                timeout=60000, humanize=True,
            )
            html = page.body  # raw HTML as string in scrapling 0.4
            if isinstance(html, bytes):
                html = html.decode("utf-8", "replace")
            everything[key] = report(key, html)
        except Exception as exc:
            print(f"== {key}: FAILED {type(exc).__name__}: {str(exc)[:200]}")
            everything[key] = ([], [])
        time.sleep(4)  # deliberate pacing between hits
    with open(OUT / "summary.txt", "w") as f:
        for key, (posts, imgs) in everything.items():
            f.write(f"{key}\n  posts: {len(posts)}\n  imgs: {len(imgs)}\n")


if __name__ == "__main__":
    main()
