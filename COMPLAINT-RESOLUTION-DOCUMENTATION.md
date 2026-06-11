# 📢 Pusat Resolusi Komplain & Masukan Pasien - Dokumentasi

## 📋 Overview

**Pusat Resolusi Komplain & Masukan Pasien** adalah modul manajemen komplain yang memungkinkan admin untuk memonitor, mengelola, dan menyelesaikan komplain pasien secara efisien. Modul ini dirancang untuk meningkatkan kualitas layanan klinik gigi melalui penanganan komplain yang cepat dan terstruktur.

## ✨ Fitur Utama

### 1. **Ringkasan Statistik Komplain (3 Metric Cards)**

#### Card 1: Total Komplain Masuk 📊
- **Display**: Total semua komplain yang tercatat dalam sistem
- **Visual**: White card dengan icon FaCommentDots ungu
- **Info**: Menampilkan angka total dari semua status

#### Card 2: Sedang Diproses (In Progress) ⏳
- **Display**: Jumlah komplain yang sedang dalam penanganan
- **Visual**: Gradient blue card dengan icon FaHourglassHalf
- **Highlight**: Status "In Progress" menunjukkan admin aktif menangani
- **Design**: Shadow-lg dengan hover effect

#### Card 3: Selesai (Resolved) ✅
- **Display**: Jumlah komplain yang sudah diselesaikan
- **Visual**: Gradient emerald-to-teal card dengan icon FaCheckCircle
- **Metric**: Key performance indicator untuk customer satisfaction
- **Design**: Gradient dengan white icon background

### 2. **Alert Banner (Pending Counter)**
- **Conditional Render**: Hanya muncul jika ada komplain pending
- **Visual**: Amber background dengan left border amber-500
- **Message**: "Perhatian: X komplain menunggu untuk ditangani"
- **Purpose**: Urgent reminder untuk admin

### 3. **Filter Status Bar**
- **Options**: All, Pending, In Progress, Resolved
- **Active State**: Emerald background untuk filter aktif
- **Counter Badge**: Menampilkan jumlah per status
- **Real-time**: Tabel langsung update saat filter berubah

### 4. **Tabel Manajemen Komplain**

#### Kolom Tabel:
1. **ID**: Kode unik komplain (C-001, C-002, dst)
2. **Tanggal**: Tanggal komplain masuk (format Indonesia)
3. **Nama Pasien**: Nama lengkap pasien dengan avatar inisial
4. **Isi Keluhan/Komplain**: Deskripsi lengkap komplain (line-clamp-2)
5. **Prioritas**: Badge High/Medium/Low dengan warna berbeda
6. **Status**: Badge Pending/In Progress/Resolved dengan icon
7. **Aksi**: Dropdown menu untuk ubah status

#### Fitur Tabel:
- ✅ **Hover Effect**: Row highlight saat hover
- ✅ **Avatar Inisial**: Gradient circle dengan huruf pertama nama
- ✅ **Line Clamp**: Komplain panjang di-truncate dengan ellipsis
- ✅ **Empty State**: Friendly message saat tidak ada data
- ✅ **Footer Stats**: Summary statistik di bawah tabel
- ✅ **Responsive**: Horizontal scroll untuk mobile

### 5. **Dropdown Action Menu**

#### Fitur:
- **Icon Button**: FaEllipsisV dengan hover effect
- **Dropdown Position**: Absolute positioning, align right
- **Backdrop**: Click outside to close
- **Dynamic Options**: Hanya menampilkan status yang berbeda dari current
- **Status Icons**: Setiap option punya icon yang sesuai
- **Hover Effect**: Background gray-50 saat hover

#### Action Flow:
1. User klik icon ellipsis (⋮)
2. Dropdown menu muncul
3. Admin pilih status baru
4. Status langsung update
5. Dropdown auto close
6. Statistics cards auto update

### 6. **Success Rate Indicator**

#### Fitur:
- **Progress Bar**: Visual representation persentase resolved
- **Percentage**: Dihitung dari (resolved / total) × 100%
- **Gradient Fill**: Emerald-to-teal gradient untuk progress
- **Animation**: Smooth transition saat nilai berubah
- **Counter**: "X dari Y" komplain resolved

