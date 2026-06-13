import React, { useState, useMemo } from 'react';
import { 
  FaExclamationCircle, 
  FaHourglassHalf, 
  FaCheckCircle,
  FaCommentDots,
  FaEllipsisV,
  FaUser,
  FaCalendarAlt,
  FaFilter
} from 'react-icons/fa';

// Mock data komplain pasien
const INITIAL_COMPLAINTS = [
  {
    id: 'C-001',
    tanggal: '2026-05-28',
    namaPasien: 'Andi Pratama',
    isiKomplain: 'Antrian terlalu lama, sudah menunggu lebih dari 1 jam',
    status: 'Pending',
    prioritas: 'High'
  },
  {
    id: 'C-002',
    tanggal: '2026-05-27',
    namaPasien: 'Siti Nurhaliza',
    isiKomplain: 'Dokter terlambat datang, tidak ada pemberitahuan sebelumnya',
    status: 'In Progress',
    prioritas: 'Medium'
  },
  {
    id: 'C-003',
    tanggal: '2026-05-26',
    namaPasien: 'Budi Santoso',
    isiKomplain: 'Hasil whitening kurang merata pada gigi bagian belakang',
    status: 'Resolved',
    prioritas: 'Medium'
  },
  {
    id: 'C-004',
    tanggal: '2026-05-26',
    namaPasien: 'Dewi Kusuma',
    isiKomplain: 'Biaya perawatan tidak sesuai dengan estimasi awal',
    status: 'Pending',
    prioritas: 'High'
  },
  {
    id: 'C-005',
    tanggal: '2026-05-25',
    namaPasien: 'Rizky Firmansyah',
    isiKomplain: 'Ruang tunggu tidak nyaman dan kurang bersih',
    status: 'In Progress',
    prioritas: 'Low'
  },
  {
    id: 'C-006',
    tanggal: '2026-05-24',
    namaPasien: 'Maya Anggraini',
    isiKomplain: 'Staff administrasi kurang ramah dan tidak informatif',
    status: 'Resolved',
    prioritas: 'Medium'
  },
  {
    id: 'C-007',
    tanggal: '2026-05-24',
    namaPasien: 'Hendra Wijaya',
    isiKomplain: 'Sakit setelah perawatan saluran akar, tidak ada follow up',
    status: 'In Progress',
    prioritas: 'High'
  },
  {
    id: 'C-008',
    tanggal: '2026-05-23',
    namaPasien: 'Fatimah Zahra',
    isiKomplain: 'Sistem booking online sering error dan sulit diakses',
    status: 'Pending',
    prioritas: 'Medium'
  },
  {
    id: 'C-009',
    tanggal: '2026-05-22',
    namaPasien: 'Ahmad Fauzi',
    isiKomplain: 'Parkir kendaraan penuh dan tidak ada petugas yang mengatur',
    status: 'Resolved',
    prioritas: 'Low'
  },
  {
    id: 'C-010',
    tanggal: '2026-05-21',
    namaPasien: 'Linda Wijaya',
    isiKomplain: 'Obat yang diberikan tidak sesuai dengan resep dokter',
    status: 'In Progress',
    prioritas: 'High'
  }
];

// Status badge configuration
const STATUS_CONFIG = {
  'Pending': {
    bgColor: 'bg-amber-100',
    textColor: 'text-amber-800',
    borderColor: 'border-amber-300',
    icon: FaExclamationCircle,
    iconColor: 'text-amber-600'
  },
  'In Progress': {
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-800',
    borderColor: 'border-blue-300',
    icon: FaHourglassHalf,
    iconColor: 'text-blue-600'
  },
  'Resolved': {
    bgColor: 'bg-emerald-100',
    textColor: 'text-emerald-800',
    borderColor: 'border-emerald-300',
    icon: FaCheckCircle,
    iconColor: 'text-emerald-600'
  }
};

