# n8n-nodes-mayar

n8n community nodes untuk Mayar Headless API (Actions & Trigger).

## Instalasi

- n8n Cloud:
  - Buka Community Nodes dan cari `n8n-nodes-mayar`.
  - Install dari UI n8n, lalu tambahkan kredensial Mayar API.

- Self-hosted:
  - `npm install n8n-nodes-mayar`
  - Pastikan environment n8n Anda memuat paket ini (Community Nodes aktif).

## Konfigurasi

Buat kredensial "Mayar API" di n8n:
- `API Key`: token Mayar Anda
- `Base URL`: default `https://api.mayar.id/hl/v1` (Sandbox: `https://api.mayar.club/hl/v1`)

## Fitur

- Mayar Action Node
  - Balance: `Get`
  - Invoice: `Create`, `Get Many`
  - Coupon: `Create`, `Get`, `Get Many`
  - Customer: `Get Many`, `Create`, `Update Email`
  - Options:
    - `Continue On Fail`: lanjut workflow saat error dengan output error
    - `Max Retries`: retry untuk error sementara (429, 5xx)
    - `Retry Delay (ms)`: jeda antar retry
    - `Debug`: menambahkan meta informasi ke output

- Mayar Trigger Node
  - Satu webhook endpoint (`mayar`) yang meneruskan payload request apa adanya
  - Output tunggal (`main`), `webhookResponse` meng-echo payload untuk memudahkan pengujian

## Contoh Penggunaan

- Trigger (Webhook)
  - Kirim `POST` ke endpoint webhook dengan JSON payload. Contoh:
    ```json
    {
      "event": "payment.received",
      "data": { "id": "123", "status": "SUCCESS" }
    }
    ```
  - Payload akan diteruskan ke output `main` dan di-echo sebagai respons HTTP.

- Action: Invoice Create
  - Tambahkan node `Mayar`
  - Set `Resource: Invoice`, `Operation: Create`
  - Isi parameter: `name`, `email`, `mobile`, `redirectUrl`, `description`, `expiredAt (opsional)`, `items`
  - Atur `Options` bila perlu (misal `Max Retries` untuk kestabilan)

- Action: Customer Get Many
  - `Resource: Customer`, `Operation: Get Many`
  - Parameter: `page`, `pageSize`

## Pengembangan

- `npm install`
- `npm run build`
- Struktur build: output berada di `dist/` dan direferensikan oleh n8n melalui field `n8n` di `package.json`.

## Versioning (bump.sh)

Gunakan skrip `bump.sh` untuk menaikkan versi dan rilis cepat:

```bash
./bump.sh [major|minor|patch] [publish]
```

- `major|minor|patch`: tipe versi semver
- Skrip akan:
  - membangun paket,
  - menjalankan `npm version` (membuat commit dan tag),
  - `git push` dan `git push --tags`.
- Tambahkan argumen `publish` untuk sekaligus menjalankan `npm publish --access public`.

## Lisensi

MIT

## Tautan

- n8n Community Nodes: https://docs.n8n.io/integrations/community-nodes/
- Mayar API: silakan merujuk dokumentasi resmi Mayar / tim Mayar