# 🎯 Quick Guide: Chat Admin - Nopall UI Dental Clinic

## 🚀 Cara Mengakses

### Opsi 1: Melalui Sidebar Menu
1. Jalankan aplikasi: `npm run dev`
2. Buka browser: **http://localhost:5174/**
3. Klik menu **"Chat Admin"** di sidebar (icon 💬)

### Opsi 2: Akses Langsung
Buka URL: **http://localhost:5174/chat-admin**

## 📱 Cara Menggunakan Fitur

### 1️⃣ Mencari Pasien
- Ketik nama pasien di search bar (pojok kiri atas)
- List pasien akan terfilter secara real-time

### 2️⃣ Membuka Chat Pasien
- Klik nama pasien di list sebelah kiri
- Chat window akan muncul di sebelah kanan
- Badge unread (angka biru) akan otomatis hilang

### 3️⃣ Mengirim Pesan Manual
**Cara 1**: Ketik → Enter
1. Ketik pesan di input field (bawah)
2. Tekan tombol **Enter** di keyboard

**Cara 2**: Ketik → Klik Kirim
1. Ketik pesan di input field
2. Klik tombol **"Kirim"** (icon pesawat kertas)

### 4️⃣ Menggunakan Quick Replies (Template Pesan)
1. Klik tombol **"Quick"** (kiri bawah)
2. Panel template akan muncul dengan 3 pilihan:
   - ✅ **Konfirmasi Kehadiran**
   - 💊 **Instruksi Pasca-Cabut Gigi**
   - 📅 **Jadwal Kontrol Berikutnya**
3. Klik salah satu template
4. Teks akan otomatis masuk ke input field
5. Edit jika perlu → Kirim

### 5️⃣ Membaca Riwayat Chat
- Scroll ke atas/bawah di area chat (tengah)
- Bubble kiri = pesan dari pasien
- Bubble kanan = pesan dari admin/dokter

## 🎨 Visual Indicators

### Status Pasien
- 🟢 **Dot Hijau** = Pasien online
- ⚪ **Dot Abu** = Pasien offline

### Badge Unread
- 🔵 **Angka Biru** = Jumlah pesan belum dibaca
- Hilang saat chat dibuka

### Timestamp
- Waktu relatif di list pasien (10:30, Yesterday, 2 days ago)
- Waktu lengkap di bubble chat

### Status Pesan Admin
- ✓✓ **Double Check** = Pesan terkirim

## 💡 Tips & Tricks

### Shortcut Keyboard
- **Enter** = Kirim pesan
- **Esc** = (Coming soon: Close quick replies)

### Workflow Efisien
1. Buka Chat Admin dari sidebar
2. Lihat pasien dengan badge unread (urgent)
3. Klik pasien → baca pesan
4. Gunakan Quick Reply untuk respon cepat
5. Edit template sesuai kebutuhan
6. Kirim dengan Enter

### Best Practices
- ✅ Gunakan Quick Reply untuk pertanyaan umum
- ✅ Personalisasi template sebelum kirim
- ✅ Prioritaskan pasien dengan badge unread tinggi
- ✅ Check status online/offline sebelum kirim

## 🔧 Troubleshooting

### Chat tidak muncul?
- Pastikan sudah klik nama pasien di list
- Refresh browser jika perlu

### Pesan tidak terkirim?
- Pastikan input tidak kosong
- Pastikan sudah klik "Kirim" atau Enter

### Search tidak berfungsi?
- Pastikan ketik minimal 1 karakter
- Case-insensitive (tidak peduli huruf besar/kecil)

## 📊 Data Pasien Simulasi

Saat ini menggunakan 5 pasien mock data:
1. **Sarah Johnson** (Online, 2 unread)
2. **Michael Chen** (Online, 5 unread)
3. **Jessica Martinez** (Offline, 0 unread)
4. **David Brown** (Offline, 0 unread)
5. **Amanda Lee** (Online, 1 unread)

## 🎯 Next Steps

Setelah familiar dengan Chat Admin:
1. Integrate dengan backend API (real-time data)
2. Add WebSocket untuk live messaging
3. Implement file upload
4. Add notification system

---

**Enjoy using Chat Admin! 🎉**

Need help? Check **CHAT-ADMIN-INTEGRATION.md** for technical details.
