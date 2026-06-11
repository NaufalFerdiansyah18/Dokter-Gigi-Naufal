import { useClinic } from "../../context/ClinicContext";
import { FaCalendarAlt, FaTooth, FaUserMd, FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";

const ACTIVE_PATIENT_ID = "PS-001";

const STATUS_STYLE = {
  Active:    "bg-green-50 text-green-700 border-green-200",
  Waiting:   "bg-yellow-50 text-yellow-700 border-yellow-200",
  Completed: "bg-teal-50 text-teal-700 border-teal-200",
  Cancel:    "bg-red-50 text-red-600 border-red-200",
};
const STATUS_ICON = {
  Active:    <FaClock className="text-green-500" />,
  Waiting:   <FaClock className="text-yellow-500" />,
  Completed: <FaCheckCircle className="text-teal-500" />,
  Cancel:    <FaTimesCircle className="text-red-500" />,
};

export default function GuestJadwal() {
  const { patients } = useClinic();
  const patient = patients.find((p) => p.id === ACTIVE_PATIENT_ID);
  if (!patient) return null;

  return (
    <div className="flex flex-col gap-5 px-4 py-5">

      {/* Header */}
      <div>
        <h2 className="text-xl font-extrabold text-gray-800">Jadwal & Riwayat</h2>
        <p className="text-sm text-gray-400 mt-0.5">Kontrol mendatang dan perawatan yang sudah kamu jalani.</p>
      </div>

      {/* Jadwal kontrol berikutnya */}
      {patient.jadwalKontrol ? (
        <div className="bg-gradient-to-r from-[#0F766E] to-[#14B8A6] rounded-2xl p-5 text-white shadow-md">
          <p className="text-xs font-bold text-white/70 mb-2 uppercase tracking-wider">Kontrol Berikutnya</p>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-2xl shrink-0">
              <FaCalendarAlt />
            </div>
            <div>
              <p className="text-xl font-extrabold">{patient.jadwalKontrol.tanggal}</p>
              <p className="text-sm text-white/80 mt-0.5">{patient.jadwalKontrol.keterangan}</p>
              <p className="text-xs text-white/60 mt-1">Dokter: {patient.dokter}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-100 rounded-2xl p-5 text-center text-gray-400">
          <FaCalendarAlt className="mx-auto text-3xl mb-2 text-gray-300" />
          <p className="text-sm font-medium">Belum ada jadwal kontrol</p>
        </div>
      )}

      {/* Status perawatan saat ini */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Status Perawatan</p>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#E8F8F6] text-[#0F766E] flex items-center justify-center">
            <FaTooth />
          </div>
          <div className="flex-1">
            <p className="font-bold text-gray-800 text-sm">{patient.jenisPerawatan || patient.treatment || "-"}</p>
            <p className="text-xs text-gray-400">Keluhan: {patient.keluhan || "-"}</p>
          </div>
          <span className={`text-xs font-bold px-3 py-1 rounded-full border ${STATUS_STYLE[patient.status] || "bg-gray-100 text-gray-500 border-gray-200"}`}>
            {patient.status}
          </span>
        </div>
      </div>

      {/* Riwayat perawatan */}
      <div>
        <p className="text-sm font-bold text-gray-700 mb-3">Riwayat Perawatan</p>
        <div className="flex flex-col gap-3">
          {(patient.riwayatPerawatan || []).map((r, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#E8F8F6] text-[#0F766E] flex items-center justify-center shrink-0 mt-0.5">
                <FaTooth className="text-sm" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-800 text-sm">{r.tindakan}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <FaUserMd className="text-gray-300 text-xs" />
                  <p className="text-xs text-gray-500">{r.dokter}</p>
                </div>
                <p className="text-[11px] text-gray-400 mt-0.5 font-mono">{r.tanggal}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs font-extrabold text-[#0F766E]">
                  Rp {r.biaya?.toLocaleString("id-ID")}
                </p>
                <p className="text-[10px] text-gray-400 mt-0.5">{r.metode}</p>
              </div>
            </div>
          ))}
          {(!patient.riwayatPerawatan || patient.riwayatPerawatan.length === 0) && (
            <p className="text-sm text-gray-400 italic text-center py-8">Belum ada riwayat perawatan.</p>
          )}
        </div>
      </div>

      <div className="h-4" />
    </div>
  );
}
