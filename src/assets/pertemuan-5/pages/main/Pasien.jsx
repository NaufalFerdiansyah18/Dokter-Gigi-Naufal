import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  FaPlus,
  FaSearch,
  FaEye,
  FaEdit,
  FaTimes,
  FaUserAlt,
  FaCalendarAlt,
  FaNotesMedical,
  FaTrashAlt,
} from "react-icons/fa";

import { BADGE_COLORS } from "../../data/ordersData";
import { useClinic } from "../../context/ClinicContext";

const EMPTY_FORM = {
  nama: "",
  umur: "",
  jenisKelamin: "L",
  noHp: "",
  alamat: "",
  treatment: "",
  dokter: "",
  status: "Active",
};

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
  const pasienBaruBulanIni = data.filter(
    (p) => p.status === "Waiting"
  ).length;

  const appointmentHariIni = 8;

  // Filter & Search
  const filteredPasien = useMemo(() => {
    return data.filter((p) => {
      const matchSearch =
        p.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.noHp.includes(searchTerm);

      const matchStatus =
        filterStatus === "Semua" || p.status === filterStatus;

      return matchSearch && matchStatus;
    });
  }, [data, searchTerm, filterStatus]);

  const handleSave = (e) => {
    e.preventDefault();

    if (isEdit) {
      setData(
        data.map((p) =>
          p.id === form.id ? { ...p, ...form } : p
        )
      );
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
      treatment: p.treatment || "",
      dokter: p.dokter || "",
      status: p.status,
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
    <div className="flex flex-col w-full pb-10 min-h-screen bg-gray-50/30">

      {/* TOP BANNER */}
      <div className="relative bg-gradient-to-r from-[#1A7C6E] to-[#2BB5A0] rounded-3xl px-8 pt-10 pb-24 text-white overflow-hidden">

        {/* Decorative */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

        <div className="absolute bottom-0 left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl translate-y-1/2"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">

          <div>
            <h1 className="text-3xl font-bold mb-2">
              Patients Management
            </h1>

            <p className="text-white/80 text-sm md:text-base max-w-lg">
              Manage patient records, appointments, and treatment history efficiently for your dental clinic.
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors px-6 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 w-fit"
          >
            <FaPlus />
            Tambah Pasien
          </button>
        </div>
      </div>

      <div className="px-2 md:px-0 relative -mt-14 z-20">

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

          {/* Total Pasien */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">

            <div className="w-14 h-14 rounded-full border-2 border-[#E8F8F6] flex items-center justify-center shrink-0">
              <div className="w-10 h-10 rounded-full bg-[#E8F8F6] text-[#1A7C6E] flex items-center justify-center text-lg">
                <FaUserAlt />
              </div>
            </div>

            <div>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">
                Total Pasien
              </p>

              <h3 className="text-2xl font-black text-gray-800">
                {totalPasien}
              </h3>
            </div>
          </div>

          {/* Pasien Baru */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">

            <div className="w-14 h-14 rounded-full border-2 border-blue-50 flex items-center justify-center shrink-0">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-lg">
                <FaNotesMedical />
              </div>
            </div>

            <div>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">
                Pasien Baru
              </p>

              <h3 className="text-2xl font-black text-gray-800">
                {pasienBaruBulanIni}
              </h3>
            </div>
          </div>

          {/* Appointment */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">

            <div className="w-14 h-14 rounded-full border-2 border-purple-50 flex items-center justify-center shrink-0">
              <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center text-lg">
                <FaCalendarAlt />
              </div>
            </div>

            <div>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">
                Appointment Hari Ini
              </p>

              <h3 className="text-2xl font-black text-gray-800">
                {appointmentHariIni}
              </h3>
            </div>
          </div>
        </div>

        {/* Toolbar */}
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

        {/* TABLE */}
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
                    <td
                      colSpan="6"
                      className="px-6 py-8 text-center text-gray-400"
                    >
                      Tidak ada data pasien ditemukan.
                    </td>
                  </tr>
                ) : (
                  filteredPasien.map((p) => (
                    <tr
                      key={p.id}
                      className="hover:bg-gray-50 transition duration-150"
                    >
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

                            <p className="text-xs text-gray-400">
                              {p.umur} Thn
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {p.noHp}
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {p.treatment || "-"}
                      </td>

                      <td className="px-6 py-4 text-gray-600 font-medium">
                        {p.dokter || "-"}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            BADGE_COLORS[p.status] ||
                            "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>

                      <td className="px-6 py-4">

                        <div className="flex items-center justify-center space-x-3">

                          <button
                            onClick={() => openDetail(p)}
                            className="p-2 text-gray-400 hover:text-[#1A7C6E] hover:bg-[#E8F8F6] rounded-lg transition"
                          >
                            <FaEye className="text-lg" />
                          </button>

                          <button
                            onClick={() => openEdit(p)}
                            className="p-2 text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 rounded-lg transition"
                          >
                            <FaEdit className="text-lg" />
                          </button>

                          <button
                            onClick={() => handleDelete(p.id)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                          >
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
      </div>
    </div>
  );
}