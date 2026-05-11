import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaSearch, FaEye, FaEdit, FaTimes, FaUserMd, FaStethoscope, FaCalendarCheck, FaTrashAlt } from "react-icons/fa";
import PageHeader from "../../components/PageHeader";
import { BADGE_COLORS } from "../../data/ordersData";
import { useClinic } from "../../context/ClinicContext";

const EMPTY_FORM = { nama: "", spesialis: "", noHp: "", email: "", jadwal: "", status: "Active" };

export default function Doctors() {
  const { doctors, setDoctors, patients } = useClinic();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");
  
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [isEdit, setIsEdit] = useState(false);

  // Detail Modal
  const [showDetail, setShowDetail] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // Statistics
  const totalDokter = doctors.length;
  const dokterAktifHariIni = doctors.filter(d => d.status === "Active").length;
  const treatmentHariIni = 12; // MOCK as requested

  // Filter & Search
  const filteredDoctors = useMemo(() => {
    return doctors.filter((d) => {
      const matchSearch = d.nama.toLowerCase().includes(searchTerm.toLowerCase()) || d.spesialis.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = filterStatus === "Semua" || d.status === filterStatus;
      return matchSearch && matchStatus;
    });
  }, [doctors, searchTerm, filterStatus]);

  const handleSave = (e) => {
    e.preventDefault();
    if (isEdit) {
      setDoctors(doctors.map(d => d.id === form.id ? { ...d, ...form } : d));
    } else {
      const newDoctor = {
        ...form,
        id: `DR-${String(doctors.length + 1).padStart(3, "0")}`,
      };
      setDoctors([newDoctor, ...doctors]);
    }
    closeForm();
  };

  const handleDelete = (id) => {
    if (window.confirm("Apakah yakin ingin menghapus dokter ini?")) {
      setDoctors(doctors.filter(d => d.id !== id));
    }
  };

  const openEdit = (d) => {
    setForm(d);
    setIsEdit(true);
    setShowForm(true);
  };

  const openDetail = (d) => {
    setSelectedDoctor(d);
    setShowDetail(true);
  };

  const closeForm = () => {
    setForm(EMPTY_FORM);
    setIsEdit(false);
    setShowForm(false);
  };

  return (
    <div className="flex flex-col w-full pb-10">
      <PageHeader title="Manajemen Dokter" breadcrumb={["Dashboard", "Daftar Dokter"]}>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center justify-center space-x-2 bg-[#1A7C6E] text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-[#15675C] transition shadow-sm"
        >
          <FaPlus />
          <span>Tambah Dokter</span>
        </button>
      </PageHeader>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 mt-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="w-12 h-12 bg-[#E8F8F6] text-[#1A7C6E] rounded-full flex items-center justify-center text-xl">
            <FaUserMd />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Total Dokter</p>
            <h3 className="text-2xl font-bold text-gray-800">{totalDokter}</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="w-12 h-12 bg-[#E8F8F6] text-[#1A7C6E] rounded-full flex items-center justify-center text-xl">
            <FaStethoscope />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Dokter Aktif Hari Ini</p>
            <h3 className="text-2xl font-bold text-gray-800">{dokterAktifHariIni}</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="w-12 h-12 bg-[#E8F8F6] text-[#1A7C6E] rounded-full flex items-center justify-center text-xl">
            <FaCalendarCheck />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Treatment Hari Ini</p>
            <h3 className="text-2xl font-bold text-gray-800">{treatmentHariIni}</h3>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search dokter..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1A7C6E] focus:ring-1 focus:ring-[#1A7C6E] transition"
            />
          </div>
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full md:w-40 px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1A7C6E] transition"
          >
            <option value="Semua">Semua Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Tabel Dokter */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Foto</th>
                <th className="px-6 py-4">Nama Dokter</th>
                <th className="px-6 py-4">Spesialis</th>
                <th className="px-6 py-4">Jadwal</th>
                <th className="px-6 py-4 text-center">Total Pasien</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredDoctors.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-400">Tidak ada data dokter ditemukan.</td>
                </tr>
              ) : (
                filteredDoctors.map((d) => {
                  const patientCount = patients.filter(p => p.dokter === d.nama).length;
                  return (
                    <tr key={d.id} className="hover:bg-gray-50 transition duration-150">
                      <td className="px-6 py-4">
                        <div className="w-10 h-10 rounded-full bg-[#E8F8F6] text-[#1A7C6E] flex items-center justify-center font-bold text-lg">
                          {d.nama.replace("drg. ", "").charAt(0).toUpperCase()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          to={`/doctors/${d.id}`}
                          className="font-semibold text-gray-800 hover:text-[#1A7C6E] transition-colors duration-150 underline-offset-2 hover:underline block"
                        >
                          {d.nama}
                        </Link>
                        <p className="text-xs text-gray-400">{d.noHp}</p>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{d.spesialis}</td>
                      <td className="px-6 py-4 text-gray-600">{d.jadwal}</td>
                      <td className="px-6 py-4 text-center font-semibold text-[#1A7C6E]">{patientCount}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${BADGE_COLORS[d.status] || (d.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700')}`}>
                          {d.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center space-x-3">
                          <button onClick={() => openDetail(d)} className="p-2 text-gray-400 hover:text-[#1A7C6E] hover:bg-[#E8F8F6] rounded-lg transition" title="Detail">
                            <FaEye className="text-lg" />
                          </button>
                          <button onClick={() => openEdit(d)} className="p-2 text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 rounded-lg transition" title="Edit">
                            <FaEdit className="text-lg" />
                          </button>
                          <button onClick={() => handleDelete(d.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition" title="Delete">
                            <FaTrashAlt className="text-lg" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
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
              <h2 className="text-lg font-bold text-gray-800">{isEdit ? "Edit Data Dokter" : "Tambah Dokter Baru"}</h2>
              <button onClick={closeForm} className="text-gray-400 hover:text-gray-600">
                <FaTimes />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Dokter</label>
                <input required value={form.nama} onChange={e => setForm({ ...form, nama: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#1A7C6E] focus:ring-1 focus:ring-[#1A7C6E] transition" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Spesialis</label>
                  <input required value={form.spesialis} onChange={e => setForm({ ...form, spesialis: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#1A7C6E] focus:ring-1 focus:ring-[#1A7C6E] transition" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nomor HP</label>
                  <input required value={form.noHp} onChange={e => setForm({ ...form, noHp: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#1A7C6E] focus:ring-1 focus:ring-[#1A7C6E] transition" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#1A7C6E] focus:ring-1 focus:ring-[#1A7C6E] transition" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Jadwal Praktik</label>
                  <input required value={form.jadwal} onChange={e => setForm({ ...form, jadwal: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#1A7C6E] focus:ring-1 focus:ring-[#1A7C6E] transition" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#1A7C6E] focus:ring-1 focus:ring-[#1A7C6E] transition">
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
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

      {/* Modal Detail Dokter */}
      {showDetail && selectedDoctor && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-lg font-bold text-gray-800">Detail Dokter</h2>
              <button onClick={() => setShowDetail(false)} className="text-gray-400 hover:text-gray-600">
                <FaTimes />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex flex-col items-center justify-center mb-4">
                <div className="w-20 h-20 rounded-full bg-[#E8F8F6] text-[#1A7C6E] flex items-center justify-center font-bold text-3xl mb-3">
                  {selectedDoctor.nama.replace("drg. ", "").charAt(0).toUpperCase()}
                </div>
                <h3 className="text-xl font-bold text-gray-800">{selectedDoctor.nama}</h3>
                <p className="text-sm text-[#1A7C6E] font-medium">{selectedDoctor.spesialis}</p>
                <span className={`mt-2 px-3 py-1 rounded-full text-xs font-semibold ${selectedDoctor.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                  {selectedDoctor.status}
                </span>
              </div>
              
              <div className="space-y-4">
                <div className="border-b border-gray-50 pb-3">
                  <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Informasi Kontak</h4>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-500 text-sm">Email</span>
                    <span className="text-gray-800 text-sm font-medium">{selectedDoctor.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 text-sm">No HP</span>
                    <span className="text-gray-800 text-sm font-medium">{selectedDoctor.noHp}</span>
                  </div>
                </div>

                <div className="border-b border-gray-50 pb-3">
                  <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Jadwal</h4>
                  <p className="text-gray-800 text-sm font-medium">{selectedDoctor.jadwal}</p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-[#1A7C6E] uppercase mb-2 flex justify-between items-center">
                    <span>Recent Patients</span>
                    <span className="bg-[#E8F8F6] px-2 py-0.5 rounded-full text-[10px]">
                      {patients.filter(p => p.dokter === selectedDoctor.nama).length} Total
                    </span>
                  </h4>
                  <ul className="space-y-2">
                    {patients.filter(p => p.dokter === selectedDoctor.nama).length > 0 ? (
                      patients.filter(p => p.dokter === selectedDoctor.nama).map(p => (
                        <li key={p.id} className="flex justify-between items-center text-sm">
                          <span className="text-gray-800 font-medium">{p.nama}</span>
                          <span className="text-gray-500 text-xs">{p.treatment}</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-400 text-sm italic">Belum ada pasien.</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
