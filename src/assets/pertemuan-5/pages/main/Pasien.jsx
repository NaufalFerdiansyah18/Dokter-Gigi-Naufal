import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaSearch, FaEye, FaEdit, FaTimes, FaUserAlt, FaCalendarAlt, FaNotesMedical, FaTrashAlt } from "react-icons/fa";
import PageHeader from "../../components/PageHeader";
import { BADGE_COLORS } from "../../data/ordersData";
import { useClinic } from "../../context/ClinicContext";

const EMPTY_FORM = { nama: "", umur: "", jenisKelamin: "L", noHp: "", alamat: "", treatment: "", dokter: "", status: "Active" };

export default function Pasien() {
  const { patients: data, setPatients: setData, doctors } = useClinic();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [isEdit, setIsEdit] = useState(false);

  // Detail Modal
  const [showDetail, setShowDetail] = useState(false);
  const [selectedPasien, setSelectedPasien] = useState(null);

  // Statistics
  const totalPasien = data.length;
  const pasienBaruBulanIni = data.filter(p => p.status === "Waiting").length;
  const appointmentHariIni = 8; // MOCK for demonstration since no appointments table exists here

  // Filter & Search
  const filteredPasien = useMemo(() => {
    return data.filter((p) => {
      const matchSearch = p.nama.toLowerCase().includes(searchTerm.toLowerCase()) || p.noHp.includes(searchTerm);
      const matchStatus = filterStatus === "Semua" || p.status === filterStatus;
      return matchSearch && matchStatus;
    });
  }, [data, searchTerm, filterStatus]);

  const handleSave = (e) => {
    e.preventDefault();
    if (isEdit) {
      setData(data.map(p => p.id === form.id ? { ...p, ...form } : p));
    } else {
      const newPasien = {
        ...form,
        id: `PS-${String(data.length + 1).padStart(3, "0")}`,
        terakhirKunjungan: "-",
      };
      setData([newPasien, ...data]);
    }
    closeForm();
  };

  const handleDelete = (id) => {
    if (window.confirm("Apakah yakin ingin menghapus pasien?")) {
      setData(data.filter(p => p.id !== id));
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
      treatment: p.treatment || "",
      dokter: p.dokter || "",
      status: p.status
    });
    setIsEdit(true);
    setShowForm(true);
  };

  const openDetail = (p) => {
    setSelectedPasien(p);
    setShowDetail(true);
  };

  const closeForm = () => {
    setForm(EMPTY_FORM);
    setIsEdit(false);
    setShowForm(false);
  };

  return (
    <div className="flex flex-col w-full pb-10">
      <PageHeader title="Manajemen Pasien" breadcrumb={["Dashboard", "Daftar Pasien"]}>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center justify-center space-x-2 bg-[#1A7C6E] text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-[#15675C] transition shadow-sm"
        >
          <FaPlus />
          <span>Tambah Pasien</span>
        </button>
      </PageHeader>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 mt-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="w-12 h-12 bg-[#E8F8F6] text-[#1A7C6E] rounded-full flex items-center justify-center text-xl">
            <FaUserAlt />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Total Pasien</p>
            <h3 className="text-2xl font-bold text-gray-800">{totalPasien}</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="w-12 h-12 bg-[#E8F8F6] text-[#1A7C6E] rounded-full flex items-center justify-center text-xl">
            <FaNotesMedical />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Pasien Baru</p>
            <h3 className="text-2xl font-bold text-gray-800">{pasienBaruBulanIni}</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="w-12 h-12 bg-[#E8F8F6] text-[#1A7C6E] rounded-full flex items-center justify-center text-xl">
            <FaCalendarAlt />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Appointment Hari Ini</p>
            <h3 className="text-2xl font-bold text-gray-800">{appointmentHariIni}</h3>
          </div>
        </div>
      </div>

      {/* Toolbar: Search, Filter */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          {/* Search */}
          <div className="relative w-full md:w-64">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search pasien..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1A7C6E] focus:ring-1 focus:ring-[#1A7C6E] transition"
            />
          </div>
          {/* Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full md:w-40 px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1A7C6E] transition"
          >
            <option value="Semua">Semua Status</option>
            <option value="Active">Active</option>
            <option value="Waiting">Waiting</option>
            <option value="Completed">Completed</option>
            <option value="Cancel">Cancel</option>
          </select>
        </div>
      </div>

      {/* Tabel Pasien */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Nama</th>
                <th className="px-6 py-4">No HP</th>
                <th className="px-6 py-4">Treatment</th>
                <th className="px-6 py-4">Dokter</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredPasien.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-400">Tidak ada data pasien ditemukan.</td>
                </tr>
              ) : (
                filteredPasien.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition duration-150">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-[#E8F8F6] text-[#1A7C6E] flex items-center justify-center font-bold">
                          {p.nama.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <Link
                            to={`/pasien/${p.id}`}
                            className="font-semibold text-gray-800 hover:text-[#1A7C6E] transition-colors duration-150 underline-offset-2 hover:underline"
                          >
                            {p.nama}
                          </Link>
                          <p className="text-xs text-gray-400">{p.umur} Thn</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{p.noHp}</td>
                    <td className="px-6 py-4 text-gray-600">{p.treatment || "-"}</td>
                    <td className="px-6 py-4 text-gray-600 font-medium">{p.dokter || "-"}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${BADGE_COLORS[p.status] || "bg-gray-100 text-gray-700"}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center space-x-3">
                        <button onClick={() => openDetail(p)} className="p-2 text-gray-400 hover:text-[#1A7C6E] hover:bg-[#E8F8F6] rounded-lg transition" title="Detail">
                          <FaEye className="text-lg" />
                        </button>
                        <button onClick={() => openEdit(p)} className="p-2 text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 rounded-lg transition" title="Edit">
                          <FaEdit className="text-lg" />
                        </button>
                        <button onClick={() => handleDelete(p.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition" title="Delete">
                          <FaTrashAlt className="text-lg" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add / Edit */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-lg font-bold text-gray-800">{isEdit ? "Edit Data Pasien" : "Tambah Pasien Baru"}</h2>
              <button onClick={closeForm} className="text-gray-400 hover:text-gray-600">
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                <input required value={form.nama} onChange={e => setForm({ ...form, nama: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#1A7C6E] focus:ring-1 focus:ring-[#1A7C6E] transition" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Umur</label>
                  <input required type="number" value={form.umur} onChange={e => setForm({ ...form, umur: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#1A7C6E] focus:ring-1 focus:ring-[#1A7C6E] transition" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Kelamin</label>
                  <select value={form.jenisKelamin} onChange={e => setForm({ ...form, jenisKelamin: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#1A7C6E] focus:ring-1 focus:ring-[#1A7C6E] transition">
                    <option value="L">Laki-laki (L)</option>
                    <option value="P">Perempuan (P)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nomor HP</label>
                <input required type="text" value={form.noHp} onChange={e => setForm({ ...form, noHp: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#1A7C6E] focus:ring-1 focus:ring-[#1A7C6E] transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Treatment</label>
                <input required type="text" value={form.treatment} onChange={e => setForm({ ...form, treatment: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#1A7C6E] focus:ring-1 focus:ring-[#1A7C6E] transition" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pilih Dokter</label>
                  <select required value={form.dokter} onChange={e => setForm({ ...form, dokter: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#1A7C6E] focus:ring-1 focus:ring-[#1A7C6E] transition">
                    <option value="">-- Pilih Dokter --</option>
                    {doctors.map(d => (
                      <option key={d.id} value={d.nama}>{d.nama} ({d.spesialis})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#1A7C6E] focus:ring-1 focus:ring-[#1A7C6E] transition">
                    <option value="Active">Active</option>
                    <option value="Waiting">Waiting</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancel">Cancel</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100 mt-6">
                <button type="button" onClick={closeForm}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium transition">
                  Batal
                </button>
                <button type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#1A7C6E] text-white text-sm font-semibold hover:bg-[#15675C] transition shadow-sm">
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Detail Pasien */}
      {showDetail && selectedPasien && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-lg font-bold text-gray-800">Detail Pasien</h2>
              <button onClick={() => setShowDetail(false)} className="text-gray-400 hover:text-gray-600">
                <FaTimes />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex flex-col items-center justify-center mb-4">
                <div className="w-20 h-20 rounded-full bg-[#E8F8F6] text-[#1A7C6E] flex items-center justify-center font-bold text-3xl mb-3">
                  {selectedPasien.nama.charAt(0).toUpperCase()}
                </div>
                <h3 className="text-xl font-bold text-gray-800">{selectedPasien.nama}</h3>
                <span className={`mt-2 px-3 py-1 rounded-full text-xs font-semibold ${BADGE_COLORS[selectedPasien.status] || "bg-gray-100 text-gray-700"}`}>
                  {selectedPasien.status}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between border-b border-gray-50 pb-2">
                  <span className="text-gray-500 text-sm">Dokter</span>
                  <span className="text-gray-800 text-sm font-medium">{selectedPasien.dokter || "-"}</span>
                </div>
                <div className="flex justify-between border-b border-gray-50 pb-2">
                  <span className="text-gray-500 text-sm">Umur</span>
                  <span className="text-gray-800 text-sm font-medium">{selectedPasien.umur} Tahun</span>
                </div>
                <div className="flex justify-between border-b border-gray-50 pb-2">
                  <span className="text-gray-500 text-sm">No HP</span>
                  <span className="text-gray-800 text-sm font-medium">{selectedPasien.noHp}</span>
                </div>
                <div className="flex justify-between border-b border-gray-50 pb-2">
                  <span className="text-gray-500 text-sm">Treatment</span>
                  <span className="text-gray-800 text-sm font-medium text-right max-w-[150px]">{selectedPasien.treatment || "-"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
