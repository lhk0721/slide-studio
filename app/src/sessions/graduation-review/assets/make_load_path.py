"""Draw slide 2's load-path figure: one squat bottom frame, four joints, four moment arms.

A slide variant of figure 24 from rack-tracker's report (#635 `make_figures.py`,
`fig24_load_path`). Same frame and drawing, with three changes for the slide: the
floor tick numbers are gone, each joint label carries its distance to the
centre-of-mass line in cm, and the labels are larger. The data file is a copy of
the report's `data/fig24_squat_bottom.json` (session 20261012-115120, set 1, rep 3,
bar 100kg); the distances are its `arm_cm`, rounded.

    python make_load_path.py
"""
import json
import math
from pathlib import Path

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt  # noqa: E402
from matplotlib import rcParams  # noqa: E402
from matplotlib.patches import FancyArrowPatch  # noqa: E402
from matplotlib.transforms import Bbox, offset_copy  # noqa: E402
from PIL import Image, ImageOps  # noqa: E402

HERE = Path(__file__).parent
DATA = HERE / "data" / "fig24_squat_bottom.json"
OUT = HERE / "load_path_arms.png"

ACCENT = "#0072B2"      # the report's accent, kept so this matches slide 15's copy of figure 24
DARK = "#333333"
MID = "#8c8c8c"
LIGHT = "#c9c9c9"
DOTTED = (0, (1.2, 2.2))
DASHED = (0, (4, 3))

BAR_HALF = 60           # half the bar length (cm); plates are not drawn
FLOOR_STEP = 25         # floor grid spacing (cm), as in the session report's 3D replay
VIEW = (25, 50)         # elevation, and turn from the right side toward the front (°)
FOCAL = 4.0
BONES = [("left_shoulder", "right_shoulder"), ("left_shoulder", "left_elbow"), ("left_elbow", "left_wrist"),
         ("right_shoulder", "right_elbow"), ("right_elbow", "right_wrist"), ("left_shoulder", "left_hip"),
         ("right_shoulder", "right_hip"), ("left_hip", "right_hip"), ("left_hip", "left_knee"), ("left_knee", "left_ankle"),
         ("right_hip", "right_knee"), ("right_knee", "right_ankle"), ("left_ankle", "left_heel"),
         ("left_heel", "left_foot_index"), ("right_ankle", "right_heel"), ("right_heel", "right_foot_index"),
         ("nose", "left_eye"), ("nose", "right_eye"), ("left_eye", "left_ear"), ("right_eye", "right_ear")]
# joint key -> (label, label offset in pt, which side of the dot the label sits). The labels left of the line
# sit past the near leg so their white plates do not cut it; the ankle label goes below the line's foot, away from
# the near knee dot
JOINTS = {"ankle": ("발목", (12, -16), "left"), "knee": ("무릎", (8, 8), "left"), "hip": ("골반", (-20, -6), "right"),
          "lumbar": ("허리", (-20, 4), "right")}


class Arrow3D(FancyArrowPatch):
    """Arrow between two 3D points, reprojected on every draw."""

    def __init__(self, p1, p2, **kw):
        super().__init__((0, 0), (0, 0), **kw)
        self._p3d = (p1, p2)

    def do_3d_projection(self, renderer=None):
        from mpl_toolkits.mplot3d import proj3d
        (x1, y1, z1), (x2, y2, z2) = self._p3d
        xs, ys, zs = proj3d.proj_transform((x1, x2), (y1, y2), (z1, z2), self.axes.M)
        self.set_positions((xs[0], ys[0]), (xs[1], ys[1]))
        return min(zs)


def drawn_bbox(fig, pad=0.06):
    """Bounding box (inch) of the inked pixels; tight cropping keeps the empty 3D axes area."""
    import io
    w, h = fig.get_size_inches()
    buf = io.BytesIO()
    fig.savefig(buf, format="png", dpi=100, bbox_inches=Bbox.from_bounds(0, 0, w, h))
    ink = ImageOps.invert(Image.open(buf).convert("L")).point(lambda v: 255 if v > 8 else 0)
    x0, y0, x1, y1 = ink.getbbox()
    return Bbox.from_extents(x0 / 100 - pad, h - y1 / 100 - pad, x1 / 100 + pad, h - y0 / 100 + pad)


