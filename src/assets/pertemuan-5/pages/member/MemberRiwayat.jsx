import { FaTooth, FaCalendarAlt, FaUserMd, FaFileDownload } from "react-icons/fa";

const riwayatData = [
  {
    id: 1,
    date: "20 Januari 2025",
    doctor: "Dr. Sarah Putri",
    treatment: "Scaling & Pembersihan Karang Gigi",
    diagnosis: "Plak dan karang gigi ringan",
    prescription: "Mouthwash antiseptik, Sikat gigi khusus",
    cost: 250000,
    status: "Selesai",
  },
  {
    id: 2,
    date: "15 Desember 2024",
    doctor: "Dr. Ahmad Fauzi",
    treatment: "Tambal Gigi",
    diagnosis: "Karies gigi molar kanan atas",
    prescription: "Paracetamol 500mg, Hindari makanan keras",
    cost: 350000,
    status: "Selesai",
  },
  {
    id: 3,
    date: "10 November 2024",
    doctor: "Dr. Lisa Amelia",
    treatment: "Konsultasi Pemasangan Behel",
    diagnosis: "Maloklusi ringan",
    prescription: "X-Ray panoramik (terlampir)",
    cost: 150000,
    status: "Selesai",
  },
];

export default function MemberRiwayat() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Riwayat Medis</h1>
        <p className="text-gray-500">History lengkap kunjungan dan treatment Anda</p>
      </div>

      <div className="space-y-4">
        {riwayatData.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#0F766E] text-white flex items-center justify-center flex-shrink-0">
                  <FaTooth className="text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{item.treatment}</h3>
                  <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <FaCalendarAlt className="text-[#0F766E]" />
                      {item.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaUserMd className="text-[#0F766E]" />
                      {item.doctor}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                  {item.status}
                </span>
                <span className="text-lg font-bold text-[#0F766E]">
                  Rp {item.cost.toLocaleString("id-ID")}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Diagnosis</p>
                <p className="text-sm text-gray-900">{item.diagnosis}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Resep & Catatan</p>
                <p className="text-sm text-gray-900">{item.prescription}</p>
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-[#0F766E] text-white text-sm font-semibold rounded-xl hover:bg-[#0A5E58] transition-colors">
                <FaFileDownload />
                Download Invoice
              </button>
              <button className="px-4 py-2 border-2 border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:border-gray-300 transition-colors">
                Lihat Detail
              </button>
            </div>
          </div>
        ))}
      </div>

      {riwayatData.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
          <FaTooth className="text-5xl text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Belum ada riwayat medis</p>
        </div>
      )}
    </div>
  );
}
