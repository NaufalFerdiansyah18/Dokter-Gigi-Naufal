import React, { useState, useMemo } from 'react';
import { 
  FaCalendarAlt, 
  FaTooth, 
  FaUserMd, 
  FaMoneyBillWave, 
  FaPercent, 
  FaCreditCard,
  FaPlus,
  FaTimes,
  FaWallet,
  FaHistory,
  FaChartLine
} from 'react-icons/fa';
import { useClinic } from '../context/ClinicContext';

// Data jenis tindakan
const JENIS_TINDAKAN = [
  'Scaling Gigi',
  'Cabut Gigi',
  'Tambal Gigi (Komposit)',
  'Tambal Gigi (Amalgam)',
  'Perawatan Saluran Akar',
  'Pemasangan Behel',
  'Kontrol Behel',
  'Whitening Gigi (Laser)',
  'Veneer Gigi',
  'Crown & Bridge',
  'Konsultasi & Pemeriksaan',
  'Rontgen Gigi',
  'Bleaching',
  'Pasang Gigi Palsu'
];

// Data metode pembayaran
const METODE_PEMBAYARAN = [
  'Tunai',
  'Transfer Bank',
  'QRIS',
  'Kartu Kredit',
  'Kartu Debit'
];

const FinancialCRM = () => {
  const { doctors, patients, setPatients } = useClinic();
  const [selectedPatient, setSelectedPatient] = useState(patients[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState({});
  
  // Form state
  const [formData, setFormData] = useState({
    tanggalTindakan: new Date().toISOString().split('T')[0],
    jenisTindakan: '',
    dokterPenanganan: '',
    biayaDasar: '',
    diskonPersen: 0,
    metodePembayaran: ''
  });

  // Get active doctors only
  const activeDoctors = doctors.filter(doc => doc.status === 'Active');

  // Calculate financial summary using useMemo
  const financialSummary = useMemo(() => {
    const riwayat = selectedPatient?.riwayatPerawatan || [];
    
    const totalAkumulasi = riwayat.reduce((sum, item) => sum + item.biaya, 0);
    const metodeTerakhir = riwayat.length > 0 ? riwayat[riwayat.length - 1].metode : '-';
    const kunjunganTerakhir = riwayat.length > 0 ? riwayat[riwayat.length - 1].tanggal : '-';

    return {
      totalAkumulasi,
      metodeTerakhir,
      kunjunganTerakhir,
      jumlahTransaksi: riwayat.length
    };
  }, [selectedPatient]);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.tanggalTindakan) {
      newErrors.tanggalTindakan = 'Tanggal tindakan wajib diisi';
    }
    if (!formData.jenisTindakan) {
      newErrors.jenisTindakan = 'Jenis tindakan wajib dipilih';
    }
    if (!formData.dokterPenanganan) {
      newErrors.dokterPenanganan = 'Dokter penanganan wajib dipilih';
    }
    if (!formData.biayaDasar || formData.biayaDasar <= 0) {
      newErrors.biayaDasar = 'Biaya dasar harus lebih dari 0';
    }
    if (formData.diskonPersen < 0 || formData.diskonPersen > 100) {
      newErrors.diskonPersen = 'Diskon harus antara 0-100%';
    }
    if (!formData.metodePembayaran) {
      newErrors.metodePembayaran = 'Metode pembayaran wajib dipilih';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Calculate net cost
  const calculateBiayaBersih = (biayaDasar, diskonPersen) => {
    const biaya = parseFloat(biayaDasar) || 0;
    const diskon = parseFloat(diskonPersen) || 0;
    return biaya - (biaya * diskon / 100);
  };

  // Handle submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const biayaBersih = calculateBiayaBersih(formData.biayaDasar, formData.diskonPersen);

    // Create new transaction
    const newTransaction = {
      tanggal: formData.tanggalTindakan,
      tindakan: formData.jenisTindakan,
      dokter: formData.dokterPenanganan,
      biaya: biayaBersih,
      biayaDasar: parseFloat(formData.biayaDasar),
      diskon: parseFloat(formData.diskonPersen),
      metode: formData.metodePembayaran
    };

    // Update patient data
    const updatedPatients = patients.map(patient => {
      if (patient.id === selectedPatient.id) {
        const updatedRiwayat = [...patient.riwayatPerawatan, newTransaction];
        const newTotalTransaksi = updatedRiwayat.reduce((sum, item) => sum + item.biaya, 0);
        
        return {
          ...patient,
          riwayatPerawatan: updatedRiwayat,
          totalTransaksi: newTotalTransaksi,
          metodePembayaran: formData.metodePembayaran,
          terakhirKunjungan: formData.tanggalTindakan
        };
      }
      return patient;
    });

    setPatients(updatedPatients);
    
    // Update selected patient
    const updatedSelectedPatient = updatedPatients.find(p => p.id === selectedPatient.id);
    setSelectedPatient(updatedSelectedPatient);

    // Reset form and close modal
    setFormData({
      tanggalTindakan: new Date().toISOString().split('T')[0],
      jenisTindakan: '',
      dokterPenanganan: '',
      biayaDasar: '',
      diskonPersen: 0,
      metodePembayaran: ''
    });
    setIsModalOpen(false);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString || dateString === '-') return '-';
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Modul Finansial CRM
              </h1>
              <p className="text-gray-600">
                Kelola riwayat transaksi dan tindakan pasien
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-lg"
            >
              <FaPlus className="text-sm" />
              Tambah Tindakan
            </button>
          </div>
        </div>

        {/* Patient Selector */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Pilih Pasien:
          </label>
          <select
            value={selectedPatient?.id || ''}
            onChange={(e) => setSelectedPatient(patients.find(p => p.id === e.target.value))}
            className="w-full md:w-96 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            {patients.map(patient => (
              <option key={patient.id} value={patient.id}>
                {patient.nama} - {patient.id}
              </option>
            ))}
          </select>
        </div>

        {/* Financial Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          
          {/* Total Akumulasi */}
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <FaChartLine className="text-2xl" />
              </div>
              <span className="text-xs font-semibold bg-white/20 px-3 py-1 rounded-full">
                {financialSummary.jumlahTransaksi} Transaksi
              </span>
            </div>
            <h3 className="text-sm font-medium text-emerald-100 mb-1">
              Total Akumulasi Transaksi
            </h3>
            <p className="text-3xl font-bold">
              {formatCurrency(financialSummary.totalAkumulasi)}
            </p>
          </div>

          {/* Metode Pembayaran Terakhir */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <FaWallet className="text-2xl text-blue-600" />
              </div>
            </div>
            <h3 className="text-sm font-semibold text-gray-600 mb-1">
              Metode Pembayaran Terakhir
            </h3>
            <p className="text-2xl font-bold text-gray-900">
              {financialSummary.metodeTerakhir}
            </p>
          </div>

          {/* Kunjungan Terakhir */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <FaHistory className="text-2xl text-purple-600" />
              </div>
            </div>
            <h3 className="text-sm font-semibold text-gray-600 mb-1">
              Kunjungan Terakhir
            </h3>
            <p className="text-lg font-bold text-gray-900">
              {formatDate(financialSummary.kunjunganTerakhir)}
            </p>
          </div>
        </div>

        {/* Transaction History Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-xl font-bold text-gray-900">
              Detail Sesi & Riwayat Tindakan
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Pasien: <span className="font-semibold text-gray-900">{selectedPatient?.nama}</span>
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Tanggal
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Tindakan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Dokter
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Biaya Dasar
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Diskon
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Biaya Bersih
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Metode
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {selectedPatient?.riwayatPerawatan.length > 0 ? (
                  selectedPatient.riwayatPerawatan.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(item.tanggal)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                        {item.tindakan}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {item.dokter}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {item.biayaDasar ? formatCurrency(item.biayaDasar) : formatCurrency(item.biaya)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-600 font-semibold">
                        {item.diskon ? `${item.diskon}%` : '0%'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-emerald-600">
                        {formatCurrency(item.biaya)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-50 text-blue-700">
                          {item.metode}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
                      <FaHistory className="mx-auto text-4xl text-gray-300 mb-3" />
                      <p className="text-sm">Belum ada riwayat transaksi untuk pasien ini</p>
                    </td>
                  </tr>
                )}
              </tbody>
              {selectedPatient?.riwayatPerawatan.length > 0 && (
                <tfoot className="bg-emerald-50 border-t-2 border-emerald-200">
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-right font-bold text-gray-900">
                      TOTAL KESELURUHAN:
                    </td>
                    <td colSpan="2" className="px-6 py-4 font-bold text-2xl text-emerald-600">
                      {formatCurrency(financialSummary.totalAkumulasi)}
                    </td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </div>

      </div>

      {/* Modal Form Input Tindakan */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-xl font-bold">Tambah Tindakan Baru</h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setErrors({});
                }}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/20 transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              
              {/* Patient Info */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Pasien:</span> {selectedPatient?.nama}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  ID: {selectedPatient?.id}
                </p>
              </div>

              {/* Tanggal Tindakan */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <FaCalendarAlt className="text-emerald-600" />
                  Tanggal Tindakan <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="tanggalTindakan"
                  value={formData.tanggalTindakan}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2.5 border ${errors.tanggalTindakan ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                />
                {errors.tanggalTindakan && (
                  <p className="text-red-500 text-xs mt-1">{errors.tanggalTindakan}</p>
                )}
              </div>

              {/* Jenis Tindakan */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <FaTooth className="text-emerald-600" />
                  Jenis Tindakan <span className="text-red-500">*</span>
                </label>
                <select
                  name="jenisTindakan"
                  value={formData.jenisTindakan}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2.5 border ${errors.jenisTindakan ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                >
                  <option value="">-- Pilih Jenis Tindakan --</option>
                  {JENIS_TINDAKAN.map((jenis, index) => (
                    <option key={index} value={jenis}>{jenis}</option>
                  ))}
                </select>
                {errors.jenisTindakan && (
                  <p className="text-red-500 text-xs mt-1">{errors.jenisTindakan}</p>
                )}
              </div>

              {/* Dokter Penanganan */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <FaUserMd className="text-emerald-600" />
                  Dokter yang Menangani <span className="text-red-500">*</span>
                </label>
                <select
                  name="dokterPenanganan"
                  value={formData.dokterPenanganan}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2.5 border ${errors.dokterPenanganan ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                >
                  <option value="">-- Pilih Dokter --</option>
                  {activeDoctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.nama}>
                      {doctor.nama} - {doctor.spesialis}
                    </option>
                  ))}
                </select>
                {errors.dokterPenanganan && (
                  <p className="text-red-500 text-xs mt-1">{errors.dokterPenanganan}</p>
                )}
              </div>

              {/* Biaya Dasar & Diskon */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Biaya Dasar */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <FaMoneyBillWave className="text-emerald-600" />
                    Biaya Dasar <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="biayaDasar"
                    value={formData.biayaDasar}
                    onChange={handleInputChange}
                    placeholder="0"
                    min="0"
                    className={`w-full px-4 py-2.5 border ${errors.biayaDasar ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                  />
                  {errors.biayaDasar && (
                    <p className="text-red-500 text-xs mt-1">{errors.biayaDasar}</p>
                  )}
                </div>

                {/* Diskon */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <FaPercent className="text-emerald-600" />
                    Diskon (%)
                  </label>
                  <input
                    type="number"
                    name="diskonPersen"
                    value={formData.diskonPersen}
                    onChange={handleInputChange}
                    placeholder="0"
                    min="0"
                    max="100"
                    className={`w-full px-4 py-2.5 border ${errors.diskonPersen ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                  />
                  {errors.diskonPersen && (
                    <p className="text-red-500 text-xs mt-1">{errors.diskonPersen}</p>
                  )}
                </div>
              </div>

              {/* Preview Biaya Bersih */}
              {formData.biayaDasar && (
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-gray-700">Biaya Bersih:</span>
                    <span className="text-2xl font-bold text-emerald-600">
                      {formatCurrency(calculateBiayaBersih(formData.biayaDasar, formData.diskonPersen))}
                    </span>
                  </div>
                  {formData.diskonPersen > 0 && (
                    <p className="text-xs text-gray-600 mt-2">
                      Hemat: {formatCurrency(parseFloat(formData.biayaDasar) * parseFloat(formData.diskonPersen) / 100)}
                    </p>
                  )}
                </div>
              )}

              {/* Metode Pembayaran */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <FaCreditCard className="text-emerald-600" />
                  Metode Pembayaran <span className="text-red-500">*</span>
                </label>
                <select
                  name="metodePembayaran"
                  value={formData.metodePembayaran}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2.5 border ${errors.metodePembayaran ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                >
                  <option value="">-- Pilih Metode Pembayaran --</option>
                  {METODE_PEMBAYARAN.map((metode, index) => (
                    <option key={index} value={metode}>{metode}</option>
                  ))}
                </select>
                {errors.metodePembayaran && (
                  <p className="text-red-500 text-xs mt-1">{errors.metodePembayaran}</p>
                )}
              </div>

              {/* Form Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setErrors({});
                  }}
                  className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <FaPlus className="text-sm" />
                  Tambah Tindakan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialCRM;
