#!/usr/bin/env python3
"""Zet bronbeelden (assets-src/, niet in git) om naar WebP-varianten in public/img/.

  assets-src/products/p01.png -> public/img/products/p01-{600,1000,1600}.webp
                                 + public/img/blueprints/p01-{600,1000}.webp
  assets-src/models/*.png     -> public/img/models/<naam>-{600,1000,1600}.webp
  assets-src/groups/*.png     -> public/img/groups/<naam>-{600,1000,1600}.webp
"""
import pathlib, sys
from PIL import Image, ImageFilter, ImageOps, ImageChops

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC, OUT = ROOT / "assets-src", ROOT / "public" / "img"
WIDTHS = (600, 1000, 1600)


def variants(img: Image.Image, dest: pathlib.Path, stem: str, widths=WIDTHS, q=78):
    dest.mkdir(parents=True, exist_ok=True)
    for w in widths:
        out = dest / f"{stem}-{w}.webp"
        if out.exists() and "--force" not in sys.argv:
            continue
        im = img if img.width <= w else img.resize((w, round(img.height * w / img.width)), Image.LANCZOS)
        im.save(out, "WEBP", quality=q, method=6)


def blueprint(img: Image.Image) -> Image.Image:
    """Technische tekening: randen van het stuk als dunne zilverblauwe lijnen op zwart."""
    work = img.resize((1000, round(img.height * 1000 / img.width)), Image.LANCZOS)
    g = ImageOps.grayscale(work)
    # silhouet van het stuk (achtergrond is zwart)
    sil = g.point(lambda v: 255 if v > 22 else 0).filter(ImageFilter.MedianFilter(7))
    # detaillijnen: zwaar vervagen zodat stofkorrel verdwijnt, dan randen + harde drempel
    detail = g.filter(ImageFilter.GaussianBlur(2.6)).filter(ImageFilter.FIND_EDGES)
    detail = ImageOps.autocontrast(detail, cutoff=1).point(lambda v: 255 if v > 70 else 0)
    detail = detail.filter(ImageFilter.MedianFilter(3))
    detail = ImageChops.multiply(detail, sil.filter(ImageFilter.MinFilter(9)))
    # buitencontour, iets dikker
    outline = ImageChops.subtract(sil.filter(ImageFilter.MaxFilter(5)), sil)
    lines = ImageChops.lighter(detail.point(lambda v: v * 0.75), outline)
    tint = Image.new("RGB", work.size, (176, 200, 230))
    bg = Image.new("RGB", work.size, (3, 5, 9))
    return Image.composite(tint, bg, lines).resize(img.size, Image.LANCZOS)


def main():
    for f in sorted((SRC / "products").glob("*.png")):
        img = Image.open(f).convert("RGB")
        variants(img, OUT / "products", f.stem)
        variants(blueprint(img), OUT / "blueprints", f.stem, widths=(600, 1000), q=70)
    for kind in ("models", "groups"):
        for f in sorted((SRC / kind).glob("*.*")):
            variants(Image.open(f).convert("RGB"), OUT / kind, f.stem)
    portrait = SRC / "tibe-portrait.jpg"
    if portrait.exists():
        variants(Image.open(portrait).convert("RGB"), OUT, "tibe-portrait")


if __name__ == "__main__":
    main()
