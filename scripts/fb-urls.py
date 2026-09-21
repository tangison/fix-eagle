#!/usr/bin/env python3
"""Extract full-resolution variants for every collected photo ID and hunt
for post text context around the new families (284210*, 283016*, 265665*).
Task-5 download trick: drop the stp/ctp downscale params to get the
original upload size.
"""
import re
import json
from pathlib import Path

FB = Path("/tmp/fb")
NEW_FAMILIES = ("284210", "283016", "265665")


def clean(u: str) -> str:
    return u.replace("\\/", "/").replace("&amp;", "&").replace("\\u0025", "%")


def main():
    urls_by_id: dict[str, list[str]] = {}
    for f in sorted(FB.glob("*.html")):
        raw = f.read_text()
        for u in re.findall(r'https://scontent[^"\'\\\s<>]+', raw.replace("\\/", "/")):
            u = clean(u)
            m = re.search(r'/(\d{9,15})_(\d{9,25})_\d+_n\.', u)
            if not m:
                continue
            bid = f"{m.group(1)}_{m.group(2)}"
            urls_by_id.setdefault(bid, [])
            if u not in urls_by_id[bid]:
                urls_by_id[bid].append(u)

    # Build candidate full-res URLs: prefer stp-less, else strip params
    results = {}
    for bid, urls in sorted(urls_by_id.items()):
        # dedupe by query signature, keep longest (usually biggest)
        full = [u for u in urls if "stp=" not in u and "ctp=" not in u]
        sized = [u for u in urls if u not in full]
        # strip-down candidate: take the largest sized URL, drop stp/ctp/ctp bits
        strip_cand = None
        if sized:
            biggest = max(sized, key=len)
            stripped = re.sub(r"(stp|cstp|ctp)=[^&]*&?", "", biggest).rstrip("?&")
            strip_cand = stripped
        results[bid] = {
            "full_url": full[0] if full else None,
            "strip_candidate": strip_cand,
            "all_count": len(urls),
        }

    (FB / "photo-urls.json").write_text(json.dumps(results, indent=2))
    print(f"photo ids: {len(results)}, with full_url: "
          f"{sum(1 for r in results.values() if r['full_url'])}, "
          f"with strip_candidate: "
          f"{sum(1 for r in results.values() if r['strip_candidate'])}")

    # Context hunt for new families in m-profile.html
    prof = (FB / "m-profile.html").read_text()
    prof_plain = prof.replace("\\/", "/").replace("&amp;", "&")
    for fam in NEW_FAMILIES:
        idxs = [m.start() for m in re.finditer(fam + r"\d{6,}", prof_plain)]
        print(f"\n=== family {fam}: {len(idxs)} mentions ===")
        # grab readable text snippets near first mentions
        shown = 0
        for ix in idxs:
            seg = prof_plain[max(0, ix - 3000): ix + 3000]
            texts = re.findall(r'"text":"([^"]{25,240})"', seg)
            if not texts:
                texts = re.findall(r'>([^<>]{25,240})<', seg)
            for t in texts:
                t = t.encode().decode("unicode_escape", "ignore").strip()
                if re.search(r"[A-Za-z]{4}", t) and not re.search(
                        r"(font|px|width|height|css|span|div|color)", t, re.I):
                    print("   ", t[:180])
                    shown += 1
                    break
            if shown >= 4:
                break


if __name__ == "__main__":
    main()
