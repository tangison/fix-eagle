#!/usr/bin/env python3
"""Test which query variants serve the biggest image without 403.
Variants: as-is, drop ctp, drop ctp+cstp, bump ctp to full, bump cstp."""
import re
import subprocess
import json

BASE = ("https://scontent-hkg1-2.xx.fbcdn.net/v/t39.30808-6/813361285_"
        "28421027750850827_9101261584932742052_n.jpg?stp=dst-jpg_tt6"
        "&cstp=mx2048x1536&ctp=s960x960&_nc_cat=102&ccb=1-7&_nc_sid=cc71e4"
        "&_nc_ohc=GDnR6oRx7GwQ7kNvwGXfAYt&_nc_oc=Adrdlk5JAYW1y-rkjBVSOhq41Zy"
        "H-1fgkm-Oo5XZcs7URBM207Flk_lvysqNGr8Hp2s&_nc_zt=23&_nc_ht="
        "scontent-hkg1-2.xx&_nc_gid=jJ0TUh3D53sO-8UvOkNFCQ&_nc_ss=7f289"
        "&oh=00_AQKAvzeTst6QmE2_M9m4pnvgyTE0VZa4a_aWRq9M6BqMbQ&oe=6AB66B54")


def variants(u: str) -> dict[str, str]:
    drop_ctp = re.sub(r"&ctp=[^&]+", "", u)
    drop_both = re.sub(r"&(cstp|ctp)=[^&]+", "", drop_ctp)
    bump_ctp = u.replace("ctp=s960x960", "ctp=s2048x2048")
    bump_cstp = u.replace("cstp=mx2048x1536", "cstp=mx4096x4096")
    return {
        "asis": u,
        "drop_ctp": drop_ctp,
        "drop_ctp_cstp": drop_both,
        "bump_ctp_2048": bump_ctp,
        "bump_cstp_4096": bump_cstp,
    }


def size_of(u: str, name: str) -> None:
    r = subprocess.run(
        ["curl", "-sL", "-A", "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
         "-o", f"/tmp/fb/dl/v_{name}.jpg", "-w", "%{http_code} %{size_download}",
         u], capture_output=True, text=True, timeout=60)
    print(f"{name:>16}: {r.stdout}")
    try:
        from PIL import Image
        im = Image.open(f"/tmp/fb/dl/v_{name}.jpg")
        print(f"{'':>16}  -> {im.size}")
    except Exception as e:
        head = open(f"/tmp/fb/dl/v_{name}.jpg", "rb").read(60)
        print(f"{'':>16}  -> not image: {head[:40]!r}")


if __name__ == "__main__":
    for name, u in variants(BASE).items():
        size_of(u, name)