## 🎨 Status Badge Design

### Pending (Kuning/Oranye)
```javascript
{
  bgColor: 'bg-amber-100',
  textColor: 'text-amber-800',
  borderColor: 'border-amber-300',
  icon: FaExclamationCircle,
  iconColor: 'text-amber-600'
}
```
**Visual**: Background amber-100, text amber-800, icon warning

### In Progress (Biru)
```javascript
{
  bgColor: 'bg-blue-100',
  textColor: 'text-blue-800',
  borderColor: 'border-blue-300',
  icon: FaHourglassHalf,
  iconColor: 'text-blue-600'
}
```
**Visual**: Background blue-100, text blue-800, icon hourglass

### Resolved (Hijau)
```javascript
{
  bgColor: 'bg-emerald-100',
  textColor: 'text-emerald-800',
  borderColor: 'border-emerald-300',
  icon: FaCheckCircle,
  iconColor: 'text-emerald-600'
}
```
**Visual**: Background emerald-100, text emerald-800, icon checkmark

## 🎯 Priority Badge Design

### High Priority (Merah)
```javascript
{
  bgColor: 'bg-red-50',
  textColor: 'text-red-700',
  borderColor: 'border-red-200'
}
```

### Medium Priority (Kuning)
```javascript
{
  bgColor: 'bg-yellow-50',
  textColor: 'text-yellow-700',
  borderColor: 'border-yellow-200'
}
```

### Low Priority (Abu)
```javascript
{
  bgColor: 'bg-gray-50',
  textColor: 'text-gray-700',
  borderColor: 'border-gray-200'
}
```

## 🔧 State Management & Logic

### React State Hooks

#### 1. **complaints** - State data komplain
```javascript
const [complaints, setComplaints] = useState(INITIAL_COMPLAINTS);
```
**Purpose**: Menyimpan array data komplain yang bisa diupdate

#### 2. **openDropdown** - State dropdown visibility
```javascript
const [openDropdown, setOpenDropdown] = useState(null);
```
**Purpose**: Track dropdown mana yang sedang terbuka (by complaint ID)

#### 3. **filterStatus** - State filter aktif
```javascript
const [filterStatus, setFilterStatus] = useState('All');
```
**Purpose**: Filter tabel berdasarkan status yang dipilih

### Kalkulasi Statistik dengan useMemo

```javascript
const statistics = useMemo(() => {
  const totalKomplain = complaints.length;
  const pending = complaints.filter(c => c.status === 'Pending').length;
  const inProgress = complaints.filter(c => c.status === 'In Progress').length;
  const resolved = complaints.filter(c => c.status === 'Resolved').length;

  return {
    totalKomplain,
    pending,
    inProgress,
    resolved
  };
}, [complaints]);
```

**Keunggulan useMemo**:
- ✅ **Performance**: Hanya re-calculate saat `complaints` berubah
- ✅ **Real-time**: Auto update saat status berubah
- ✅ **Optimized**: Menghindari kalkulasi berulang di setiap render
- ✅ **Dependency**: React track changes pada `complaints` array

### Filter Complaints dengan useMemo

```javascript
const filteredComplaints = useMemo(() => {
  if (filterStatus === 'All') return complaints;
  return complaints.filter(c => c.status === filterStatus);
}, [complaints, filterStatus]);
```

**Benefits**:
- ✅ Filter hanya run saat `complaints` atau `filterStatus` berubah
- ✅ Efficient filtering untuk dataset besar
- ✅ Smooth UI experience

### Handle Status Change Logic

```javascript
const handleStatusChange = (complaintId, newStatus) => {
  setComplaints(prevComplaints =>
    prevComplaints.map(complaint =>
      complaint.id === complaintId
        ? { ...complaint, status: newStatus }
        : complaint
    )
  );
  setOpenDropdown(null);
};
```