def main():
    rcParams["font.family"] = ["Pretendard", "Noto Sans KR", "Malgun Gothic", "sans-serif"]
    D = json.loads(DATA.read_text(encoding="utf-8"))

    def W(v):
        """floor frame (x, y up, z) -> plot axes (x, -z, up)"""
        return (v[0], -v[2], v[1])

    J = {n: W(v) for n, v in D["joints"].items()}
    ml = W(D["ml"])
    ap = W(D["ap"])
    com, bar = W(D["com_sys"]), W(D["bar"])
    pts = {k: W(v) for k, v in D["joint_points"].items()}
    # the detected wrists sit below and in front of the bar; move them onto the bar axis, as figure 24 does
    for side in ("left", "right"):
        s = sum((w - b) * m for w, b, m in zip(J[f"{side}_wrist"], bar, ml))
        J[f"{side}_wrist"] = tuple(b + s * m for b, m in zip(bar, ml))

    fig = plt.figure(figsize=(4.6, 3.6))
    ax = fig.add_axes([0, 0, 1, 1], projection="3d")
    ax.set_axis_off()
    xs = [p[0] for p in J.values()]
    ys = [p[1] for p in J.values()]
    x0, x1 = math.floor(min(xs) / FLOOR_STEP) * FLOOR_STEP, math.ceil(max(xs) / FLOOR_STEP) * FLOOR_STEP
    y0, y1 = math.floor(min(ys) / FLOOR_STEP) * FLOOR_STEP, math.ceil(max(ys) / FLOOR_STEP) * FLOOR_STEP
    top = max(p[2] for p in J.values()) + 5
    ax.set_xlim(x0, x1)
    ax.set_ylim(y0, y1)
    ax.set_zlim(0, top)
    ax.set_box_aspect((x1 - x0, y1 - y0, top), zoom=0.95)
    ax.set_proj_type("persp", focal_length=FOCAL)
    t = math.radians(VIEW[1])
    eye = (math.cos(t) * ml[0] + math.sin(t) * ap[0], math.cos(t) * ml[1] + math.sin(t) * ap[1])
    ax.view_init(elev=VIEW[0], azim=math.degrees(math.atan2(eye[1], eye[0])))

    def line(a, b, **kw):
        ax.plot(*zip(a, b), **kw)

    def dot(p, **kw):
        ax.plot(*[[v] for v in p], marker="o", **kw)

    def tag(p, text, dx, dy, fs=10, color=DARK, ha="center", weight="bold"):
        ax.text(*p, text, fontsize=fs, color=color, ha=ha, va="center", zorder=10, fontweight=weight,
                bbox=dict(facecolor="white", edgecolor="none", pad=1.0),
                transform=offset_copy(ax.transData, fig=fig, x=dx, y=dy, units="points"))

    # floor grid only, no tick numbers
    for v in range(x0, x1 + 1, FLOOR_STEP):
        line((v, y0, 0), (v, y1, 0), color=MID if v in (x0, x1) else LIGHT, lw=0.8 if v in (x0, x1) else 0.5)
    for v in range(y0, y1 + 1, FLOOR_STEP):
        line((x0, v, 0), (x1, v, 0), color=MID if v in (y0, y1) else LIGHT, lw=0.8 if v in (y0, y1) else 0.5)

    # body: far (left) limbs light, near (right) limbs and trunk dark, face thin
    for a, b in BONES:
        if a not in J or b not in J:
            continue
        face = a in ("nose", "left_eye", "right_eye")
        far = a.startswith("left_") and b.startswith("left_")
        line(J[a], J[b], color=MID if far else DARK, lw=1.2 if face else 2.0, solid_capstyle="round")
    for side, color in (("left", MID), ("right", DARK)):
        for k in ("elbow", "knee", "ankle"):
            dot(J[f"{side}_{k}"], ms=3.5, color=color)
    tip = lambda s: tuple(c + s * BAR_HALF * m for c, m in zip(bar, ml))      # noqa: E731
    line(tip(-1), tip(1), color=MID, lw=3.0, solid_capstyle="round")
    tag(tip(1), "바", -14, 12)

    # centre of mass (body + bar) and its vertical line
    line(com, (com[0], com[1], 0), color=ACCENT, lw=1.4, ls=DASHED)
    dot(com, ms=7, color=ACCENT)
    ax.add_artist(Arrow3D(com, (com[0], com[1], com[2] - 12), arrowstyle="-|>", mutation_scale=12, shrinkA=0,
                          shrinkB=0, color=ACCENT, lw=1.4))
    tag(com, "무게중심", 10, 2, color=ACCENT, ha="left")

    # joint points and their distance to the line
    for side in ("knee", "ankle"):
        line(J[f"left_{side}"], J[f"right_{side}"], color=MID, lw=0.8, ls=DOTTED)
    for k, (name, (dx, dy), ha) in JOINTS.items():
        p = pts[k]
        dot(p, ms=5.5, color=DARK)
        tag(p, f"{name} {abs(D['arm_cm'][k]):.0f}cm", dx, dy, ha=ha)
        ax.add_artist(Arrow3D(p, (com[0], com[1], p[2]), arrowstyle="<|-|>", mutation_scale=8, shrinkA=3, shrinkB=0,
                              color=ACCENT, lw=1.2))

    fig.savefig(OUT, dpi=300, facecolor="white", bbox_inches=drawn_bbox(fig))
    plt.close(fig)
    print(f"wrote {OUT.name}")


if __name__ == "__main__":
    main()
