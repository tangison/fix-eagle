#!/usr/bin/env python3
"""Deep-parse the Scrapling-saved Facebook HTML files:
- collect every scontent photo URL, normalise to (base_id, full_variant)
- collect post permalinks and their nearby text
- flag photo IDs not already represented in the site register
"""
import re
import json
from pathlib import Path

FB = Path("/tmp/fb")

# Map of existing vehicle photo IDs (from Task 5 register, for diffing)
KNOWN = {
    "renault-koleos": "28381700051450264",
    "vw-amarok": "28380572008229735",
    "wanted": "28378541278432808",
    "nissan-note": "28340496302237306",
    "jeep-patriot": "28323327190620884",
    "ford-ranger": "28193867816900156",
    "mercedes-b": "28193727313580873",
}

def parse(file: Path):
    html = file.read_text()
    # scontent URLs (unescape &amp;)
    raw = html.replace("&amp;", "&")
    urls = re.findall(r'https://scontent[^"\'\\\s<>]+', raw)
    base_ids = set()
    full_variants = {}
    for u in urls:
        u = u.split("\\u0025")[0]
        m = re.search(r'/(\d{9,15})_(\d{9,25})_\d+_n\.', u)
        if not m:
            continue
        bid = f"{m.group(1)}_{m.group(2)}"
        base_ids.add(bid)
        # a "full" variant = stp dropped (Task-5 trick)
        if "stp=" not in u:
            full_variants.setdefault(bid, u)
        else:
            # keep the biggest listed cstp/ctp as fallback
            full_variants.setdefault(bid + "::sized", u)
    posts = sorted(set(re.findall(
        r'https://(?:www|m)\.facebook\.com/(?:fixeagle|niklaas\.n\.kisilipile)'
        r'/(?:posts|photos|videos)/(?:pfbid[\w]+|\d+)', raw)))
    return base_ids, full_variants, posts, raw


def main():
    all_ids = {}
    all_posts = set()
    for f in sorted(FB.glob("*.html")):
        ids, variants, posts, raw = parse(f)
        for bid in ids:
            all_ids.setdefault(bid, f.stem)
        all_posts |= set(posts)
        print(f"{f.stem}: photo_ids={len(ids)} posts={len(posts)}")

    print(f"\nUNIQUE PHOTO IDS ACROSS FILES: {len(all_ids)}")
    for bid, src in sorted(all_ids.items()):
        marker = ""
        for name, pid in KNOWN.items():
            fam = pid[:7]
            if bid.split("_")[1].startswith(fam[:6]):
                marker = f"  <- in register ({name})"
        print(f"  {bid}  (from {src}){marker}")

    print(f"\nPOST PERMALINKS ({len(all_posts)}):")
    for p in sorted(all_posts):
        print("  ", p.split("?")[0][:140])

    with open(FB / "collected.json", "w") as out:
        json.dump({
            "photo_ids": sorted(all_ids),
            "posts": sorted(all_posts),
        }, out, indent=2)


if __name__ == "__main__":
    main()