**Flow**:
1. Admin klik menu item dropdown dengan status baru
2. Function menerima `complaintId` dan `newStatus`
3. `map()` iterate semua complaints
4. Find complaint dengan ID yang match
5. Update status complaint tersebut (immutable update)
6. Return complaint lain tanpa perubahan
7. Close dropdown dengan `setOpenDropdown(null)`
8. React re-render component
9. useMemo detect perubahan `complaints`
10. Statistics auto re-calculate
11. UI update dengan data baru

### Real-time Statistics Update

**Dependency Chain**:
```
handleStatusChange()
  ↓
setComplaints() updates state
  ↓
complaints dependency triggers useMemo
  ↓
statistics recalculated
  ↓
Components re-render with new stats
  ↓
Cards, table, progress bar updated
```

**No Manual Refresh Needed!**

## 📊 Data Structure

### Complaint Object
```javascript
{
  id: 'C-001',                                    // String
  tanggal: '2026-05-28',                          // ISO date string
  namaPasien: 'Andi Pratama',                     // String
  isiKomplain: 'Antrian terlalu lama...',         // String
  status: 'Pending',                              // 'Pending' | 'In Progress' | 'Resolved'
  prioritas: 'High'                               // 'High' | 'Medium' | 'Low'
}
```

### Statistics Object (useMemo output)
```javascript
{
  totalKomplain: 10,      // Number
  pending: 3,             // Number
  inProgress: 4,          // Number
  resolved: 3             // Number
}
```

## 🎯 User Flow Scenarios

### Scenario 1: Admin Ubah Status dari Pending ke In Progress

1. **Initial State**:
   - Total: 10, Pending: 3, In Progress: 4, Resolved: 3
   - Komplain C-001 status "Pending"

2. **User Action**:
   - Admin klik icon ⋮ di row C-001
   - Dropdown menu muncul
   - Admin klik "In Progress"

3. **System Response**:
   - `handleStatusChange('C-001', 'In Progress')` triggered
   - State `complaints` updated
   - useMemo detect change
   - Statistics recalculated

4. **Final State**:
   - Total: 10, Pending: 2, In Progress: 5, Resolved: 3
   - Komplain C-001 status "In Progress"
   - Badge berubah dari amber ke blue
   - Cards auto update tanpa refresh

### Scenario 2: Admin Selesaikan Komplain

1. **Initial**: In Progress: 5, Resolved: 3
2. **Action**: Admin ubah C-001 dari "In Progress" ke "Resolved"
3. **Result**: In Progress: 4, Resolved: 4
4. **Bonus**: Success rate naik dari 30% ke 40%
5. **Progress Bar**: Auto animate ke width baru

### Scenario 3: Filter Komplain by Status

1. **Initial**: Tabel menampilkan semua 10 komplain
2. **Action**: Admin klik filter "Pending"
3. **Result**: Tabel hanya show 3 komplain pending
4. **Visual**: Filter button "Pending" jadi emerald (active)
5. **Info**: Footer text "Menampilkan 3 dari 10 komplain"

## 🎨 Design System

### Color Palette

#### Status Colors
- **Pending**: Amber (warning, needs attention)
- **In Progress**: Blue (active, being handled)
- **Resolved**: Emerald/Teal (success, completed)

#### Priority Colors
- **High**: Red (urgent)
- **Medium**: Yellow (moderate)
- **Low**: Gray (normal)

#### UI Colors
- **Background**: Gray-50
- **Cards**: White
- **Borders**: Gray-200
- **Text Primary**: Gray-900
- **Text Secondary**: Gray-600

### Typography
- **Heading**: 3xl, bold
- **Card Title**: lg/xl, bold
- **Table Header**: xs, uppercase, bold
- **Body Text**: sm, normal
- **Badge**: xs, semibold

### Spacing & Layout
- **Container**: max-w-7xl, mx-auto
- **Section Gap**: mb-6 (24px)
- **Card Padding**: p-6 (24px)
- **Table Cell**: px-6 py-4
- **Border Radius**: rounded-xl (12px)

## 🚀 Cara Menggunakan

### 1. Akses Module
```
URL: http://localhost:5174/complaints
Menu: Sidebar → "Complaints"
```

### 2. Monitor Statistics
Lihat 3 metric cards untuk overview cepat status komplain.

