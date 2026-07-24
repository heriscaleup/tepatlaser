# Cara Memakai Tepat Laser V9

## Opsi paling aman: ready source

1. Ekstrak ZIP.
2. Masuk ke folder `ready-source`.
3. Jalankan `npm ci`.
4. Jalankan `npm run check`.
5. Jalankan `npm run build`.
6. Deploy isi proyek atau folder `dist` sesuai pipeline hosting.

## Opsi patch Git

Dari root clone repository yang sesuai dengan baseline:

```bash
git apply --check ../tepatlaser-v9.patch
git apply ../tepatlaser-v9.patch
npm ci
npm run check
npm run build
npm run verify
```

Release aktif dapat diverifikasi melalui `/release.json` dan meta `tepat-release` pada setiap halaman.
