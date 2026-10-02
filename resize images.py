# Run once: python "Resize images.py"  (needs: py -m pip install pillow)
# Shrinks every .jpg in images/ to max 1000px wide (hero: 1600px) and compresses it.
from __future__ import annotations

import os
from pathlib import Path

try:
    from PIL import Image
except ModuleNotFoundError as exc:
    raise SystemExit("Pillow is not installed. Run: py -m pip install pillow") from exc


def normalize_duplicate_extension(path: Path) -> Path:
    """Fix accidental duplicate .jpg suffixes from repeated runs."""
    if path.name.lower().endswith(".jpg.jpg"):
        fixed = path.with_name(path.name[:-4])
        if not fixed.exists():
            path.rename(fixed)
            return fixed
    return path


def main() -> None:
    root = Path(__file__).resolve().parent
    images_dir = root / "images"

    if not images_dir.exists():
        raise SystemExit(f"Images folder not found: {images_dir}")

    for entry in sorted(images_dir.iterdir()):
        if not entry.is_file() or entry.suffix.lower() not in {".jpg", ".jpeg"}:
            continue

        original_path = normalize_duplicate_extension(entry)
        name = original_path.name
        max_width = 1600 if name.lower().startswith("hero") else 1000

        with Image.open(original_path) as img:
            rgb_img = img.convert("RGB")
            rgb_img.thumbnail((max_width, 2000))
            rgb_img.save(original_path, "JPEG", quality=78, optimize=True, progressive=True)

        print(f"{name}: {original_path.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()