// Priority badge configuration
const PRIORITY_CONFIG = {
  'High': { bgColor: 'bg-red-50', textColor: 'text-red-700', borderColor: 'border-red-200' },
  'Medium': { bgColor: 'bg-yellow-50', textColor: 'text-yellow-700', borderColor: 'border-yellow-200' },
  'Low': { bgColor: 'bg-gray-50', textColor: 'text-gray-700', borderColor: 'border-gray-200' }
};

const ComplaintResolution = () => {
  const [complaints, setComplaints] = useState(INITIAL_COMPLAINTS);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');

  // Calculate statistics using useMemo
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

  // Filter complaints based on selected status
  const filteredComplaints = useMemo(() => {
    if (filterStatus === 'All') return complaints;
    return complaints.filter(c => c.status === filterStatus);
  }, [complaints, filterStatus]);

  // Handle status change
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

  // Toggle dropdown
  const toggleDropdown = (complaintId) => {
    setOpenDropdown(openDropdown === complaintId ? null : complaintId);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Get status options for dropdown (exclude current status)
  const getStatusOptions = (currentStatus) => {
    return ['Pending', 'In Progress', 'Resolved'].filter(status => status !== currentStatus);
  };

  return (
    <div className="flex flex-col w-full pb-10 min-h-screen bg-gray-50/30">

      {/* Banner */}
      <div className="relative bg-gradient-to-r from-[#1A7C6E] to-[#2BB5A0] rounded-3xl px-8 pt-10 pb-24 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl translate-y-1/2" />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Pusat Resolusi Komplain</h1>
          <p className="text-white/80 text-sm max-w-lg">
            Kelola dan monitor komplain pasien untuk meningkatkan kualitas layanan.
          </p>
        </div>
      </div>

      <div className="relative -mt-14 z-20 flex flex-col gap-6">

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Total Komplain Masuk */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-5">
            <div className="w-14 h-14 bg-[#E8F8F6] rounded-full flex items-center justify-center shrink-0">
              <FaCommentDots className="text-2xl text-[#0F766E]" />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium">Total Komplain Masuk</p>
              <p className="text-3xl font-extrabold text-gray-800">{statistics.totalKomplain}</p>
            </div>
          </div>

          {/* Sedang Diproses */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-5">
            <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
              <FaHourglassHalf className="text-2xl text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium">Sedang Diproses</p>
              <p className="text-3xl font-extrabold text-gray-800">{statistics.inProgress}</p>
            </div>
          </div>

          {/* Selesai */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-5">
            <div className="w-14 h-14 bg-[#E8F8F6] rounded-full flex items-center justify-center shrink-0">
              <FaCheckCircle className="text-2xl text-[#0F766E]" />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium">Selesai (Resolved)</p>
              <p className="text-3xl font-extrabold text-gray-800">{statistics.resolved}</p>
            </div>
          </div>
        </div>

        {/* Pending Counter (Additional Info) */}
        {statistics.pending > 0 && (
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6 rounded-r-lg">
            <div className="flex items-center">
              <FaExclamationCircle className="text-amber-600 text-xl mr-3" />
              <div>
                <p className="text-sm font-semibold text-amber-900">
                  Perhatian: {statistics.pending} komplain menunggu untuk ditangani
                </p>
                <p className="text-xs text-amber-700 mt-1">
                  Segera proses komplain yang pending untuk meningkatkan kepuasan pasien
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Filter Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <FaFilter className="text-gray-400" />
            <span className="text-sm font-semibold text-gray-700">Filter Status:</span>
            <div className="flex gap-2">
              {['All', 'Pending', 'In Progress', 'Resolved'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-1.5 rounded-xl text-sm font-medium transition-colors ${
                    filterStatus === status
                      ? 'bg-[#0F766E] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status === 'All' ? 'Semua' : status}
                  {status !== 'All' && (
                    <span className="ml-1.5 text-xs">
                      ({status === 'Pending' ? statistics.pending : status === 'In Progress' ? statistics.inProgress : statistics.resolved})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Complaints Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/60">
            <h2 className="text-lg font-bold text-gray-800">Tabel Manajemen Komplain</h2>
            <p className="text-sm text-gray-400 mt-0.5">
              Menampilkan {filteredComplaints.length} dari {complaints.length} komplain
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Tanggal
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Nama Pasien
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Isi Keluhan / Komplain
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Prioritas
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredComplaints.length > 0 ? (
                  filteredComplaints.map((complaint) => {
                    const statusConfig = STATUS_CONFIG[complaint.status];
                    const StatusIcon = statusConfig.icon;
                    const priorityConfig = PRIORITY_CONFIG[complaint.prioritas];

                    return (
                      <tr key={complaint.id} className="hover:bg-gray-50 transition-colors">
                        {/* ID */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-600">
                          {complaint.id}
                        </td>

                        {/* Tanggal */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          <div className="flex items-center gap-2">
                            <FaCalendarAlt className="text-gray-400 text-xs" />
                            <span>{formatDate(complaint.tanggal)}</span>
                          </div>
                        </td>

                        {/* Nama Pasien */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-[#1A7C6E] to-[#2BB5A0] rounded-full flex items-center justify-center text-white text-xs font-bold">
                              {complaint.namaPasien.charAt(0)}
                            </div>
                            <span className="font-semibold">{complaint.namaPasien}</span>
                          </div>
                        </td>

                        {/* Isi Komplain */}
                        <td className="px-6 py-4 text-sm text-gray-700 max-w-md">
                          <p className="line-clamp-2">{complaint.isiKomplain}</p>
                        </td>

                        {/* Prioritas */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${priorityConfig.bgColor} ${priorityConfig.textColor} ${priorityConfig.borderColor}`}>
                            {complaint.prioritas}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border ${statusConfig.bgColor} ${statusConfig.textColor} ${statusConfig.borderColor}`}>
                            <StatusIcon className={statusConfig.iconColor} />
                            {complaint.status}
                          </span>
                        </td>

                        {/* Aksi */}
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="relative inline-block">
                            <button
                              onClick={() => toggleDropdown(complaint.id)}
                              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-900"
                              title="Ubah Status"
                            >
                              <FaEllipsisV />
                            </button>

                            {/* Dropdown Menu */}
                            {openDropdown === complaint.id && (
                              <>
                                {/* Backdrop to close dropdown */}
                                <div
                                  className="fixed inset-0 z-10"
                                  onClick={() => setOpenDropdown(null)}
                                />
                                
                                {/* Dropdown Content */}
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-20">
                                  <div className="px-3 py-2 border-b border-gray-100">
                                    <p className="text-xs font-semibold text-gray-500 uppercase">
                                      Ubah Status
                                    </p>
                                  </div>
                                  {getStatusOptions(complaint.status).map((status) => {
                                    const config = STATUS_CONFIG[status];
                                    const Icon = config.icon;
                                    return (
                                      <button
                                        key={status}
                                        onClick={() => handleStatusChange(complaint.id, status)}
                                        className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 text-gray-700 hover:text-gray-900"
                                      >
                                        <Icon className={config.iconColor} />
                                        <span className="font-medium">{status}</span>
                                      </button>
                                    );
                                  })}
                                </div>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                      <FaCommentDots className="mx-auto text-4xl text-gray-300 mb-3" />
                      <p className="text-sm">Tidak ada komplain dengan status "{filterStatus}"</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          {filteredComplaints.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>
                  Total: <span className="font-semibold text-gray-900">{filteredComplaints.length}</span> komplain
                </span>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    Pending: {statistics.pending}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    In Progress: {statistics.inProgress}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Resolved: {statistics.resolved}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Success Rate Indicator */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Success Rate</h3>
              <p className="text-sm text-gray-400">Persentase komplain yang telah diselesaikan</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-[#0F766E]">
                {statistics.totalKomplain > 0
                  ? Math.round((statistics.resolved / statistics.totalKomplain) * 100)
                  : 0}%
              </p>
              <p className="text-xs text-gray-400">{statistics.resolved} dari {statistics.totalKomplain}</p>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#1A7C6E] to-[#2BB5A0] h-3 rounded-full transition-all duration-500"
              style={{
                width: `${statistics.totalKomplain > 0 ? (statistics.resolved / statistics.totalKomplain) * 100 : 0}%`
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintResolution;
