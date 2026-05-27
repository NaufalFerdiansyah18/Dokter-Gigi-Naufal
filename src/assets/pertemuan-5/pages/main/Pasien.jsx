import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  FaPlus, FaSearch, FaEye, FaEdit, FaTrashAlt,
  FaUserAlt, FaCalendarAlt, FaNotesMedical,
} from "react-icons/fa";

import { useClinic } from "../../context/ClinicContext";
import Button   from "../../components/Button";
import Badge    from "../../components/Badge";
import Avatar   from "../../components/Avatar";
import Card     from "../../components/Card";
import Table    from "../../components/Table";
import Input    from "../../components/Input";
import Select   from "../../components/Select";
import Modal    from "../../components/Modal";
import StatCard from "../../components/StatCard";
import Tooltip  from "../../components/Tooltip";
import Alert    from "../../components/Alert";
import Pagination from "../../components/Pagination";

const EMPTY_FORM = {
  nama: "", umur: "", jenisKelamin: "L", noHp: "",
  alamat: "", treatment: "", dokter: "", status: "Active",
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
    if (isEdit) {
      setData(data.map((p) => (p.id === form.id ? { ...p, ...form } : p)));
    } else {
      setData([
        { ...form, id: `PS-${String(data.length + 1).padStart(3, "0")}`, terakhirKunjungan: "-" },
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
    setForm({ id: p.id, nama: p.nama, umur: p.umur, jenisKelamin: p.jenisKelamin,
      noHp: p.noHp, alamat: p.alamat, treatment: p.treatment || "",
      dokter: p.dokter || "", status: p.status });
    setIsEdit(true);
    setShowForm(true);
  };

  const closeForm = () => { setForm(EMPTY_FORM); setIsEdit(false); setShowForm(false); };

  const doctorOptions = [
    { value: "", label: "Pilih Dokter" },
    ...doctors.map((d) => ({ value: d.nama, label: d.nama })),
  ];

  // Kolom tabel
  const columns = [
    {
      key: "nama",
      label: "Nama",
      render: (val, row) => (
        <div className="flex items-center gap-3">
          <Avatar name={val} size="sm" color="bg-[#E8F8F6] text-[#1A7C6E]" />
          <div>
            <Link
              to={`/pasien/${row.id}`}
              className="font-semibold text-gray-800 hover:text-[#1A7C6E] transition-colors"
            >
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
        <div className="flex items-center justify-center gap-2">
          <Tooltip content="Lihat Detail" position="top">
            <Link to={`/pasien/${row.id}`}>
              <Button variant="ghost" size="sm" leftIcon={<FaEye />} />
            </Link>
          </Tooltip>
          <Tooltip content="Edit" position="top">
            <Button variant="ghost" size="sm" leftIcon={<FaEdit />} onClick={() => openEdit(row)} />
          </Tooltip>
          <Tooltip content="Hapus" position="top">
            <Button variant="ghost" size="sm" leftIcon={<FaTrashAlt />}
              onClick={() => handleDelete(row.id)}
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
            <h1 className="text-3xl font-bold mb-2">Patients Management</h1>
            <p className="text-white/80 text-sm max-w-lg">
              Manage patient records, appointments, and treatment history efficiently.
            </p>
          </div>
          <Button
            variant="secondary"
            leftIcon={<FaPlus />}
            onClick={() => setShowForm(true)}
            className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm"
          >
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
          <StatCard title="Total Pasien"          value={totalPasien}        icon={<FaUserAlt />}       iconBg="bg-[#E8F8F6]" iconColor="text-[#1A7C6E]" trend={8} trendLabel="bulan ini" />
          <StatCard title="Pasien Baru (Waiting)" value={pasienBaru}         icon={<FaNotesMedical />}  iconBg="bg-blue-50"   iconColor="text-blue-600" />
          <StatCard title="Appointment Hari Ini"  value={appointmentHariIni} icon={<FaCalendarAlt />}   iconBg="bg-purple-50" iconColor="text-purple-600" />
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
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>

      {/* Modal Add/Edit */}
      <Modal
        isOpen={showForm}
        onClose={closeForm}
        title={isEdit ? "Edit Data Pasien" : "Tambah Pasien Baru"}
        size="md"
        footer={
          <>
            <Button variant="ghost" onClick={closeForm}>Batal</Button>
            <Button variant="primary" type="submit" form="pasien-form">Simpan</Button>
          </>
        }
      >
        <form id="pasien-form" onSubmit={handleSave} className="space-y-4">
          <Input
            label="Nama Pasien"
            required
            value={form.nama}
            onChange={(e) => setForm({ ...form, nama: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-4">
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
          </div>
          <Input
            label="Nomor HP"
            required
            value={form.noHp}
            onChange={(e) => setForm({ ...form, noHp: e.target.value })}
          />
          <Input
            label="Alamat"
            value={form.alamat}
            onChange={(e) => setForm({ ...form, alamat: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Treatment"
              value={form.treatment}
              onChange={(e) => setForm({ ...form, treatment: e.target.value })}
            />
            <Select
              label="Dokter"
              options={doctorOptions}
              value={form.dokter}
              onChange={(e) => setForm({ ...form, dokter: e.target.value })}
              placeholder={null}
            />
          </div>
          <Select
            label="Status"
            options={["Active", "Waiting", "Completed", "Cancel"]}
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            placeholder={null}
          />
        </form>
      </Modal>
    </div>
  );
}
