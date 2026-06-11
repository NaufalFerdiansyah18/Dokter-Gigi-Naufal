# 💰 Modul Finansial CRM - Dokumentasi Lengkap

## 📋 Overview

**Modul Finansial CRM** adalah sistem manajemen transaksi dan riwayat tindakan medis pasien di Nopall UI - Dental Clinic System. Modul ini memungkinkan admin untuk mengelola riwayat finansial pasien dengan mudah dan efisien.

## ✨ Fitur Utama

### 1. **Form Input Tindakan Baru (Modal)**
Form modal untuk menambah transaksi tindakan medis dengan field lengkap:

#### Input Fields:
- ✅ **Tanggal Tindakan**: Date picker untuk mencatat kapan tindakan dilakukan
- ✅ **Jenis Tindakan**: Dropdown 14 pilihan tindakan medis
- ✅ **Dokter yang Menangani**: Dropdown dokter aktif dari database
- ✅ **Biaya Dasar**: Input numerik untuk biaya sebelum diskon
- ✅ **Diskon Persentase**: Input 0-100% (default 0%)
- ✅ **Metode Pembayaran**: Dropdown 5 metode pembayaran

#### Fitur Form:
- 🎯 **Real-time Preview**: Preview biaya bersih saat input
- ✅ **Validasi Lengkap**: Validasi semua field wajib
- 💡 **Error Messages**: Pesan error jelas untuk setiap field
- 🧮 **Auto Calculate**: Otomatis hitung biaya bersih (Biaya Dasar - Diskon)
- 🎨 **Design Modern**: Gradient header emerald/teal, shadow-2xl

### 2. **Ringkasan Keuangan Pasien (3 Metric Cards)**

#### Card 1: Total Akumulasi Transaksi 📊
- **Display**: Total seluruh biaya bersih dari semua transaksi
- **Visual**: Gradient emerald-to-teal dengan icon chart
- **Badge**: Jumlah total transaksi
- **Format**: Currency IDR dengan separator

#### Card 2: Metode Pembayaran Terakhir 💳
- **Display**: Metode pembayaran dari transaksi terakhir
- **Visual**: White card dengan icon wallet biru
- **Info**: Metode yang paling baru digunakan pasien

#### Card 3: Kunjungan Terakhir 🕒
- **Display**: Tanggal kunjungan terakhir pasien
- **Visual**: White card dengan icon history ungu
- **Format**: Tanggal lengkap Indonesia (contoh: 20 Mei 2026)

### 3. **Tabel Riwayat Tindakan**

#### Kolom Tabel:
1. **No**: Nomor urut
2. **Tanggal**: Tanggal tindakan (format Indonesia)
3. **Tindakan**: Nama jenis tindakan medis
4. **Dokter**: Nama dokter yang menangani
5. **Biaya Dasar**: Biaya sebelum diskon
6. **Diskon**: Persentase diskon (0% jika tidak ada)
7. **Biaya Bersih**: Biaya final (bold emerald)
8. **Metode**: Badge metode pembayaran

#### Fitur Tabel:
- ✅ **Responsive**: Horizontal scroll untuk mobile
- ✅ **Hover Effect**: Row highlight saat hover
- ✅ **Empty State**: Pesan + icon saat tidak ada data
- ✅ **Footer Total**: Grand total semua transaksi
- ✅ **Striped Rows**: Divider untuk readability

## 🎨 Design System

### Color Palette

