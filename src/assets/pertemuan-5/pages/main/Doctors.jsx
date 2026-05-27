import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaPlus, FaSearch, FaEye, FaEdit, FaTrashAlt,
  FaUserMd, FaStethoscope, FaCalendarCheck,
} from "react-icons/fa";

import { useClinic } from "../../context/ClinicContext";

// Custom UI components
import Badge    from "../../components/Badge";
import Avatar   from "../../components/Avatar";
import Card     from "../../components/Card";
import Table    from "../../components/Table";
import Input    from "../../components/Input";
import Select   from "../../components/Select";
import StatCard from "../../components/StatCard";
import Tooltip  from "../../components/Tooltip";
import Alert    from "../../components/Alert";

// Shadcn UI
import { Button }   from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import {
  Combobox, ComboboxInput, ComboboxContent,
  ComboboxList, ComboboxItem, ComboboxEmpty,
} from "@/components/ui/combobox";

const EMPTY_FORM = {
  nama: "", spesialis: "", noHp: "", email: "", jadwal: "", status: "Active",
};

const STATUS_BADGE = { Active: "success", Inactive: "default" };

// ─── Skeleton Components ──────────────────────────────────────────────────────
function StatCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-5">
      <Skeleton className="w-14 h-14 rounded-full shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-7 w-12" />
      </div>
    </div>
  );
}

