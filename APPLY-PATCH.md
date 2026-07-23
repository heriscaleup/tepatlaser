# Cara Memakai Patch Tepat Laser V8

## Opsi 1 — Terapkan patch Git

Dari root clone asli `heriscaleup/tepatlaser`:

```bash
git apply --index tepatlaser-v8.patch
npm ci
npm run check
npm run build
npm run verify
```

## Opsi 2 — Gunakan source siap pakai

Salin isi direktori `ready-source/` ke clone atau workspace baru, lalu jalankan:

```bash
npm ci
npm run build
```

Folder `ready-source/` tidak menyertakan `.git`, `node_modules`, atau `dist`.
