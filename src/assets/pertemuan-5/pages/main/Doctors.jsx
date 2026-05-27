import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  FaPlus, FaSearch, FaEye, FaEdit, FaTrashAlt,
  FaUserMd, FaStethoscope, FaCalendarCheck,
} from "react-icons/fa";

import { useClinic } from "../../context/ClinicContext";
import Button    from "../../components/Button";
import Badge     from "../../components/Badge";
import Avatar    from "../../components/Avatar";
import Card      from "../../components/Card";
import Table     from "../../components/Table";
import Input     from "../../components/Input";
import Select    from "../../components/Select";
import Modal     from "../../components/Modal";
import StatCard  from "../../components/StatCard";
import Tooltip   from "../../components/Tooltip";
import Alert     from "../../components/Alert";

const EMPTY_FORM = {
  nama: "", spesialis: "", noHp: "", email: "", jadwal: "", status: "Active",
};

const STATUS_BADGE = {
  Active:   "success",
  Inactive: "default",
};

export default function Doctors() {
  const { doctors, setDoctors, patients } = useClinic();

  const [searchTerm,    setSearchTerm]    = useState("");
  const [filterStatus,  setFilterStatus]  = useState("");
  const [showForm,      setShowForm]      = useState(false);
  const [form,          setForm]          = useState(EMPTY_FORM);
  const [isEdit,        setIsEdit]        = useState(false);
  const [savedAlert,    setSavedAlert]    = useState(false);

  const totalDokter        = doctors.length;
  const dokterAktif        = doctors.filter((d) => d.status === "Active").length;
  const treatmentHariIni   = 12;

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

  const openEdit = (d) => { setForm(d); setIsEdit(true); setShowForm(true); };
  const closeForm = () => { setForm(EMPTY_FORM); setIsEdit(false); setShowForm(false); };

  // Kolom tabel
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
      render: (val) => (
        <Badge variant={STATUS_BADGE[val] || "default"} dot>{val}</Badge>
      ),
    },
    {
      key: "action",
      label: "Action",
      align: "center",
      render: (_, row) => (
        <div className="flex items-center justify-center gap-2">
          <Tooltip content="Lihat Detail" position="top">
            <Link to={`/doctors/${row.id}`}>
              <Button variant="ghost" size="sm" leftIcon={<FaEye />} />
            </Link>
          </Tooltip>
          <Tooltip content="Edit" position="top">
            <Button variant="ghost" size="sm" leftIcon={<FaEdit />} onClick={() => openEdit(row)} />
          </Tooltip>
          <Tooltip content="Hapus" position="top">
            <Button variant="ghost" size="sm" leftIcon={<FaTrashAlt />} onClick={() => handleDelete(row.id)}
              className="hover:text-red-500 hover:bg-red-50" />
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
          <Button
            variant="secondary"
            leftIcon={<FaPlus />}
            onClick={() => setShowForm(true)}
            className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm"
          >
            Tambah Dokter
          </Button>
        </div>
      </div>

      <div className="relative -mt-14 z-20">

        {/* Alert sukses */}
        {savedAlert && (
          <div className="mb-4">
            <Alert variant="success" title="Berhasil!" dismissible onDismiss={() => setSavedAlert(false)}>
              Data dokter berhasil disimpan.
            </Alert>
          </div>
        )}

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <StatCard title="Total Dokter"       value={totalDokter}      icon={<FaUserMd />}        iconBg="bg-[#E8F8F6]"  iconColor="text-[#1A7C6E]" />
          <StatCard title="Dokter Aktif"       value={dokterAktif}      icon={<FaStethoscope />}   iconBg="bg-blue-50"    iconColor="text-blue-600" />
          <StatCard title="Treatment Hari Ini" value={treatmentHariIni} icon={<FaCalendarCheck />} iconBg="bg-purple-50"  iconColor="text-purple-600" />
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
        <Table columns={columns} data={filteredDoctors} emptyText="Tidak ada data dokter ditemukan." />
      </div>

      {/* Modal Add/Edit */}
      <Modal
        isOpen={showForm}
        onClose={closeForm}
        title={isEdit ? "Edit Data Dokter" : "Tambah Dokter Baru"}
        size="md"
        footer={
          <>
            <Button variant="ghost" onClick={closeForm}>Batal</Button>
            <Button variant="primary" onClick={handleSave} type="submit" form="doctor-form">Simpan</Button>
          </>
        }
      >
        <form id="doctor-form" onSubmit={handleSave} className="space-y-4">
          <Input
            label="Nama Dokter"
            required
            value={form.nama}
            onChange={(e) => setForm({ ...form, nama: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Spesialis"
              required
              value={form.spesialis}
              onChange={(e) => setForm({ ...form, spesialis: e.target.value })}
            />
            <Input
              label="Nomor HP"
              required
              value={form.noHp}
              onChange={(e) => setForm({ ...form, noHp: e.target.value })}
            />
          </div>
          <Input
            label="Email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Jadwal Praktik"
              required
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
      </Modal>
    </div>
  );
}
