import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  FaPlus, FaSearch, FaEye, FaEdit, FaTrashAlt,
  FaUserAlt, FaCalendarAlt, FaNotesMedical,
} from "react-icons/fa";

import { useClinic } from "../../context/ClinicContext";

// Custom UI components
import Badge      from "../../components/Badge";
import Avatar     from "../../components/Avatar";
import Card       from "../../components/Card";
import Table      from "../../components/Table";
import Input      from "../../components/Input";
import Select     from "../../components/Select";
import StatCard   from "../../components/StatCard";
import Tooltip    from "../../components/Tooltip";
import Alert      from "../../components/Alert";
import Pagination from "../../components/Pagination";

// Shadcn UI — Button
import { Button } from "@/components/ui/button";

// Shadcn UI — Dialog (menggantikan Modal custom)
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

// Shadcn UI — Combobox (untuk pilih dokter)
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
} from "@/components/ui/combobox";

const EMPTY_FORM = {
  nama: "",
  umur: "",
  jenisKelamin: "L",
  noHp: "",
  alamat: "",
  treatment: "Scaling",
  dokter: "",
  status: "Active",
  // New fields
  tanggalLahir: "",
  email: "",
  kotaProvinsi: "",
  tanggalDaftar: new Date().toISOString().split("T")[0],
  statusMember: "Regular",
  levelMembership: "Bronze",
  statusAktif: true,
  catatanAdmin: "",
  loginTerakhir: "",
  deviceDigunakan: "",
  durasiPenggunaan: "",
  sumberUser: "",
  campaignDiikuti: "",
  statusPromo: "Tidak Aktif",
};

const STATUS_BADGE = {
  Active:    "success",
  Waiting:   "warning",
  Completed: "teal",
  Cancel:    "danger",
};

const PAGE_SIZE = 5;

