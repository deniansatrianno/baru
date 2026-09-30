# Kebutuhan API untuk Back End (WVMS)

Semua akses data front end sudah dipusatkan lewat `App.db` dan `App.sinkronKeServer()` (di `js/fitur.js`). Tugas back end: sediakan endpoint di bawah, lalu ganti penyimpanan localStorage dengan panggilan API.

## Bentuk data
- **Wisma**: `id, kode, nama, alamat, pic, status, kapasitas, fasilitas, lat, lng`
- **Kunjungan**: `id, kode (kode wisma), tgl, real, tujuan, prioritas, catatan, batal, bukti`
- **bukti** (hasil check-in): `lokasi {lat, lng, acc}, foto (file/URL), ttd (file/URL), waktu, skor (0-100), temuan []`
- **User**: `id, nama, email, role (Admin | Staff | Viewer), status`
- **Log**: `t, u, a, d`
- **Tiket**: `id, kode, kid (id kunjungan), item, status, tgl, selesai`
- **Konfigurasi**: `waTemplate` (template pesan WhatsApp dengan kata kunci {pic} {wisma} {kode} {tanggal} {catatan} {instansi})

## Endpoint
| Method | Path | Fungsi |
|---|---|---|
| POST | /api/auth/login | Login (SSO), mengembalikan token dan role |
| GET/POST | /api/wisma | Daftar (filter q, pic, halaman) dan tambah wisma |
| PUT/DELETE | /api/wisma/:id | Ubah dan hapus wisma |
| POST | /api/wisma/bulk-assign | Body `{ids[], pic}`, penugasan massal |
| POST | /api/wisma/auto-assign | Bagi rata PIC berdasarkan beban |
| GET/POST | /api/kunjungan | Daftar (filter status, pic, dari, sampai, halaman) dan tambah jadwal |
| PUT/DELETE | /api/kunjungan/:id | Ubah dan hapus jadwal |
| POST | /api/kunjungan/:id/checkin | Upload foto, tanda tangan, GPS, checklist (multipart) |
| GET | /api/laporan | Rekap per wisma (filter tanggal), ekspor PDF/Excel dari server |
| POST | /api/sync | Menerima antrean perubahan offline (`[{t, aksi, detail}]`) |
| GET | /api/log | Log aktivitas |
| GET | /api/tiket | Daftar tiket tindak lanjut (filter status) |
| PATCH | /api/tiket/:id | Ubah status tiket (Baru, Diproses, Selesai) |

## Catatan keamanan
- Pembatasan peran wajib dicek di server. Di front end ini hanya simulasi tampilan.
- Foto dan tanda tangan sebaiknya disimpan sebagai file di server, bukan di browser.
- Data wisma yang dihapus sebaiknya soft delete agar riwayat kunjungan tetap utuh.
