# Cara Memakai Tepat Laser V10

## Ready source

1. Ekstrak ZIP.
2. Masuk ke `ready-source`.
3. Jalankan `npm ci`.
4. Jalankan `npm run check`.
5. Jalankan `npm run build`.
6. Jalankan `npm run verify`.
7. Deploy source atau folder `dist` sesuai pipeline hosting.

## Git patch

Jalankan dari clone repository yang sesuai dengan baseline:

```bash
git apply --check ../tepatlaser-v10.patch
git apply ../tepatlaser-v10.patch
npm ci
npm run check
npm run build
npm run verify
```

Release final dapat dicek melalui `/release.json` dan meta `tepat-release`.
