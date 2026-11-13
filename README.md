# TKA Mathematics CBT — Beta

Prototype CBT TKA Matematika SMP berbasis React + TypeScript + Vite. Versi ini sengaja belum memakai database; data disimpan pada `localStorage` browser.

## Menjalankan

```bash
npm install
npm run dev
```

Buka URL lokal yang ditampilkan Vite (biasanya http://localhost:5173).

## Akun demo

- Guru: `guru` / `admin123`
- Siswa: `siswa01` / `12345`
- Tester: `tester01` / `12345`

Guru dapat membuat akun siswa/tester dari menu Manajemen Siswa dan mengelola bank soal. Siswa dan tester dapat mengerjakan ujian serta melihat review setelah submit.

## Fitur beta 0.2

- Login role guru, siswa, tester.
- CRUD akun peserta dan bank soal.
- 30 soal seed demo dalam empat materi dan empat tipe soal.
- Navigasi nomor, ragu-ragu, timer 75 menit, autosave lokal, submit, scoring, review pembahasan.
- Backup dan import data JSON.

Gambar stimulus dibatasi maksimal 2 MB per file dan disimpan sebagai data URL di localStorage. Perhatikan kapasitas penyimpanan browser jika mengunggah banyak gambar.

## Batasan penting

- `localStorage` hanya tersedia pada browser/perangkat yang sama. Akun yang dibuat guru tidak otomatis tersedia di browser siswa lain.
- Login demo bukan autentikasi aman untuk produksi. Password disimpan lokal dan tidak di-hash.
- Timer lokal dapat dimanipulasi oleh pengguna yang mengubah jam/perangkat.
- Tidak ada sinkronisasi multi-user, database, Google Sheets, atau proteksi kunci jawaban setingkat server.
- Soal demo dimaksudkan untuk menguji alur aplikasi. Guru perlu memeriksa dan mengganti konten sebelum simulasi resmi.

## Rencana migrasi database

Komponen UI membaca data melalui fungsi di `src/lib/store.ts`. Pada tahap Supabase, fungsi penyimpanan ini dapat diganti dengan repository Supabase tanpa menulis ulang keseluruhan halaman. Model tipe ada di `src/types.ts`.


## Beta 0.3 — Perbaikan editor stimulus

- Konten teks stimulus menggunakan textarea yang lebih jelas dan mempertahankan baris baru.
- Gambar stimulus otomatis diperkecil ke JPEG agar tidak cepat memenuhi kuota LocalStorage.
- Preview teks, rumus KaTeX, dan gambar ditampilkan sebelum penyimpanan.
- Pesan error penyimpanan ditampilkan di dalam editor.
- Stimulus baru dapat dibuat langsung dari dropdown Stimulus pada editor soal.
- Saat stimulus dibuat dari editor soal, stimulus otomatis dipilih untuk soal tersebut.

Catatan: penyimpanan masih lokal pada browser/perangkat yang sama. Untuk penggunaan lintas perangkat diperlukan backend.


## Beta 0.4 – Preview soal dan manajemen paket ujian

Pembaruan: 
- Editor soal memiliki panel **Preview tampilan siswa** yang memperlihatkan stimulus (teks, LaTeX, gambar), pertanyaan, opsi, dan tabel benar/salah.
- Manajemen Ujian mendukung tambah, edit, hapus paket, mengatur durasi, memilih soal, memilih peserta secara spesifik, serta status draft/publikasi.
- Paket hanya dapat dipublikasikan jika berisi tepat 30 soal.
- Siswa/tester hanya melihat paket yang ditugaskan ke username mereka.
- Attempt menyimpan ID paket dan daftar ID soal agar review menggunakan soal paket terkait.
- Data paket ujian disimpan di LocalStorage bersama data Beta lainnya.

Akun demo: guru/admin123, siswa01/12345, tester01/12345.


## Login page privacy update (Beta 0.4.1)

The public login page no longer displays demo usernames or passwords. It now shows a neutral instruction telling users to use credentials supplied by the administrator. Demo credentials remain development-only and must be replaced with secure server-side authentication before public deployment.
