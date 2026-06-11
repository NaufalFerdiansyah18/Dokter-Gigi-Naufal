# 🚀 Quick Guide: Pusat Resolusi Komplain & Masukan Pasien

## 📍 Akses Cepat

**URL**: http://localhost:5174/complaints  
**Menu Sidebar**: "Complaints" (icon ⚠️)

## 🎯 Cara Menggunakan

### 1️⃣ Monitor Statistik Real-time
Lihat 3 card di atas:
- **Total Komplain Masuk** - Semua komplain yang tercatat
- **Sedang Diproses** - Komplain yang aktif ditangani (Blue card)
- **Selesai (Resolved)** - Komplain yang sudah tuntas (Green card)

### 2️⃣ Filter Komplain
Gunakan tombol filter di atas tabel:
- **Semua** - Tampilkan semua komplain
- **Pending** - Hanya yang menunggu ditangani
- **In Progress** - Hanya yang sedang diproses
- **Resolved** - Hanya yang sudah selesai

### 3️⃣ Ubah Status Komplain

**Step-by-step**:
1. Cari komplain yang ingin diubah statusnya
2. Klik icon **⋮** (tiga titik vertikal) di kolom "Aksi"
3. Dropdown menu akan muncul
4. Klik status baru yang diinginkan:
   - **Pending** → "In Progress" atau "Resolved"
   - **In Progress** → "Pending" atau "Resolved"
   - **Resolved** → "Pending" atau "In Progress"
5. Status langsung berubah!
6. Card statistik otomatis update

### 4️⃣ Lihat Detail Komplain
Tabel menampilkan:
- **Tanggal** - Kapan komplain masuk
- **Nama Pasien** - Siapa yang komplain (dengan avatar)
- **Isi Keluhan** - Deskripsi lengkap masalah
- **Prioritas** - High (merah) / Medium (kuning) / Low (abu)
- **Status** - Pending / In Progress / Resolved

### 5️⃣ Track Success Rate
Lihat bagian bawah untuk:
- **Persentase** komplain yang sudah diselesaikan
- **Progress bar** visual (hijau)
- **Counter** "X dari Y" komplain resolved

## 🎨 Status Badge Guide

### 🟡 Pending (Kuning/Oranye)
- **Artinya**: Komplain baru masuk, belum ditangani
- **Action**: Admin perlu segera proses
- **Icon**: ⚠️ Warning circle

### 🔵 In Progress (Biru)
- **Artinya**: Komplain sedang ditangani admin
- **Action**: Admin aktif menyelesaikan masalah
- **Icon**: ⏳ Hourglass

### 🟢 Resolved (Hijau)
- **Artinya**: Komplain sudah selesai ditangani
- **Action**: Masalah sudah resolved
- **Icon**: ✅ Check circle

## 💡 Tips & Best Practices

### Prioritas Penanganan
1. **High Priority** (merah) → Tangani SEGERA
2. **Medium Priority** (kuning) → Tangani hari ini
3. **Low Priority** (abu) → Tangani saat ada waktu

### Workflow Efisien
1. Cek card **"Sedang Diproses"** di pagi hari
2. Prioritaskan komplain **Pending** dengan badge merah
3. Update status ke **In Progress** saat mulai tangani
4. Ubah ke **Resolved** setelah masalah selesai
5. Monitor **Success Rate** untuk KPI

### Alert Banner
Jika muncul banner kuning:
> "Perhatian: X komplain menunggu untuk ditangani"

**Action**: Segera cek dan proses komplain pending!

## 🔥 Real-time Magic

### Statistics Auto Update! ✨
Saat admin ubah status:
- ✅ Card statistik langsung update
- ✅ Angka pending/in progress/resolved berubah
- ✅ Success rate recalculate otomatis
- ✅ Progress bar animate smooth
- ✅ **TIDAK perlu refresh halaman!**

### Contoh:
**Before**:
- Pending: 3
- In Progress: 4
- Resolved: 3

**Admin ubah C-001 dari Pending → In Progress**

**After (instant update)**:
- Pending: 2 ✨
- In Progress: 5 ✨
- Resolved: 3

## 📊 Mock Data (Testing)

Sistem sudah dilengkapi 10 komplain sample:
- 3 Pending (C-001, C-004, C-008)
- 4 In Progress (C-002, C-005, C-007, C-010)
- 3 Resolved (C-003, C-006, C-009)

**Coba ubah statusnya untuk lihat real-time update!**

## 🎯 Use Cases

### Case 1: Komplain Urgent
```
Komplain: "Sakit setelah perawatan"
Priority: High
Status: Pending

Action:
1. Klik ⋮ → pilih "In Progress"
2. Tangani komplain (hubungi pasien, buat appointment)
3. Setelah selesai → klik ⋮ → pilih "Resolved"
```

### Case 2: Filter untuk Review
```
Goal: Review semua komplain yang sudah selesai

Action:
1. Klik filter "Resolved"
2. Tabel hanya show komplain resolved
3. Review apakah solusi sudah tepat
```

### Case 3: Daily Monitoring
```
Pagi hari:
1. Cek card "Sedang Diproses" - berapa yang masih handled?
2. Cek alert banner - ada pending baru?
3. Filter "Pending" - prioritaskan High priority
4. Ubah status ke "In Progress" saat mulai tangani
```

## 🐛 Troubleshooting

### Dropdown tidak muncul?
- Pastikan klik icon ⋮ dengan benar
- Klik di luar area untuk close dropdown lain

### Filter tidak bekerja?
- Pastikan klik tombol filter dengan jelas
- Tombol aktif berwarna hijau (emerald)

### Statistics tidak update?
- Coba refresh browser
- Pastikan JavaScript enabled

## 🎉 Success Metrics

### Target KPI:
- **Success Rate**: > 80%
- **Pending Time**: < 24 jam
- **In Progress Duration**: < 3 hari

### Check Weekly:
- Berapa komplain masuk minggu ini?
- Berapa yang sudah resolved?
- Ada pattern komplain tertentu?

## 📝 Common Actions

### Terima Komplain Baru
```
1. Komplain baru masuk (status: Pending)
2. Admin review di tabel
3. Ubah status → "In Progress"
4. Handle komplain
5. Ubah status → "Resolved"
```

### Re-open Resolved Complaint
```
1. Pasien komplain lagi untuk issue yang sama
2. Find komplain di tabel (filter: Resolved)
3. Klik ⋮ → ubah kembali ke "In Progress"
4. Handle ulang
```

### Bulk Check Pending
```
1. Klik filter "Pending"
2. Lihat semua yang perlu ditangani
3. Prioritaskan berdasarkan:
   - Priority badge (High first)
   - Tanggal (oldest first)
```

## 🚀 Next Level

Setelah familiar dengan basic operations:
1. Track success rate trend per minggu
2. Identifikasi komplain pattern
3. Buat SOP untuk komplain umum
4. Set target response time
5. Train staff untuk faster resolution

---

**Happy managing complaints! 📢✨**

Need detailed technical docs? Check **COMPLAINT-RESOLUTION-DOCUMENTATION.md**
