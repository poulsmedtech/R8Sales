#!/usr/bin/env python3
"""Regenerate the local Open Graph image with the current brand lockup."""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[1]
HERO = ROOT / "public" / "images" / "hero-1600.webp"
OUTPUT = ROOT / "public" / "og-image.jpg"
WIDTH, HEIGHT = 1200, 630


def load_font(size, bold=True):
    candidates = [
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf" if bold else "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/Library/Fonts/Arial Bold.ttf" if bold else "/Library/Fonts/Arial.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
    ]
    for path in candidates:
        try:
            return ImageFont.truetype(path, size)
        except OSError:
            continue
    return ImageFont.load_default()


def main():
    hero = Image.open(HERO).convert("RGB")
    source_ratio = hero.width / hero.height
    target_ratio = WIDTH / HEIGHT
    if source_ratio > target_ratio:
        crop_width = int(hero.height * target_ratio)
        left = (hero.width - crop_width) // 2
        hero = hero.crop((left, 0, left + crop_width, hero.height))
    else:
        crop_height = int(hero.width / target_ratio)
        top = (hero.height - crop_height) // 3
        hero = hero.crop((0, top, hero.width, top + crop_height))

    canvas = hero.resize((WIDTH, HEIGHT), Image.Resampling.LANCZOS).filter(ImageFilter.GaussianBlur(0.6))
    overlay = Image.new("RGB", (WIDTH, HEIGHT), (7, 17, 31))
    canvas = Image.blend(canvas, overlay, 0.42)
    shade = Image.new("L", (WIDTH, HEIGHT), 0)
    ImageDraw.Draw(shade).rectangle((0, 0, 760, HEIGHT), fill=170)
    shade = shade.filter(ImageFilter.GaussianBlur(48))
    darkened = Image.new("RGB", (WIDTH, HEIGHT), (6, 14, 26))
    canvas = Image.composite(darkened, canvas, Image.eval(shade, lambda value: min(200, value)))

    draw = ImageDraw.Draw(canvas)
    r8_font = load_font(118)
    word_font = load_font(36)
    tag_font = load_font(32, bold=False)
    line_font = load_font(22, bold=False)

    left = 72
    r8 = "R8"
    wordmark = "SALES GROUP"
    r8_box = draw.textbbox((0, 0), r8, font=r8_font)
    draw.text((left, 148), r8, font=r8_font, fill=(43, 110, 245))
    draw.text((left + (r8_box[2] - r8_box[0]) + 18, 206), wordmark, font=word_font, fill=(255, 255, 255))
    draw.text((left, 292), "Right Opportunities. Right People.", font=tag_font, fill=(255, 255, 255))
    draw.text(
        (left, 520),
        "One Network. Multiple Opportunities. Unlimited Potential.",
        font=line_font,
        fill=(126, 166, 255),
    )

    canvas.save(OUTPUT, "JPEG", quality=88, optimize=True)
    print(f"Wrote {OUTPUT}")


if __name__ == "__main__":
    main()
