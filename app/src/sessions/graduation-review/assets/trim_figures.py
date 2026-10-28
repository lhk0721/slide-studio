"""Trim the white margins the report figures carry into the slide assets.

The figures come from rack-tracker's `make_figures.py` (report #635) with page
margins baked in; on a slide those margins shrink the drawing. This script is the
only way the copies in this folder are altered — rerun it after copying a fresh
set from the report. Photos and screen captures are left alone.

    python trim_figures.py
"""
from pathlib import Path

from PIL import Image

HERE = Path(__file__).parent
GENERATED = [
    "fig01_xray.jpg",
    "fig02_cycle.png",
    "fig14_calib_board.jpg",
    "fig16_rig_os.png",
    "fig22_two_paths.png",
    "fig23_tail_accuracy.png",
    "fig24_load_path.png",
    "fig27_panoptic_cameras.jpg",
    "fig28_instanthmr.png",
    "table1_alternatives.png",
    "table4_jetson.png",
]
WHITE = 242      # anything lighter than this counts as margin
PAD = 0.02       # keep 2% of the short side as breathing room
KEEP_RATIO = 0.9 # skip when trimming removes less than 10% of the area


def trim(path: Path) -> str:
    im = Image.open(path).convert("RGB")
    mask = im.convert("L").point(lambda v: 0 if v > WHITE else 255)
    bbox = mask.getbbox()
    if not bbox:
        return "all white, kept"
    w, h = im.size
    pad = int(min(w, h) * PAD)
    box = (max(0, bbox[0] - pad), max(0, bbox[1] - pad), min(w, bbox[2] + pad), min(h, bbox[3] + pad))
    out = im.crop(box)
    ratio = (out.width * out.height) / (w * h)
    if ratio >= KEEP_RATIO:
        return f"kept ({ratio:.2f})"
    if path.suffix == ".jpg":
        out.save(path, quality=92)
    else:
        out.save(path)
    return f"{(w, h)} -> {out.size} ({ratio:.2f})"


if __name__ == "__main__":
    for name in GENERATED:
        print(name, trim(HERE / name))
