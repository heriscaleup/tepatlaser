"""
Upload gambar ke WP Media Library, update URL di HTML, lalu push ke WP page.
Usage: python push_to_wp.py
"""
import sys, mimetypes
from pathlib import Path
import requests

USERNAME     = "eenk"
APP_PASSWORD = "nK3D 7KV8 xuac qBQx wrBQ UiX4"
WP_URL       = "https://tepatlaser.com"
PAGE_ID      = 495
HTML_FILE    = Path(__file__).parent / "index.html"

IMAGES = [
    "gambar/mdf/5.png",
    "gambar/mdf/huruf & signage.jpg",
    "gambar/mdf/ornamen dekorasi.jpg",
    "gambar/mdf/4.png",
    "gambar/mdf/8.png",
    "gambar/mdf/komponen furniture.jpg",
]

AUTH = (USERNAME, APP_PASSWORD)
SESSION = requests.Session()
SESSION.headers.update({"User-Agent": "Mozilla/5.0"})


def upload_image(local_path: str) -> str:
    """Upload gambar ke WP, return URL."""
    p = Path(__file__).parent / local_path
    mime = mimetypes.guess_type(str(p))[0] or "image/jpeg"
    filename = p.name

    print(f"  Uploading: {filename} ...", end=" ", flush=True)
    with open(p, "rb") as f:
        resp = SESSION.post(
            f"{WP_URL}/wp-json/wp/v2/media",
            auth=AUTH,
            headers={
                "Content-Type": mime,
                "Content-Disposition": f'attachment; filename="{filename}"',
            },
            data=f.read(),
            timeout=60,
        )

    if resp.status_code in (200, 201):
        url = resp.json().get("source_url", "")
        print(f"OK -> {url}")
        return url
    else:
        print(f"FAIL {resp.status_code}: {resp.text[:200]}")
        return ""


def main():
    print("=== STEP 1: Upload gambar ke WordPress Media Library ===")
    url_map = {}   # local path → WP URL
    for img_path in IMAGES:
        wp_url = upload_image(img_path)
        if wp_url:
            url_map[img_path] = wp_url
        else:
            print(f"  WARNING: gagal upload {img_path}, tetap pakai path lokal")

    print(f"\nUpload selesai: {len(url_map)}/{len(IMAGES)} berhasil")

    print("\n=== STEP 2: Update URL gambar di HTML ===")
    html = HTML_FILE.read_text(encoding="utf-8")
    for local, wp in url_map.items():
        # match both raw path and URL-encoded variants
        html = html.replace(f'src="{local}"', f'src="{wp}"')
        html = html.replace(f"src='{local}'", f"src='{wp}'")
    print("  HTML diupdate.")

    print("\n=== STEP 3: Push HTML ke WP Page ID", PAGE_ID, "===")
    # Dry-run: cek page dulu
    check = SESSION.get(
        f"{WP_URL}/wp-json/wp/v2/pages/{PAGE_ID}?context=edit&_fields=id,slug,title,link",
        auth=AUTH, timeout=20,
    )
    if check.status_code != 200:
        print(f"GAGAL baca page: {check.status_code} {check.text[:200]}")
        sys.exit(1)

    pg = check.json()
    print(f"  Target: [{pg['id']}] {pg.get('slug')} -> {pg.get('link')}")

    # Live push
    resp = SESSION.post(
        f"{WP_URL}/wp-json/wp/v2/pages/{PAGE_ID}",
        auth=AUTH,
        headers={"Content-Type": "application/json"},
        json={"content": html, "status": "publish"},
        timeout=60,
    )

    if resp.status_code in (200, 201):
        live_url = resp.json().get("link", "?")
        print(f"\nBERHASIL dipush ke: {live_url}")
    else:
        print(f"\nGAGAL: {resp.status_code}")
        print(resp.text[:500])
        sys.exit(1)


if __name__ == "__main__":
    main()