function TableSkeleton({ rows = 5, cols = 6 }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* thead skeleton */}
      <div className="flex gap-4 px-6 py-3 border-b border-gray-100 bg-gray-50">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} className="h-3 flex-1" />
        ))}
      </div>
      {/* rows skeleton */}
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 px-6 py-4 border-b border-gray-50 last:border-0">
          <Skeleton className="w-10 h-10 rounded-full shrink-0" />
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-20" />
          </div>
          <Skeleton className="h-4 w-24 hidden md:block" />
          <Skeleton className="h-4 w-28 hidden lg:block" />
          <Skeleton className="h-4 w-8 hidden lg:block" />
          <Skeleton className="h-5 w-16 rounded-full" />
          <div className="flex gap-1 shrink-0">
            <Skeleton className="w-7 h-7 rounded-lg" />
            <Skeleton className="w-7 h-7 rounded-lg" />
            <Skeleton className="w-7 h-7 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Doctors() {
  const { doctors, setDoctors, patients } = useClinic();

  const [searchTerm,   setSearchTerm]   = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [showForm,     setShowForm]     = useState(false);
  const [form,         setForm]         = useState(EMPTY_FORM);
  const [isEdit,       setIsEdit]       = useState(false);
  const [savedAlert,   setSavedAlert]   = useState(false);
  const [isLoading,    setIsLoading]    = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  const totalDokter      = doctors.length;
  const dokterAktif      = doctors.filter((d) => d.status === "Active").length;
  const treatmentHariIni = 12;

  const filteredDoctors = useMemo(() => {
    return doctors.filter((d) => {
      const matchSearch =
        d.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.spesialis.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = !filterStatus || d.status === filterStatus;
      return matchSearch && matchStatus;
    });
  }, [doctors, searchTerm, filterStatus]);

  const handleSave = (e) => {
    e.preventDefault();
    if (isEdit) {
      setDoctors(doctors.map((d) => (d.id === form.id ? { ...d, ...form } : d)));
    } else {
      setDoctors([
        { ...form, id: `DR-${String(doctors.length + 1).padStart(3, "0")}` },
        ...doctors,
      ]);
    }
    closeForm();
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 3000);
  };

  const handleDelete = (id) => {
    if (window.confirm("Apakah yakin ingin menghapus dokter ini?")) {
      setDoctors(doctors.filter((d) => d.id !== id));
    }
  };

  const openEdit  = (d) => { setForm(d); setIsEdit(true); setShowForm(true); };
  const closeForm = ()  => { setForm(EMPTY_FORM); setIsEdit(false); setShowForm(false); };

  // Spesialis unik untuk Combobox
  const spesialisList = [...new Set(doctors.map((d) => d.spesialis))];

  const columns = [
    {
      key: "nama",
      label: "Dokter",
      render: (val, row) => (
        <div className="flex items-center gap-3">
          <Avatar name={val.replace("drg. ", "")} size="md" color="bg-[#E8F8F6] text-[#1A7C6E]" />
          <div>
            <Link to={`/doctors/${row.id}`} className="font-semibold text-gray-800 hover:text-[#1A7C6E] transition-colors">
              {val}
            </Link>
            <p className="text-xs text-gray-400">{row.noHp}</p>
          </div>
        </div>
      ),
    },
    { key: "spesialis", label: "Spesialis" },
    { key: "jadwal",    label: "Jadwal" },
    {
      key: "totalPasien",
      label: "Total Pasien",
      align: "center",
      render: (_, row) => (
        <span className="font-bold text-[#1A7C6E]">
          {patients.filter((p) => p.dokter === row.nama).length}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (val) => <Badge variant={STATUS_BADGE[val] || "default"} dot>{val}</Badge>,
    },
    {
      key: "action",
      label: "Action",
      align: "center",
      render: (_, row) => (
        <div className="flex items-center justify-center gap-1">
          <Tooltip content="Lihat Detail" position="top">
            <Link to={`/doctors/${row.id}`}>
              <Button variant="ghost" size="icon-sm"><FaEye /></Button>
            </Link>
          </Tooltip>
          <Tooltip content="Edit" position="top">
            <Button variant="ghost" size="icon-sm" onClick={() => openEdit(row)}>
              <FaEdit />
            </Button>
          </Tooltip>
          <Tooltip content="Hapus" position="top">
            <Button variant="ghost" size="icon-sm" onClick={() => handleDelete(row.id)}
              className="text-gray-400 hover:text-red-500 hover:bg-red-50">
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
            <h1 className="text-3xl font-bold mb-2">Doctors Management</h1>
            <p className="text-white/80 text-sm max-w-lg">
              Manage doctor schedules, monitor active doctors, and organize clinic services efficiently.
            </p>
          </div>
          <Button onClick={() => setShowForm(true)}
            className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm">
            <FaPlus /> Tambah Dokter
          </Button>
        </div>
      </div>

      <div className="relative -mt-14 z-20">

        {savedAlert && (
          <div className="mb-4">
            <Alert variant="success" title="Berhasil!" dismissible onDismiss={() => setSavedAlert(false)}>
              Data dokter berhasil disimpan.
            </Alert>
          </div>
        )}

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {isLoading ? (
            <><StatCardSkeleton /><StatCardSkeleton /><StatCardSkeleton /></>
          ) : (
            <>
              <StatCard title="Total Dokter"       value={totalDokter}      icon={<FaUserMd />}        iconBg="bg-[#E8F8F6]" iconColor="text-[#1A7C6E]" />
              <StatCard title="Dokter Aktif"       value={dokterAktif}      icon={<FaStethoscope />}   iconBg="bg-blue-50"   iconColor="text-blue-600" />
              <StatCard title="Treatment Hari Ini" value={treatmentHariIni} icon={<FaCalendarCheck />} iconBg="bg-purple-50" iconColor="text-purple-600" />
            </>
          )}
        </div>

        {/* Toolbar */}
        <Card padding="sm" className="mb-6">
          <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
            <Input
              placeholder="Search dokter..."
              leftIcon={<FaSearch className="text-xs" />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth={false}
              className="w-full md:w-64"
            />
            <Select
              options={[
                { value: "",         label: "Semua Status" },
                { value: "Active",   label: "Active" },
                { value: "Inactive", label: "Inactive" },
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
        {isLoading
          ? <TableSkeleton rows={3} cols={6} />
          : <Table columns={columns} data={filteredDoctors} emptyText="Tidak ada data dokter ditemukan." />
        }
      </div>

      {/* ─── Shadcn Dialog — Add / Edit Dokter ─── */}
      <Dialog open={showForm} onOpenChange={(open) => !open && closeForm()}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{isEdit ? "Edit Data Dokter" : "Tambah Dokter Baru"}</DialogTitle>
          </DialogHeader>

          <form id="doctor-form" onSubmit={handleSave} className="space-y-4 py-2">
            <Input
              label="Nama Dokter" required
              value={form.nama}
              onChange={(e) => setForm({ ...form, nama: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-4">
              {/* ─── Shadcn Combobox — Pilih Spesialis ─── */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-700">Spesialis</label>
                <Combobox
                  value={form.spesialis}
                  onValueChange={(val) => setForm({ ...form, spesialis: val })}
                >
                  <ComboboxInput placeholder="Cari / ketik spesialis..." showClear={!!form.spesialis} />
                  <ComboboxContent>
                    <ComboboxList>
                      <ComboboxEmpty>Tidak ditemukan. Ketik manual.</ComboboxEmpty>
                      {spesialisList.map((s) => (
                        <ComboboxItem key={s} value={s}>{s}</ComboboxItem>
                      ))}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              </div>
              <Input
                label="Nomor HP" required
                value={form.noHp}
                onChange={(e) => setForm({ ...form, noHp: e.target.value })}
              />
            </div>
            <Input
              label="Email" type="email" required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Jadwal Praktik" required
                value={form.jadwal}
                onChange={(e) => setForm({ ...form, jadwal: e.target.value })}
              />
              <Select
                label="Status"
                options={["Active", "Inactive"]}
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                placeholder={null}
              />
            </div>
          </form>

          <DialogFooter>
            <Button variant="outline" onClick={closeForm}>Batal</Button>
            <Button type="submit" form="doctor-form">Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
