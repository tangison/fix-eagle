#!/usr/bin/env python3
"""Build contact sheets (labelled grids) per post family so the photos
can be visually inspected and assigned to the right vehicle."""
from PIL import Image, ImageDraw
from pathlib import Path

DL = Path("/tmp/fb/dl")
GROUPS = ["amarok", "jeep", "koleos", "mercedes", "nissan",
          "nissan-sep", "ranger", "wanted", "workhorse"]

THUMB = (420, 315)


def sheet(group: str, files: list[Path]):
    cols = 3
    rows = (len(files) + cols - 1) // cols
    cell_w, cell_h = THUMB[0] + 16, THUMB[1] + 44
    canvas = Image.new("RGB", (cols * cell_w, rows * cell_h), "white")
    d = ImageDraw.Draw(canvas)
    for i, f in enumerate(files):
        im = Image.open(f).convert("RGB")
        im.thumbnail(THUMB)
        x = (i % cols) * cell_w + 8
        y = (i // cols) * cell_h + 34
        canvas.paste(im, (x, y))
        idx = f.name.split("_", 2)[1] if "_" in f.name else f.stem
        d.text((x, y - 22), f"[{i}] {idx}", fill="black")
    canvas.save(DL / f"sheet-{group}.jpg", quality=82)
    print(f"sheet-{group}.jpg: {len(files)} photos")


def main():
    for g in GROUPS:
        files = sorted(DL.glob(f"{g}_*.jpg"))
        if g == "nissan":
            files += sorted(DL.glob("nissan-sep_*.jpg"))
        if files:
            sheet(g, files)


if __name__ == "__main__":
    main()
