"""Draw slide 2's load-path figure: one squat bottom frame, the weight split between the two feet, and each leg's moment arms.

A slide variant of figure 24 from rack-tracker's report (#635 `make_figures.py`, `fig24_load_path`), redrawn for the
per-leg joint loads of rack-tracker #649. The rig no longer merges the two legs at the mid-point of the left and right
joints: it splits the floor force between the feet by where the centre-of-mass line lands between them (a lever along
the line from the left to the right foot centre), puts each foot's pressure point at the same front-back offset as
that landing point (both feet press at the same front-back place — a parallel-stance squat), and solves each leg's
ankle, knee and hip from that foot upwards. So the figure draws, for each foot, its pressure point, an upward floor
force and the vertical line it acts along, with the foot's share; and from each leg's ankle, knee and hip a left-right
arrow on the page to its own foot's line (in this view the front-back arm runs into the page, so a 3D arrow would be
only a few points long). The lumbar point still gets its arrow to the line through the centre of mass of body and bar,
since the lumbar joint is solved from the top down. The floor tick numbers and the joint labels are left out; the
floor frame's x, y, z axes are drawn at the floor origin and, thin, at both shoulders, elbows, hips, knees and ankles,
which also carry a yellow and black quartered target, as on a crash-test dummy. The data file is a copy of the report's
`data/fig24_squat_bottom.json` (session 20261012-115120, set 1, rep 3, bar 100kg).

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
from matplotlib.path import Path as MPath  # noqa: E402
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
# joints whose moment arm is drawn: a dot, and a two-headed arrow from it to the centre-of-mass line
JOINTS = ("ankle", "knee", "hip", "lumbar")
ARM_HEAD = 3.0         # longest arrow head (pt); a short arrow gets smaller heads so its shaft still shows
ARM_SHRINK = 2.4       # pt, just past the dot's edge so the near head is not hidden under it
ARM_SHRINK_TARGET = 5.6   # pt, just past a target's edge — the leg arrows start at the targeted joints
LEG_JOINTS = ("ankle", "knee", "hip")
FOOT_LABEL_AT = {"left": (12, -4, "left"), "right": (-12, -4, "right")}   # pt from each foot's pressure point, and the side the text runs to
ARM_LW = 1.0
JOINT_MS = 4.5         # joint dot size (pt); ARM_SHRINK is just past its radius
# floor frame axes as plot directions (y is up, z comes toward the viewer), coloured x red, y green, z blue as in
# 3D tools; z is a light blue so it is not read as the centre-of-mass accent
AXES = (("x", (1, 0, 0), "#D55E00"), ("y", (0, 0, 1), "#009E73"), ("z", (0, -1, 0), "#56B4E9"))
ORIGIN_AXIS = 20       # cm, axes at the floor origin (the floor board's corner)
JOINT_AXIS = 8         # cm, thin axes at each joint below, both sides
AXIS_JOINTS = tuple(f"{s}_{k}" for s in ("right", "left") for k in ("shoulder", "elbow", "hip", "knee", "ankle"))
# the same joints carry a target: two opposite black quarters over a yellow disc
TARGET = MPath.make_compound_path(MPath.wedge(0, 90), MPath.wedge(180, 270))
TARGET_MS = 10         # pt
YELLOW = "#FFD100"
BLACK = "#111111"
COM_LABEL_AT = (62, -14)   # pt from the centre-of-mass dot, out in the empty space right of the body


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

    def axes_at(p, size, lw, scale, names=False):
        for name, d, color in AXES:
            ax.add_artist(Arrow3D(p, tuple(a + size * b for a, b in zip(p, d)), arrowstyle="-|>", mutation_scale=scale,
                                  shrinkA=0, shrinkB=0, color=color, lw=lw))
            if names:
                ax.text(*(a + (size + 6) * b for a, b in zip(p, d)), name, fontsize=9, color=color, ha="center",
                        va="center", fontweight="bold", fontstyle="italic")

    axes_at((0, 0, 0), ORIGIN_AXIS, 1.6, 10, names=True)

    # body: far (left) limbs light, near (right) limbs and trunk dark, face thin
    for a, b in BONES:
        if a not in J or b not in J:
            continue
        face = a in ("nose", "left_eye", "right_eye")
        far = a.startswith("left_") and b.startswith("left_")
        line(J[a], J[b], color=MID if far else DARK, lw=1.2 if face else 2.0, solid_capstyle="round")
    # a target is a line marker, and lines draw below the 3D arrow patches, so the joint axes stay on top
    for n in AXIS_JOINTS:
        dot(J[n], ms=TARGET_MS, mfc=YELLOW, mec=BLACK, mew=0.9)
        ax.plot(*[[v] for v in J[n]], marker=TARGET, ms=TARGET_MS, mfc=BLACK, mec="none")
        axes_at(J[n], JOINT_AXIS, 0.6, 4)
    tip = lambda s: tuple(c + s * BAR_HALF * m for c, m in zip(bar, ml))      # noqa: E731
    line(tip(-1), tip(1), color=MID, lw=3.0, solid_capstyle="round")
    tag(tip(1), "바", -14, 12)

    # centre of mass (body + bar) and its vertical line
    line(com, (com[0], com[1], 0), color=ACCENT, lw=1.4, ls=DASHED)
    dot(com, ms=7, color=ACCENT)
    ax.add_artist(Arrow3D(com, (com[0], com[1], com[2] - 12), arrowstyle="-|>", mutation_scale=12, shrinkA=0,
                          shrinkB=0, color=ACCENT, lw=1.4))

    # the two feet (#649): where the centre-of-mass line lands splits the weight between them along the line from the
    # left to the right foot centre, and each foot presses at its centre moved by the landing point's front-back offset
    flat = lambda q: (q[0], q[1], 0.0)                                   # noqa: E731
    foot_c = {s: flat(tuple((a + b) / 2 for a, b in zip(J[f"{s}_heel"], J[f"{s}_foot_index"]))) for s in ("left", "right")}
    land = flat(com)
    dv = tuple(b - a for a, b in zip(foot_c["left"], foot_c["right"]))
    u = max(0.0, min(1.0, sum((q - a) * d for q, a, d in zip(land, foot_c["left"], dv)) / sum(d * d for d in dv)))
    off = tuple(q - (a + u * d) for q, a, d in zip(land, foot_c["left"], dv))
    cop = {s: tuple(a + o for a, o in zip(foot_c[s], off)) for s in ("left", "right")}
    share = {"left": 1.0 - u, "right": u}
    top = max(J["left_hip"][2], J["right_hip"][2]) + 8
    for s in ("left", "right"):
        c = cop[s]
        line(c, (c[0], c[1], top), color=DARK, lw=0.9, ls=DASHED)       # the line the foot's floor force acts along
        dot(c, ms=4.5, color=DARK)
        ax.add_artist(Arrow3D(c, (c[0], c[1], 16), arrowstyle="-|>", mutation_scale=10, shrinkA=0, shrinkB=0, color=DARK, lw=1.4))

    from mpl_toolkits.mplot3d import proj3d
    M = ax.get_proj()
    page = lambda q: proj3d.proj_transform(*q, M)[:2]                    # noqa: E731

    def arm_arrow(p, line_lo, line_hi, shrink):
        """a left-right arrow on the page from point p to the projected line through line_lo and line_hi, at p's height"""
        (ax0, ay0), (ax1, ay1) = page(line_lo), page(line_hi)
        x, y = page(p)
        lx = ax0 + (ax1 - ax0) * (y - ay0) / (ay1 - ay0)
        span = abs(ax.transData.transform((lx, y))[0] - ax.transData.transform((x, y))[0]) * 72 / fig.dpi
        head = max(0.0, min(ARM_HEAD, (span - shrink) / 3.5))
        if head <= 0.3:
            return
        # heads filled with no outline (an outline swells them by about its width and two heads on a 7pt arrow
        # merge), then the shaft as its own line, ending inside the heads
        at = dict(xy=(lx, y), xytext=(x, y), xycoords="data")
        ax.annotate("", **at, arrowprops=dict(arrowstyle=f"<|-|>,head_length={head:.2f},head_width={0.5 * head:.2f}",
                                              mutation_scale=1, shrinkA=shrink, shrinkB=0, color=ACCENT, lw=0))
        ax.annotate("", **at, arrowprops=dict(arrowstyle="-", shrinkA=shrink + head / 2, shrinkB=head / 2,
                                              color=ACCENT, lw=ARM_LW))

    # each leg's ankle, knee and hip to its own foot's line; the lumbar point (one, mid-body) to the centre-of-mass line
    for s in ("left", "right"):
        c = cop[s]
        for j in LEG_JOINTS:
            arm_arrow(J[f"{s}_{j}"], c, (c[0], c[1], top), ARM_SHRINK_TARGET)
    dot(pts["lumbar"], ms=JOINT_MS, color=DARK)
    arm_arrow(pts["lumbar"], com, (com[0], com[1], 0), ARM_SHRINK)
    for s, name in (("left", "왼발"), ("right", "오른발")):
        dx, dy, ha = FOOT_LABEL_AT[s]
        tag(cop[s], f"{name} {round(share[s] * 100)}%", dx, dy, fs=9, color=DARK, ha=ha)
    (cx0, cy0) = page(com)

    # the label out to the right, on a thin leader line that stops at the dot's edge
    ax.annotate("무게중심(몸+바)", xy=(cx0, cy0), xycoords="data", xytext=COM_LABEL_AT, textcoords="offset points",
                fontsize=10, color=ACCENT, ha="left", va="center", fontweight="bold", zorder=10,
                bbox=dict(facecolor="white", edgecolor="none", pad=1.0),
                arrowprops=dict(arrowstyle="-", color=ACCENT, lw=0.8, shrinkA=1, shrinkB=4.5))

    fig.savefig(OUT, dpi=300, facecolor="white", bbox_inches=drawn_bbox(fig))
    plt.close(fig)
    print(f"wrote {OUT.name}")


if __name__ == "__main__":
    main()