export default function Pasien() {
  const { patients: data, setPatients: setData, doctors } = useClinic();

  const [searchTerm,   setSearchTerm]   = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [showForm,     setShowForm]     = useState(false);
  const [form,         setForm]         = useState(EMPTY_FORM);
  const [isEdit,       setIsEdit]       = useState(false);
  const [savedAlert,   setSavedAlert]   = useState(false);
  const [currentPage,  setCurrentPage]  = useState(1);

  const totalPasien        = data.length;
  const pasienBaru         = data.filter((p) => p.status === "Waiting").length;
  const appointmentHariIni = 8;

  const filteredPasien = useMemo(() => {
    setCurrentPage(1);
    return data.filter((p) => {
      const matchSearch =
        p.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.noHp.includes(searchTerm);
      const matchStatus = !filterStatus || p.status === filterStatus;
      return matchSearch && matchStatus;
    });
  }, [data, searchTerm, filterStatus]);

  const totalPages  = Math.ceil(filteredPasien.length / PAGE_SIZE);
  const pagedPasien = filteredPasien.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleSave = (e) => {
    e.preventDefault();
    const formattedCampaigns = form.campaignDiikuti
      ? form.campaignDiikuti.split(",").map(c => c.trim()).filter(Boolean)
      : [];
    const savedData = {
      ...form,
      jenisPerawatan: form.treatment,
      campaignDiikuti: formattedCampaigns,
    };
    if (isEdit) {
      setData(data.map((p) => (p.id === form.id ? { ...p, ...savedData } : p)));
    } else {
      setData([
        { ...savedData, id: `PS-${String(data.length + 1).padStart(3, "0")}`, terakhirKunjungan: new Date().toISOString().split("T")[0] },
        ...data,
      ]);
    }
    closeForm();
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 3000);
  };

  const handleDelete = (id) => {
    if (window.confirm("Apakah yakin ingin menghapus pasien?")) {
      setData(data.filter((p) => p.id !== id));
    }
  };

  const openEdit = (p) => {
    setForm({
      id: p.id,
      nama: p.nama,
      umur: p.umur,
      jenisKelamin: p.jenisKelamin,
      noHp: p.noHp,
      alamat: p.alamat,
      treatment: p.treatment || p.jenisPerawatan || "Scaling",
      dokter: p.dokter || "",
      status: p.status,
      tanggalLahir: p.tanggalLahir || "",
      email: p.email || "",
      kotaProvinsi: p.kotaProvinsi || "",
      tanggalDaftar: p.tanggalDaftar || "",
      statusMember: p.statusMember || "Regular",
      levelMembership: p.levelMembership || "Bronze",
      statusAktif: p.statusAktif !== undefined ? p.statusAktif : true,
      catatanAdmin: p.catatanAdmin || "",
      loginTerakhir: p.loginTerakhir || "",
      deviceDigunakan: p.deviceDigunakan || "",
      durasiPenggunaan: p.durasiPenggunaan || "",
      sumberUser: p.sumberUser || "",
      campaignDiikuti: Array.isArray(p.campaignDiikuti) ? p.campaignDiikuti.join(", ") : (p.campaignDiikuti || ""),
      statusPromo: p.statusPromo || "Tidak Aktif",
    });
    setIsEdit(true);
    setShowForm(true);
  };

  const closeForm = () => { setForm(EMPTY_FORM); setIsEdit(false); setShowForm(false); };

  // Kolom tabel
  const columns = [
    {
      key: "nama",
      label: "Nama",
      render: (val, row) => (
        <div className="flex items-center gap-3">
          <Avatar name={val} size="sm" color="bg-[#E8F8F6] text-[#1A7C6E]" />
          <div>
            <Link to={`/pasien/${row.id}`} className="font-semibold text-gray-800 hover:text-[#1A7C6E] transition-colors">
              {val}
            </Link>
            <p className="text-xs text-gray-400">{row.umur} Thn</p>
          </div>
        </div>
      ),
    },
    { key: "noHp",      label: "No HP" },
    { key: "treatment", label: "Treatment", render: (v) => v || "-" },
    { key: "dokter",    label: "Dokter",    render: (v) => v || "-" },
    {
      key: "status",
      label: "Status",
      render: (val) => (
        <Badge variant={STATUS_BADGE[val] || "default"} dot>{val}</Badge>
      ),
    },
    {
      key: "action",
      label: "Action",
      align: "center",
      render: (_, row) => (
        <div className="flex items-center justify-center gap-1">
          <Tooltip content="Lihat Detail" position="top">
            <Link to={`/pasien/${row.id}`}>
              <Button variant="ghost" size="icon-sm"><FaEye /></Button>
            </Link>
          </Tooltip>
          <Tooltip content="Edit" position="top">
            <Button variant="ghost" size="icon-sm" onClick={() => openEdit(row)}>
              <FaEdit />
            </Button>
          </Tooltip>
          <Tooltip content="Hapus" position="top">
            <Button
              variant="ghost" size="icon-sm"
              onClick={() => handleDelete(row.id)}
              className="text-gray-400 hover:text-red-500 hover:bg-red-50"
            >
              <FaTrashAlt />
            </Button>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col w-full pb-10 min-h-screen bg-gray-50/30">

      {/* Banner */}
      <div className="relative bg-gradient-to-r from-[#1A7C6E] to-[#2BB5A0] rounded-3xl px-8 pt-10 pb-24 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl translate-y-1/2" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Patients Management</h1>
            <p className="text-white/80 text-sm max-w-lg">
              Manage patient records, appointments, and treatment history efficiently.
            </p>
          </div>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm"
          >
            <FaPlus />
            Tambah Pasien
          </Button>
        </div>
      </div>

      <div className="relative -mt-14 z-20">

        {savedAlert && (
          <div className="mb-4">
            <Alert variant="success" title="Berhasil!" dismissible onDismiss={() => setSavedAlert(false)}>
              Data pasien berhasil disimpan.
            </Alert>
          </div>
        )}

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <StatCard title="Total Pasien"          value={totalPasien}        icon={<FaUserAlt />}      iconBg="bg-[#E8F8F6]" iconColor="text-[#1A7C6E]" trend={8} trendLabel="bulan ini" />
          <StatCard title="Pasien Baru (Waiting)" value={pasienBaru}         icon={<FaNotesMedical />} iconBg="bg-blue-50"   iconColor="text-blue-600" />
          <StatCard title="Appointment Hari Ini"  value={appointmentHariIni} icon={<FaCalendarAlt />}  iconBg="bg-purple-50" iconColor="text-purple-600" />
        </div>

        {/* Toolbar */}
        <Card padding="sm" className="mb-6">
          <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
            <Input
              placeholder="Search nama / no HP..."
              leftIcon={<FaSearch className="text-xs" />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth={false}
              className="w-full md:w-64"
            />
            <Select
              options={[
                { value: "",          label: "Semua Status" },
                { value: "Active",    label: "Active" },
                { value: "Waiting",   label: "Waiting" },
                { value: "Completed", label: "Completed" },
                { value: "Cancel",    label: "Cancel" },
              ]}
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              placeholder={null}
              fullWidth={false}
              className="w-full md:w-44"
            />
          </div>
        </Card>

        {/* Table */}
        <Table columns={columns} data={pagedPasien} emptyText="Tidak ada data pasien ditemukan." />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-4 flex justify-end">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        )}
      </div>

      {/* ─── Shadcn Dialog — Add / Edit Pasien ─── */}
      <Dialog open={showForm} onOpenChange={(open) => !open && closeForm()}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {isEdit ? "Edit Data Pasien" : "Tambah Pasien Baru"}
            </DialogTitle>
          </DialogHeader>

          <form id="pasien-form" onSubmit={handleSave} className="space-y-6 py-2 max-h-[75vh] overflow-y-auto pr-3">
            
            {/* SECTION 1: IDENTITAS & KONTAK */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-[#1A7C6E] border-b pb-1">1. Identitas & Kontak</h3>
              <Input
                label="Nama Lengkap"
                required
                value={form.nama}
                onChange={(e) => setForm({ ...form, nama: e.target.value })}
              />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input
                  label="Umur"
                  type="number"
                  required
                  value={form.umur}
                  onChange={(e) => setForm({ ...form, umur: e.target.value })}
                />
                <Select
                  label="Jenis Kelamin"
                  options={[{ value: "L", label: "Laki-laki" }, { value: "P", label: "Perempuan" }]}
                  value={form.jenisKelamin}
                  onChange={(e) => setForm({ ...form, jenisKelamin: e.target.value })}
                  placeholder={null}
                />
                <Input
                  label="Tanggal Lahir"
                  type="date"
                  value={form.tanggalLahir}
                  onChange={(e) => setForm({ ...form, tanggalLahir: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Nomor HP"
                  required
                  value={form.noHp}
                  onChange={(e) => setForm({ ...form, noHp: e.target.value })}
                />
                <Input
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Alamat"
                  value={form.alamat}
                  onChange={(e) => setForm({ ...form, alamat: e.target.value })}
                />
                <Input
                  label="Kota/Provinsi"
                  value={form.kotaProvinsi}
                  onChange={(e) => setForm({ ...form, kotaProvinsi: e.target.value })}
                />
              </div>
            </div>

            {/* SECTION 2: AKUN / MEMBERSHIP */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-[#1A7C6E] border-b pb-1">2. Data Akun / Membership</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Tanggal Daftar"
                  type="date"
                  value={form.tanggalDaftar}
                  onChange={(e) => setForm({ ...form, tanggalDaftar: e.target.value })}
                />
                <Select
                  label="Status Member"
                  options={["Regular", "Premium"]}
                  value={form.statusMember}
                  onChange={(e) => setForm({ ...form, statusMember: e.target.value })}
                  placeholder={null}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="Level Membership"
                  options={["Bronze", "Silver", "Gold", "Platinum"]}
                  value={form.levelMembership}
                  onChange={(e) => setForm({ ...form, levelMembership: e.target.value })}
                  placeholder={null}
                />
                <Select
                  label="Status Aktif"
                  options={[
                    { value: "true", label: "Aktif" },
                    { value: "false", label: "Nonaktif" }
                  ]}
                  value={String(form.statusAktif)}
                  onChange={(e) => setForm({ ...form, statusAktif: e.target.value === "true" })}
                  placeholder={null}
                />
              </div>
            </div>

            {/* SECTION 3: AKTIVITAS USER */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-[#1A7C6E] border-b pb-1">3. Aktivitas User</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input
                  label="Login Terakhir"
                  type="datetime-local"
                  value={form.loginTerakhir}
                  onChange={(e) => setForm({ ...form, loginTerakhir: e.target.value })}
                />
                <Input
                  label="Device yang Digunakan"
                  placeholder="Contoh: Android - Samsung S23"
                  value={form.deviceDigunakan}
                  onChange={(e) => setForm({ ...form, deviceDigunakan: e.target.value })}
                />
                <Input
                  label="Durasi Penggunaan"
                  placeholder="Contoh: 45 menit"
                  value={form.durasiPenggunaan}
                  onChange={(e) => setForm({ ...form, durasiPenggunaan: e.target.value })}
                />
              </div>
            </div>

            {/* SECTION 4: MARKETING & ENGAGEMENT */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-[#1A7C6E] border-b pb-1">4. Marketing & Engagement</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input
                  label="Sumber User"
                  placeholder="Contoh: Instagram, Google"
                  value={form.sumberUser}
                  onChange={(e) => setForm({ ...form, sumberUser: e.target.value })}
                />
                <Input
                  label="Campaign yang Diikuti"
                  placeholder="Pisahkan dengan koma"
                  value={form.campaignDiikuti}
                  onChange={(e) => setForm({ ...form, campaignDiikuti: e.target.value })}
                />
                <Select
                  label="Status Promo"
                  options={["Aktif", "Tidak Aktif"]}
                  value={form.statusPromo}
                  onChange={(e) => setForm({ ...form, statusPromo: e.target.value })}
                  placeholder={null}
                />
              </div>
            </div>

            {/* SECTION 5: DATA TRANSAKSI & PERAWATAN */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-[#1A7C6E] border-b pb-1">5. Data Transaksi & Perawatan</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="Jenis Perawatan (Treatment)"
                  options={[
                    "Scaling",
                    "Tambal Gigi",
                    "Cabut Gigi",
                    "Behel",
                    "Whitening",
                    "Veneer",
                    "Konsultasi",
                    "Perawatan Saluran Akar"
                  ]}
                  value={form.treatment}
                  onChange={(e) => setForm({ ...form, treatment: e.target.value })}
                  placeholder={null}
                />
                <Select
                  label="Status Pasien"
                  options={["Active", "Waiting", "Completed", "Cancel"]}
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  placeholder={null}
                />
              </div>

              {/* ─── Shadcn Combobox — Pilih Dokter ─── */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-700">
                  Pilih Dokter
                </label>
                <Combobox
                  value={form.dokter}
                  onValueChange={(val) => setForm({ ...form, dokter: val })}
                >
                  <ComboboxInput
                    placeholder="Cari nama dokter..."
                    showClear={!!form.dokter}
                  />
                  <ComboboxContent>
                    <ComboboxList>
                      <ComboboxEmpty>Dokter tidak ditemukan.</ComboboxEmpty>
                      {doctors.map((d) => (
                        <ComboboxItem key={d.id} value={d.nama}>
                          <div className="flex items-center gap-2">
                            <Avatar name={d.nama.replace("drg. ", "")} size="xs" color="bg-[#E8F8F6] text-[#1A7C6E]" />
                            <div>
                              <p className="text-sm font-medium">{d.nama}</p>
                              <p className="text-xs text-gray-400">{d.spesialis}</p>
                            </div>
                          </div>
                        </ComboboxItem>
                      ))}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
                {form.dokter && (
                  <p className="text-xs text-[#1A7C6E] font-medium mt-0.5">
                    ✓ Dipilih: {form.dokter}
                  </p>
                )}
              </div>

              <Input
                label="Catatan Admin"
                value={form.catatanAdmin}
                onChange={(e) => setForm({ ...form, catatanAdmin: e.target.value })}
              />
            </div>

          </form>

          <DialogFooter>
            <Button variant="outline" onClick={closeForm}>Batal</Button>
            <Button type="submit" form="pasien-form">Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
