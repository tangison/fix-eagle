#!/usr/bin/env python3
"""Download every harvested Fix Eagle photo at full resolution.
Trick: drop the ctp param from the signed URL (signature does not cover
it), yielding the original upload size. Adds the September-clearance
Nissan Note photos from the earlier DOM capture. Falls back to the
served variant when the full-res fetch fails. Paces requests politely.
"""
import json
import re
import subprocess
import time
from pathlib import Path

DL = Path("/tmp/fb/dl")
DL.mkdir(exist_ok=True, parents=True)


def full_res(u: str) -> str:
    return re.sub(r"&ctp=[^&]+", "", u)


def download(u: str, path: Path) -> tuple[str, str]:
    for label, url in (("full", full_res(u)), ("asis", u)):
        r = subprocess.run(
            ["curl", "-sL", "--max-time", "60", "-A",
             "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
             "-o", str(path), "-w", "%{http_code}", url],
            capture_output=True, text=True, timeout=90)
        if r.stdout.strip() == "200" and path.stat().st_size > 5000:
            return label, f"{path.stat().st_size}"
        time.sleep(1)
    return "fail", "0"


def main():
    targets: dict[str, str] = {}  # filename -> url
    manifest = json.loads(Path("/tmp/fb/manifest.json").read_text())
    for post, data in manifest.items():
        for bid, u in data["photo_urls"].items():
            targets[f"{post}_{bid}"] = u

    # September clearance Nissan Note photos from the DOM capture
    dom = json.loads(Path("/tmp/niklaas-imgs.json").read_text().strip()
                     if not Path("/tmp/niklaas-imgs.json").read_text().strip()
                     .startswith('"') else
                     json.loads(Path("/tmp/niklaas-imgs.json").read_text().strip()))
    for x in dom:
        for u in [x["src"]]:
            m = re.search(r"/(\d{9,15})_(\d{9,25})_\d+_n\.", u)
            if m and m.group(2).startswith("284210"):
                targets[f"nissan-sep_{m.group(1)}_{m.group(2)}"] = u

    print(f"downloading {len(targets)} photos ...")
    results = {}
    for name, u in sorted(targets.items()):
        label, size = download(u, DL / f"{name}.jpg")
        results[name] = {"mode": label, "bytes": size}
        print(f"  {name}: {label} {size}")
        time.sleep(2)  # deliberate pacing
    Path("/tmp/fb/dl/results.json").write_text(json.dumps(results, indent=2))
    ok = sum(1 for r in results.values() if r["mode"] != "fail")
    print(f"\ndone: {ok}/{len(results)} downloaded")


if __name__ == "__main__":
    main()