### 3. Filter Komplain
Gunakan filter bar untuk melihat komplain berdasarkan status tertentu.

### 4. Ubah Status Komplain
- Klik icon ⋮ (ellipsis) di kolom "Aksi"
- Pilih status baru dari dropdown
- Status langsung update

### 5. Track Success Rate
Monitor progress bar di bawah tabel untuk melihat persentase komplain yang sudah diselesaikan.

## 📦 Dependencies

- ✅ React (useState, useMemo)
- ✅ React Icons (FaExclamationCircle, FaHourglassHalf, FaCheckCircle, dll)
- ✅ Tailwind CSS
- ✅ React Router DOM

## 🎨 Component Structure

```
ComplaintResolution
├── Header
│   ├── Title
│   └── Description
├── Statistics Cards (3)
│   ├── Total Komplain
│   ├── In Progress (Gradient)
│   └── Resolved (Gradient)
├── Alert Banner (Conditional)
├── Filter Bar
│   └── Filter Buttons (4)
├── Complaints Table
│   ├── Table Header
│   ├── Table Body
│   │   └── Rows with Dropdown Actions
│   └── Table Footer (Stats)
└── Success Rate Indicator
    ├── Percentage Display
    └── Progress Bar
```

## 🔥 Advanced Features

### 1. Conditional Alert
```javascript
{statistics.pending > 0 && (
  <div className="bg-amber-50 border-l-4 border-amber-500...">
    Perhatian: {statistics.pending} komplain menunggu
  </div>
)}
```

### 2. Dynamic Dropdown Options
```javascript
const getStatusOptions = (currentStatus) => {
  return ['Pending', 'In Progress', 'Resolved']
    .filter(status => status !== currentStatus);
};
```
**Logic**: Hanya show status yang berbeda dari current status

### 3. Click Outside to Close
```javascript
<div
  className="fixed inset-0 z-10"
  onClick={() => setOpenDropdown(null)}
/>
```
**UX**: User bisa close dropdown dengan klik di luar area

### 4. Line Clamp for Long Text
```javascript
<p className="line-clamp-2">{complaint.isiKomplain}</p>
```
**Visual**: Komplain panjang di-truncate dengan "..." setelah 2 baris

### 5. Animated Progress Bar
```javascript
<div
  className="...transition-all duration-500"
  style={{
    width: `${(resolved / total) * 100}%`
  }}
></div>
```
**Animation**: Smooth transition 500ms saat width berubah

## 🐛 Error Handling

### Empty State Handling
```javascript
{filteredComplaints.length > 0 ? (
  // Show table rows
) : (
  // Show empty state with icon and message
)}
```

### Safe Math Operations
```javascript
{statistics.totalKomplain > 0
  ? Math.round((statistics.resolved / statistics.totalKomplain) * 100)
  : 0}%
```
**Protection**: Prevent division by zero

## 📈 Future Enhancements

- [ ] Tambah kolom "Response Time"
- [ ] Export data ke PDF/Excel
- [ ] Filter by date range
- [ ] Filter by priority
- [ ] Search by patient name
- [ ] Sorting by column
- [ ] Pagination for large datasets
- [ ] Email notification to patient
- [ ] Admin comments/notes
- [ ] Complaint history timeline
- [ ] Analytics dashboard
- [ ] SLA tracking

## 📝 Testing Checklist

- [x] Statistics cards calculate correctly
- [x] Status change updates statistics real-time
- [x] Filter works for all status options
- [x] Dropdown opens/closes correctly
- [x] Click outside closes dropdown
- [x] Empty state displays when no data
- [x] Success rate calculates correctly
- [x] Progress bar animates smoothly
- [x] Alert banner shows/hides correctly
- [x] Badge colors consistent
- [x] Responsive on mobile
- [x] No console errors

## 🎉 Status

**✅ Production Ready**
- Clean, maintainable code
- Real-time statistics update
- Smooth UX interactions
- Comprehensive mock data
- Fully responsive design
- Optimized performance

---

**Pusat Resolusi Komplain siap digunakan untuk meningkatkan kualitas layanan klinik!** 📢✨
