import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  FaPlus,
  FaSearch,
  FaEye,
  FaEdit,
  FaTimes,
  FaUserMd,
  FaStethoscope,
  FaCalendarCheck,
  FaTrashAlt,
} from "react-icons/fa";

import { BADGE_COLORS } from "../../data/ordersData";
import { useClinic } from "../../context/ClinicContext";

const EMPTY_FORM = {
  nama: "",
  spesialis: "",
  noHp: "",
  email: "",
  jadwal: "",
  status: "Active",
};

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

  const dokterAktifHariIni = doctors.filter(
    (d) => d.status === "Active"
  ).length;

  const treatmentHariIni = 12;

  // Filter & Search
  const filteredDoctors = useMemo(() => {
    return doctors.filter((d) => {
      const matchSearch =
        d.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.spesialis.toLowerCase().includes(searchTerm.toLowerCase());

      const matchStatus =
        filterStatus === "Semua" || d.status === filterStatus;

      return matchSearch && matchStatus;
    });
  }, [doctors, searchTerm, filterStatus]);

  // SAVE
  const handleSave = (e) => {
    e.preventDefault();

    if (isEdit) {
      setDoctors(
        doctors.map((d) =>
          d.id === form.id ? { ...d, ...form } : d
        )
      );
    } else {
      const newDoctor = {
        ...form,
        id: `DR-${String(doctors.length + 1).padStart(3, "0")}`,
      };

      setDoctors([newDoctor, ...doctors]);
    }

    closeForm();
  };

  // DELETE
  const handleDelete = (id) => {
    if (window.confirm("Apakah yakin ingin menghapus dokter ini?")) {
      setDoctors(doctors.filter((d) => d.id !== id));
    }
  };

  // EDIT
  const openEdit = (d) => {
    setForm(d);
    setIsEdit(true);
    setShowForm(true);
  };

  // DETAIL
  const openDetail = (d) => {
    setSelectedDoctor(d);
    setShowDetail(true);
  };

  // CLOSE FORM
  const closeForm = () => {
    setForm(EMPTY_FORM);
    setIsEdit(false);
    setShowForm(false);
  };

  return (
    <div className="flex flex-col w-full pb-10 min-h-screen bg-gray-50/30">

      {/* TOP BANNER */}
      <div className="relative bg-gradient-to-r from-[#1A7C6E] to-[#2BB5A0] rounded-3xl px-8 pt-10 pb-24 text-white overflow-hidden">

        {/* Decorative */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

        <div className="absolute bottom-0 left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl translate-y-1/2"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Doctors Management
            </h1>

            <p className="text-white/80 text-sm md:text-base max-w-lg">
              Manage doctor schedules, monitor active doctors,
              and organize clinic services efficiently.
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors px-6 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 w-fit"
          >
            <FaPlus />
            Tambah Dokter
          </button>
        </div>
      </div>

      <div className="px-2 md:px-0 relative -mt-14 z-20">

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

          {/* Total */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">

            <div className="w-14 h-14 rounded-full border-2 border-[#E8F8F6] flex items-center justify-center shrink-0">
              <div className="w-10 h-10 rounded-full bg-[#E8F8F6] text-[#1A7C6E] flex items-center justify-center text-lg">
                <FaUserMd />
              </div>
            </div>

            <div>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">
                Total Dokter
              </p>

              <h3 className="text-2xl font-black text-gray-800">
                {totalDokter}
              </h3>
            </div>
          </div>

          {/* Active */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">

            <div className="w-14 h-14 rounded-full border-2 border-blue-50 flex items-center justify-center shrink-0">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-lg">
                <FaStethoscope />
              </div>
            </div>

            <div>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">
                Dokter Aktif
              </p>

              <h3 className="text-2xl font-black text-gray-800">
                {dokterAktifHariIni}
              </h3>
            </div>
          </div>

          {/* Treatment */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">

            <div className="w-14 h-14 rounded-full border-2 border-purple-50 flex items-center justify-center shrink-0">
              <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center text-lg">
                <FaCalendarCheck />
              </div>
            </div>

            <div>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">
                Treatment Hari Ini
              </p>

              <h3 className="text-2xl font-black text-gray-800">
                {treatmentHariIni}
              </h3>
            </div>
          </div>
        </div>

        {/* TOOLBAR */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">

          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">

            {/* SEARCH */}
            <div className="relative w-full md:w-64">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                placeholder="Search dokter..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1A7C6E] focus:ring-1 focus:ring-[#1A7C6E]"
              />
            </div>

            {/* FILTER */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full md:w-40 px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1A7C6E]"
            >
              <option value="Semua">Semua Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* TABLE */}
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
                    <td
                      colSpan="7"
                      className="px-6 py-8 text-center text-gray-400"
                    >
                      Tidak ada data dokter ditemukan.
                    </td>
                  </tr>
                ) : (
                  filteredDoctors.map((d) => {
                    const patientCount = patients.filter(
                      (p) => p.dokter === d.nama
                    ).length;

                    return (
                      <tr
                        key={d.id}
                        className="hover:bg-gray-50 transition duration-150"
                      >
                        <td className="px-6 py-4">
                          <div className="w-10 h-10 rounded-full bg-[#E8F8F6] text-[#1A7C6E] flex items-center justify-center font-bold text-lg">
                            {d.nama
                              .replace("drg. ", "")
                              .charAt(0)
                              .toUpperCase()}
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <Link
                            to={`/doctors/${d.id}`}
                            className="font-semibold text-gray-800 hover:text-[#1A7C6E]"
                          >
                            {d.nama}
                          </Link>

                          <p className="text-xs text-gray-400">
                            {d.noHp}
                          </p>
                        </td>

                        <td className="px-6 py-4 text-gray-600">
                          {d.spesialis}
                        </td>

                        <td className="px-6 py-4 text-gray-600">
                          {d.jadwal}
                        </td>

                        <td className="px-6 py-4 text-center font-semibold text-[#1A7C6E]">
                          {patientCount}
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              BADGE_COLORS[d.status] ||
                              (d.status === "Active"
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-700")
                            }`}
                          >
                            {d.status}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center space-x-3">

                            <button
                              onClick={() => openDetail(d)}
                              className="p-2 text-gray-400 hover:text-[#1A7C6E] hover:bg-[#E8F8F6] rounded-lg transition"
                            >
                              <FaEye />
                            </button>

                            <button
                              onClick={() => openEdit(d)}
                              className="p-2 text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 rounded-lg transition"
                            >
                              <FaEdit />
                            </button>

                            <button
                              onClick={() => handleDelete(d.id)}
                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                            >
                              <FaTrashAlt />
                            </button>

                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}

              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MODAL ADD / EDIT */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">

            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">

              <h2 className="text-lg font-bold text-gray-800">
                {isEdit
                  ? "Edit Data Dokter"
                  : "Tambah Dokter Baru"}
              </h2>

              <button
                onClick={closeForm}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            </div>

            <form
              onSubmit={handleSave}
              className="p-6 space-y-4"
            >

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Dokter
                </label>

                <input
                  required
                  value={form.nama}
                  onChange={(e) =>
                    setForm({ ...form, nama: e.target.value })
                  }
                  className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Spesialis
                  </label>

                  <input
                    required
                    value={form.spesialis}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        spesialis: e.target.value,
                      })
                    }
                    className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nomor HP
                  </label>

                  <input
                    required
                    value={form.noHp}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        noHp: e.target.value,
                      })
                    }
                    className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>

                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
                  className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Jadwal Praktik
                  </label>

                  <input
                    required
                    value={form.jadwal}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        jadwal: e.target.value,
                      })
                    }
                    className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>

                  <select
                    value={form.status}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        status: e.target.value,
                      })
                    }
                    className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100 mt-6">

                <button
                  type="button"
                  onClick={closeForm}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#1A7C6E] text-white hover:bg-[#15675C]"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}