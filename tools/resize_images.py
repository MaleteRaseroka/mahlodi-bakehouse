"""
resize_images.py - turns your downloaded Pexels photos into the 3 sizes the website uses.

HOW TO USE
1. Install Pillow once:   pip install pillow
2. Make a folder called  photos  inside the project and save your downloads there,
   renamed EXACTLY like this (.jpg or .jpeg or .png):
     hero-bakery, sourdough, seeded, rolls, croissant, vetkoek, eclair,
     chocolate-cake, red-velvet, birthday-cake, corporate-box
3. From the project folder run:   python tools/resize_images.py
4. The new files appear in  images/  (e.g. sourdough-400.jpg, sourdough-800.jpg)
   and replace the placeholders. Refresh the website.
"""
from pathlib import Path
from PIL import Image, ImageOps

NAMES = ["hero-bakery", "sourdough", "seeded", "rolls", "croissant", "vetkoek", "eclair",
         "chocolate-cake", "red-velvet", "birthday-cake", "corporate-box"]
root = Path(__file__).resolve().parent.parent
src, out = root / "photos", root / "images"

for name in NAMES:
    found = [f for ext in ("jpg", "jpeg", "png", "JPG", "JPEG", "PNG") for f in [src / f"{name}.{ext}"] if f.exists()]
    if not found:
        print(f"skipped  {name}  (no file in photos/)")
        continue
    im = ImageOps.exif_transpose(Image.open(found[0])).convert("RGB")
    for w in ((400, 800, 1200) if name == "hero-bakery" else (400, 800)):
        h = round(w * 0.75)                       # 4:3 crop so cards line up
        ImageOps.fit(im, (w, h), Image.LANCZOS).save(out / f"{name}-{w}.jpg", quality=80, optimize=True)
    print(f"done     {name}")