#### Primary (Emerald/Teal Theme)
- **Primary**: `emerald-600` (#059669) - Buttons, accents
- **Primary Hover**: `emerald-700` (#047857)
- **Primary Light**: `emerald-50` (#ECFDF5) - Backgrounds
- **Gradient**: `from-emerald-500 to-teal-600` - Hero elements

#### Accent Colors
- **Blue**: `blue-600` (#2563EB) - Info, badges
- **Purple**: `purple-600` (#9333EA) - Secondary info
- **Orange**: `orange-600` (#EA580C) - Discount highlights
- **Red**: `red-500` (#EF4444) - Error states

#### Neutral
- **Gray-50**: Background
- **Gray-200**: Borders
- **Gray-600**: Secondary text
- **Gray-900**: Primary text

### Typography
- **Heading**: Bold, Gray-900
- **Body**: Normal, Gray-700
- **Small**: Text-sm, Gray-600
- **Label**: Semibold, Gray-700

### Spacing
- **Section Gap**: 24px (gap-6)
- **Card Padding**: 24px (p-6)
- **Input Height**: 40px (py-2.5)
- **Border Radius**: 12px (rounded-xl)

## 🔧 Logika & State Management

### React State Hooks

#### 1. **selectedPatient** - State pasien aktif
```javascript
const [selectedPatient, setSelectedPatient] = useState(patients[0]);
```

#### 2. **isModalOpen** - State visibility modal
```javascript
const [isModalOpen, setIsModalOpen] = useState(false);
```

#### 3. **formData** - State form input
```javascript
const [formData, setFormData] = useState({
  tanggalTindakan: new Date().toISOString().split('T')[0],
  jenisTindakan: '',
  dokterPenanganan: '',
  biayaDasar: '',
  diskonPersen: 0,
  metodePembayaran: ''
});
```

#### 4. **errors** - State validasi error
```javascript
const [errors, setErrors] = useState({});
```

### Kalkulasi Otomatis dengan useMemo

#### Financial Summary Calculator
```javascript
const financialSummary = useMemo(() => {
  const riwayat = selectedPatient?.riwayatPerawatan || [];
  
  const totalAkumulasi = riwayat.reduce((sum, item) => sum + item.biaya, 0);
  const metodeTerakhir = riwayat.length > 0 ? riwayat[riwayat.length - 1].metode : '-';
  const kunjunganTerakhir = riwayat.length > 0 ? riwayat[riwayat.length - 1].tanggal : '-';

  return {
    totalAkumulasi,
    metodeTerakhir,
    kunjunganTerakhir,
    jumlahTransaksi: riwayat.length
  };
}, [selectedPatient]);
```

**Keunggulan useMemo**:
- ✅ Hanya re-calculate saat `selectedPatient` berubah
- ✅ Optimasi performa, menghindari kalkulasi berulang
- ✅ Memoization untuk nilai yang sering diakses

#### Biaya Bersih Calculator
```javascript
const calculateBiayaBersih = (biayaDasar, diskonPersen) => {
  const biaya = parseFloat(biayaDasar) || 0;
  const diskon = parseFloat(diskonPersen) || 0;
  return biaya - (biaya * diskon / 100);
};
```

**Formula**:
```
Biaya Bersih = Biaya Dasar - (Biaya Dasar × Diskon / 100)

Contoh:
- Biaya Dasar: Rp 1.000.000
- Diskon: 10%
- Biaya Bersih: Rp 900.000
```

### Flow Tambah Transaksi

#### 1. User Click "Tambah Tindakan"
```javascript
onClick={() => setIsModalOpen(true)}
```

#### 2. User Fill Form & Submit
```javascript
const handleSubmit = (e) => {
  e.preventDefault();
  
  // Validasi form
  if (!validateForm()) return;
  
  // Hitung biaya bersih
  const biayaBersih = calculateBiayaBersih(
    formData.biayaDasar, 
    formData.diskonPersen
  );
  
  // Create transaction object
  const newTransaction = {
    tanggal: formData.tanggalTindakan,
    tindakan: formData.jenisTindakan,
    dokter: formData.dokterPenanganan,
    biaya: biayaBersih,
    biayaDasar: parseFloat(formData.biayaDasar),
    diskon: parseFloat(formData.diskonPersen),
    metode: formData.metodePembayaran
  };
  
  // Update patients context
  // ...
}
```

#### 3. Update Patient Data di Context
```javascript
const updatedPatients = patients.map(patient => {
  if (patient.id === selectedPatient.id) {
    const updatedRiwayat = [...patient.riwayatPerawatan, newTransaction];
    const newTotalTransaksi = updatedRiwayat.reduce((sum, item) => sum + item.biaya, 0);
    
    return {
      ...patient,
      riwayatPerawatan: updatedRiwayat,
      totalTransaksi: newTotalTransaksi,
      metodePembayaran: formData.metodePembayaran,
      terakhirKunjungan: formData.tanggalTindakan
    };
  }
  return patient;
});

setPatients(updatedPatients);
```

#### 4. Auto Update Summary Cards
- useMemo detect perubahan `selectedPatient`
- Re-calculate summary metrics
- UI auto re-render dengan data baru

#### 5. Tabel Auto Update
- New row ditambahkan di tabel
- Footer total auto update
- No manual refresh needed

## ✅ Validasi Form

### Validasi Rules:

#### 1. Tanggal Tindakan
```javascript
if (!formData.tanggalTindakan) {
  newErrors.tanggalTindakan = 'Tanggal tindakan wajib diisi';
}
```

#### 2. Jenis Tindakan
```javascript
if (!formData.jenisTindakan) {
  newErrors.jenisTindakan = 'Jenis tindakan wajib dipilih';
}
```

#### 3. Dokter Penanganan
```javascript
if (!formData.dokterPenanganan) {
  newErrors.dokterPenanganan = 'Dokter penanganan wajib dipilih';
}
```

#### 4. Biaya Dasar
```javascript
if (!formData.biayaDasar || formData.biayaDasar <= 0) {
  newErrors.biayaDasar = 'Biaya dasar harus lebih dari 0';
}
```

#### 5. Diskon Persentase
```javascript
if (formData.diskonPersen < 0 || formData.diskonPersen > 100) {
  newErrors.diskonPersen = 'Diskon harus antara 0-100%';
}
```

#### 6. Metode Pembayaran
```javascript
if (!formData.metodePembayaran) {
  newErrors.metodePembayaran = 'Metode pembayaran wajib dipilih';
}
```

### Error Display:
- ❌ **Border merah** pada input yang error
- ❌ **Pesan error** di bawah input (text-xs, text-red-500)
- ✅ **Auto clear** error saat user input ulang

## 📊 Data Structure

### Transaction Object
```javascript
{
  tanggal: "2026-05-30",           // ISO date string
  tindakan: "Scaling Gigi",         // String
  dokter: "drg. Amanda",            // String
  biaya: 315000,                    // Number (biaya bersih)
  biayaDasar: 350000,               // Number (sebelum diskon)
  diskon: 10,                       // Number (persentase)
  metode: "Transfer Bank"           // String
}
```

### Patient Object (Updated Fields)
```javascript
{
  // ... existing fields
  riwayatPerawatan: [...transactions],  // Array of transactions
  totalTransaksi: 850000,                 // Sum of all biaya
  metodePembayaran: "Transfer Bank",      // Last payment method
  terakhirKunjungan: "2026-05-30"        // Last transaction date
}
```

## 🎯 User Flow

### Scenario 1: Tambah Tindakan Baru
1. Admin pilih pasien dari dropdown
2. Klik tombol "Tambah Tindakan"
3. Modal terbuka
4. Isi semua field:
   - Tanggal: 30 Mei 2026
   - Jenis: Scaling Gigi
   - Dokter: drg. Amanda
   - Biaya: Rp 350.000
   - Diskon: 10%
   - Metode: Transfer Bank
5. Lihat preview biaya bersih: Rp 315.000
6. Klik "Tambah Tindakan"
7. Modal close
8. Row baru muncul di tabel
9. Summary cards auto update:
   - Total Akumulasi: +Rp 315.000
   - Metode Terakhir: Transfer Bank
   - Kunjungan Terakhir: 30 Mei 2026

### Scenario 2: Ganti Pasien
1. Admin pilih pasien berbeda dari dropdown
2. Summary cards langsung update
3. Tabel show riwayat pasien baru
4. Total keseluruhan sesuai pasien baru

### Scenario 3: Validasi Error
1. Admin klik "Tambah Tindakan"
2. Langsung klik "Tambah Tindakan" tanpa isi form
3. Muncul 5 error messages
4. Border input jadi merah
5. Admin isi field satu per satu
6. Error hilang saat field di-isi
7. Submit berhasil setelah semua valid

## 🚀 Cara Menggunakan

### 1. Akses Module
```
URL: http://localhost:5174/financial-crm
Menu: Sidebar → "Financial CRM"
```

### 2. Pilih Pasien
Gunakan dropdown di atas summary cards untuk memilih pasien.

### 3. Lihat Ringkasan
3 metric cards menampilkan:
- Total akumulasi semua transaksi
- Metode pembayaran terakhir
- Tanggal kunjungan terakhir

### 4. Tambah Transaksi
- Klik "Tambah Tindakan"
- Isi form lengkap
- Submit untuk menyimpan

### 5. Review Riwayat
Scroll tabel untuk melihat semua transaksi pasien dengan detail lengkap.

## 📦 Dependencies

Semua dependencies sudah tersedia di project:
- ✅ React (useState, useMemo)
- ✅ React Icons (FaCalendarAlt, FaTooth, dll)
- ✅ Tailwind CSS
- ✅ React Router DOM
- ✅ ClinicContext (global state)

## 🎨 Component Structure

```
FinancialCRM
├── Header
│   ├── Title & Description
│   └── Button "Tambah Tindakan"
├── Patient Selector (Dropdown)
├── Summary Cards (3 cards)
│   ├── Total Akumulasi
│   ├── Metode Pembayaran
│   └── Kunjungan Terakhir
├── Transaction Table
│   ├── Table Header
│   ├── Table Body (Rows)
│   └── Table Footer (Grand Total)
└── Modal Form
    ├── Modal Header
    ├── Form Fields (7 inputs)
    ├── Preview Biaya Bersih
    └── Action Buttons
```

## 🔥 Optimasi & Best Practices

### Performance Optimization
1. **useMemo**: Memoize summary calculation
2. **Controlled Inputs**: Debounced input changes
3. **Lazy Loading**: Route-based code splitting
4. **Conditional Rendering**: Only render when needed

### Code Quality
1. **Separation of Concerns**: Logic terpisah dari UI
2. **Reusable Functions**: formatCurrency, formatDate
3. **Error Handling**: Comprehensive validation
4. **Clean State**: Reset form after submit

### UX Enhancement
1. **Real-time Preview**: See biaya bersih before submit
2. **Clear Errors**: Helpful error messages
3. **Visual Feedback**: Hover, focus, active states
4. **Empty States**: Friendly messages when no data

## 🐛 Error Handling

### Form Validation Errors
- Display inline below each field
- Red border for invalid inputs
- Clear automatically on input change

### Data Errors
- Check for null/undefined values
- Default to safe fallbacks ('-', 0)
- Format numbers safely with parseFloat

### UI Errors
- Empty state when no transactions
- Graceful degradation if data missing

## 📈 Future Enhancements

Potential improvements:
- [ ] Export to PDF/Excel
- [ ] Filter by date range
- [ ] Filter by payment method
- [ ] Search transactions
- [ ] Print invoice
- [ ] Email receipt
- [ ] Payment reminders
- [ ] Installment support
- [ ] Multi-currency
- [ ] Analytics dashboard
- [ ] Comparison charts
- [ ] Revenue projections

## 📝 Testing Checklist

- [x] Form validation works for all fields
- [x] Biaya bersih calculates correctly
- [x] Summary cards update automatically
- [x] Table shows new transactions
- [x] Grand total calculates correctly
- [x] Patient switching works
- [x] Modal open/close works
- [x] Error messages display correctly
- [x] Currency formatting correct
- [x] Date formatting correct
- [x] Responsive on mobile
- [x] No console errors

## 🎉 Status

**✅ Production Ready**
- Full functionality implemented
- Comprehensive validation
- Clean, maintainable code
- Fully integrated with system
- Optimized performance

---

**Modul Finansial CRM siap digunakan untuk mengelola transaksi pasien dengan mudah dan efisien!** 💰✨
