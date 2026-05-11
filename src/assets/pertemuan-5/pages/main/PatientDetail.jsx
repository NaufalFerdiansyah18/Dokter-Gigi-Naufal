import { useParams, useNavigate } from "react-router-dom";
import { useClinic } from "../../context/ClinicContext";
import { BADGE_COLORS } from "../../data/ordersData";
import {
  FaArrowLeft,
  FaPhone,
  FaUserMd,
  FaTooth,
  FaCalendarCheck,
  FaMapMarkerAlt,
  FaVenusMars,
  FaBirthdayCake,
  FaClipboardList,
  FaHistory,
} from "react-icons/fa";

export default function PatientDetail() {
  const { id } = useParams();
  const { patients } = useClinic();
  const navigate = useNavigate();

  const patient = patients.find((p) => p.id === id);

  if (!patient) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="text-7xl mb-4">🦷</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Pasien Tidak Ditemukan</h2>
        <p className="text-gray-500 mb-6">Data pasien dengan ID <span className="font-mono font-bold text-[#1A7C6E]">{id}</span> tidak tersedia.</p>
        <button
          onClick={() => navigate("/pasien")}
          className="flex items-center space-x-2 bg-[#1A7C6E] text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-[#15675C] transition shadow-sm"
        >
          <FaArrowLeft />
          <span>Kembali ke Daftar Pasien</span>
        </button>
      </div>
    );
  }

  const avatarColors = {
    A: "#1A7C6E", B: "#2980b9", C: "#8e44ad", D: "#c0392b", E: "#16a085",
    F: "#d35400", G: "#27ae60", H: "#2c3e50", I: "#f39c12", J: "#1abc9c",
    K: "#e74c3c", L: "#3498db", M: "#9b59b6", N: "#e67e22", O: "#1A7C6E",
    P: "#2ecc71", Q: "#e91e63", R: "#ff5722", S: "#607d8b", T: "#795548",
    U: "#ff9800", V: "#009688", W: "#673ab7", X: "#f44336", Y: "#4caf50",
    Z: "#2196f3",
  };
  const firstLetter = patient.nama.charAt(0).toUpperCase();
  const avatarBg = avatarColors[firstLetter] || "#1A7C6E";

  const genderLabel = patient.jenisKelamin === "L" ? "Laki-laki ♂" : "Perempuan ♀";

  const riwayatPerawatan = patient.riwayatPerawatan || [
    { tanggal: patient.terakhirKunjungan || "-", tindakan: patient.treatment || "-", dokter: patient.dokter || "-" },
  ];

  const jadwalKontrol = patient.jadwalKontrol || null;
  const keluhan = patient.keluhan || patient.treatment || "-";

  return (
    <div className="flex flex-col w-full pb-10">
      {/* Back Button & Header */}
      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={() => navigate("/pasien")}
          className="flex items-center space-x-2 text-gray-500 hover:text-[#1A7C6E] transition font-medium text-sm group"
        >
          <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-[#E8F8F6] flex items-center justify-center transition">
            <FaArrowLeft className="text-sm" />
          </div>
          <span>Kembali</span>
        </button>
        <div className="h-4 w-px bg-gray-200" />
        <div className="text-sm text-gray-400">
          <span className="text-gray-500 font-medium">Daftar Pasien</span>
          <span className="mx-2">/</span>
          <span className="text-[#1A7C6E] font-semibold">Detail Pasien</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ─── Left Card: Profile ─── */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Gradient Header */}
            <div
              className="h-28 w-full"
              style={{
                background: `linear-gradient(135deg, ${avatarBg}22 0%, #1A7C6E33 100%)`,
              }}
            />

            {/* Avatar */}
            <div className="px-6 pb-6 -mt-12 flex flex-col items-center text-center">
              <div
                className="w-24 h-24 rounded-2xl flex items-center justify-center text-white font-bold text-4xl shadow-lg border-4 border-white"
                style={{ background: `linear-gradient(135deg, ${avatarBg}, ${avatarBg}cc)` }}
              >
                {firstLetter}
              </div>

              <h1 className="mt-4 text-xl font-bold text-gray-800">{patient.nama}</h1>
              <p className="text-sm text-gray-400 font-mono mt-1">{patient.id}</p>

              <span
                className={`mt-3 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide ${BADGE_COLORS[patient.status] || "bg-gray-100 text-gray-700"
                  }`}
              >
                {patient.status}
              </span>

              <div className="mt-6 w-full space-y-3 text-left">
                <InfoRow icon={<FaBirthdayCake />} label="Umur" value={`${patient.umur} Tahun`} />
                <InfoRow icon={<FaVenusMars />} label="Jenis Kelamin" value={genderLabel} />
                <InfoRow icon={<FaPhone />} label="Nomor HP" value={patient.noHp} />
                <InfoRow icon={<FaMapMarkerAlt />} label="Alamat" value={patient.alamat || "-"} />
                <InfoRow icon={<FaUserMd />} label="Dokter" value={patient.dokter || "-"} />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Keluhan & Treatment */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <SectionTitle icon={<FaTooth />} title="Keluhan & Treatment" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <DetailCard
                label="Keluhan Utama"
                value={keluhan}
                color="#E8F8F6"
                textColor="#1A7C6E"
              />
              <DetailCard
                label="Treatment Saat Ini"
                value={patient.treatment || "-"}
                color="#FFF7E6"
                textColor="#D97706"
              />
            </div>
          </div>

          {/* Jadwal Kontrol */}
          {jadwalKontrol && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <SectionTitle icon={<FaCalendarCheck />} title="Jadwal Kontrol Berikutnya" />
              <div className="mt-4 p-4 rounded-xl bg-[#E8F8F6] border border-[#1A7C6E]/20 flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-[#1A7C6E] text-white flex items-center justify-center text-xl shadow">
                  <FaCalendarCheck />
                </div>
                <div>
                  <p className="font-bold text-gray-800">{jadwalKontrol.tanggal}</p>
                  <p className="text-sm text-gray-500">{jadwalKontrol.keterangan}</p>
                </div>
              </div>
            </div>
          )}

          {/* Riwayat Perawatan */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <SectionTitle icon={<FaHistory />} title="Riwayat Perawatan" />
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-500 font-semibold">
                  <tr>
                    <th className="px-4 py-3 rounded-l-xl">Tanggal</th>
                    <th className="px-4 py-3">Tindakan</th>
                    <th className="px-4 py-3 rounded-r-xl">Dokter</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {riwayatPerawatan.map((r, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-3 text-gray-500 font-mono text-xs">{r.tanggal}</td>
                      <td className="px-4 py-3 text-gray-800 font-medium">{r.tindakan}</td>
                      <td className="px-4 py-3 text-gray-600">{r.dokter}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Info Tambahan */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <SectionTitle icon={<FaClipboardList />} title="Info Kunjungan" />
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DetailCard
                label="Terakhir Kunjungan"
                value={patient.terakhirKunjungan || "-"}
                color="#EFF6FF"
                textColor="#2563EB"
              />
              <DetailCard
                label="Status Pasien"
                value={patient.status}
                color={
                  patient.status === "Active" ? "#DCFCE7" :
                    patient.status === "Waiting" ? "#FEF9C3" :
                      patient.status === "Completed" ? "#E0F2FE" :
                        "#FEE2E2"
                }
                textColor={
                  patient.status === "Active" ? "#16A34A" :
                    patient.status === "Waiting" ? "#CA8A04" :
                      patient.status === "Completed" ? "#0284C7" :
                        "#DC2626"
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Helper Components ─── */

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-start space-x-3 py-2 border-b border-gray-50 last:border-0">
      <div className="w-7 h-7 rounded-lg bg-[#E8F8F6] text-[#1A7C6E] flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-sm font-semibold text-gray-700 truncate">{value}</p>
      </div>
    </div>
  );
}

function SectionTitle({ icon, title }) {
  return (
    <div className="flex items-center space-x-3">
      <div className="w-8 h-8 rounded-lg bg-[#E8F8F6] text-[#1A7C6E] flex items-center justify-center">
        {icon}
      </div>
      <h2 className="text-base font-bold text-gray-800">{title}</h2>
    </div>
  );
}

function DetailCard({ label, value, color, textColor }) {
  return (
    <div
      className="p-4 rounded-xl border"
      style={{ backgroundColor: color, borderColor: textColor + "22" }}
    >
      <p className="text-xs font-medium mb-1" style={{ color: textColor + "99" }}>
        {label}
      </p>
      <p className="font-bold text-sm" style={{ color: textColor }}>
        {value}
      </p>
    </div>
  );
}
