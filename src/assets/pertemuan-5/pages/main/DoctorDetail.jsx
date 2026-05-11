import { useParams, useNavigate } from "react-router-dom";
import { useClinic } from "../../context/ClinicContext";
import { BADGE_COLORS } from "../../data/ordersData";
import {
  FaArrowLeft,
  FaPhone,
  FaEnvelope,
  FaStethoscope,
  FaCalendarAlt,
  FaUserMd,
  FaUsers,
  FaClipboardList,
  FaStar,
  FaGraduationCap,
} from "react-icons/fa";

export default function DoctorDetail() {
  const { id } = useParams();
  const { doctors, patients } = useClinic();
  const navigate = useNavigate();

  const doctor = doctors.find((d) => d.id === id);

  if (!doctor) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="text-7xl mb-4">🩺</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Dokter Tidak Ditemukan</h2>
        <p className="text-gray-500 mb-6">
          Data dokter dengan ID <span className="font-mono font-bold text-[#1A7C6E]">{id}</span> tidak tersedia.
        </p>
        <button
          onClick={() => navigate("/doctors")}
          className="flex items-center space-x-2 bg-[#1A7C6E] text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-[#15675C] transition shadow-sm"
        >
          <FaArrowLeft />
          <span>Kembali ke Daftar Dokter</span>
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

  const firstLetter = doctor.nama.replace("drg. ", "").charAt(0).toUpperCase();
  const avatarBg = avatarColors[firstLetter] || "#1A7C6E";

  // Pasien yang ditangani dokter ini
  const handledPatients = patients.filter((p) => p.dokter === doctor.nama);

  const keahlian = doctor.keahlian || [`${doctor.spesialis}`, "Konsultasi Gigi Umum", "Pemeriksaan Rutin"];
  const pendidikan = doctor.pendidikan || [
    { tahun: "2018", institusi: "Universitas Indonesia", gelar: `Spesialis ${doctor.spesialis}` },
    { tahun: "2014", institusi: "Universitas Gadjah Mada", gelar: "Sarjana Kedokteran Gigi" },
  ];

  return (
    <div className="flex flex-col w-full pb-10">
      {/* Back Button & Breadcrumb */}
      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={() => navigate("/doctors")}
          className="flex items-center space-x-2 text-gray-500 hover:text-[#1A7C6E] transition font-medium text-sm group"
        >
          <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-[#E8F8F6] flex items-center justify-center transition">
            <FaArrowLeft className="text-sm" />
          </div>
          <span>Kembali</span>
        </button>
        <div className="h-4 w-px bg-gray-200" />
        <div className="text-sm text-gray-400">
          <span className="text-gray-500 font-medium">Daftar Dokter</span>
          <span className="mx-2">/</span>
          <span className="text-[#1A7C6E] font-semibold">Detail Dokter</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ─── Left Card: Profile ─── */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Gradient Header */}
            <div
              className="h-28 w-full"
              style={{ background: `linear-gradient(135deg, ${avatarBg}22 0%, #1A7C6E33 100%)` }}
            />

            {/* Avatar */}
            <div className="px-6 pb-6 -mt-12 flex flex-col items-center text-center">
              <div
                className="w-24 h-24 rounded-2xl flex items-center justify-center text-white font-bold text-4xl shadow-lg border-4 border-white"
                style={{ background: `linear-gradient(135deg, ${avatarBg}, ${avatarBg}cc)` }}
              >
                {firstLetter}
              </div>

              <h1 className="mt-4 text-xl font-bold text-gray-800">{doctor.nama}</h1>
              <p className="text-sm text-[#1A7C6E] font-semibold mt-1">{doctor.spesialis}</p>
              <p className="text-xs text-gray-400 font-mono mt-1">{doctor.id}</p>

              <span
                className={`mt-3 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide ${doctor.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-600"
                  }`}
              >
                {doctor.status}
              </span>

              <div className="mt-6 w-full space-y-3 text-left">
                <InfoRow icon={<FaPhone />} label="Nomor HP" value={doctor.noHp} />
                <InfoRow icon={<FaEnvelope />} label="Email" value={doctor.email} />
                <InfoRow icon={<FaCalendarAlt />} label="Jadwal Praktik" value={doctor.jadwal} />
                <InfoRow icon={<FaUsers />} label="Total Pasien" value={`${handledPatients.length} Pasien`} />
              </div>
            </div>
          </div>
        </div>

        {/* ─── Right Cards ─── */}
        <div className="lg:col-span-2 flex flex-col gap-6">

          {/* Spesialis & Keahlian */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <SectionTitle icon={<FaStethoscope />} title="Spesialis & Keahlian" />
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {keahlian.map((k, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-3 p-3 rounded-xl bg-[#E8F8F6] border border-[#1A7C6E]/10"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#1A7C6E] text-white flex items-center justify-center flex-shrink-0">
                    <FaStar className="text-xs" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{k}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Riwayat Pendidikan */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <SectionTitle icon={<FaGraduationCap />} title="Riwayat Pendidikan" />
            <div className="mt-4 space-y-4">
              {pendidikan.map((p, idx) => (
                <div key={idx} className="flex items-start space-x-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-[#1A7C6E] mt-1 flex-shrink-0" />
                    {idx < pendidikan.length - 1 && (
                      <div className="w-0.5 h-8 bg-gray-200 mt-1" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-mono">{p.tahun}</p>
                    <p className="font-semibold text-gray-800 text-sm">{p.gelar}</p>
                    <p className="text-xs text-gray-500">{p.institusi}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Daftar Pasien yang Ditangani */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <SectionTitle icon={<FaClipboardList />} title="Pasien yang Ditangani" />
              <span className="text-xs font-bold bg-[#E8F8F6] text-[#1A7C6E] px-3 py-1 rounded-full">
                {handledPatients.length} Pasien
              </span>
            </div>
            <div className="mt-4 overflow-x-auto">
              {handledPatients.length === 0 ? (
                <p className="text-center text-gray-400 text-sm py-6 italic">Belum ada pasien yang ditangani.</p>
              ) : (
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-500 font-semibold">
                    <tr>
                      <th className="px-4 py-3 rounded-l-xl">Nama Pasien</th>
                      <th className="px-4 py-3">Treatment</th>
                      <th className="px-4 py-3 rounded-r-xl">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {handledPatients.map((p) => (
                      <tr key={p.id} className="hover:bg-gray-50 transition">
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <div className="w-7 h-7 rounded-full bg-[#E8F8F6] text-[#1A7C6E] flex items-center justify-center text-xs font-bold flex-shrink-0">
                              {p.nama.charAt(0)}
                            </div>
                            <span className="font-medium text-gray-800">{p.nama}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-600">{p.treatment || "-"}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${BADGE_COLORS[p.status] || "bg-gray-100 text-gray-700"}`}>
                            {p.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Info Tambahan */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <SectionTitle icon={<FaUserMd />} title="Info Praktik" />
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DetailCard
                label="Jadwal Praktik"
                value={doctor.jadwal}
                color="#E8F8F6"
                textColor="#1A7C6E"
              />
              <DetailCard
                label="Status Dokter"
                value={doctor.status}
                color={doctor.status === "Active" ? "#DCFCE7" : "#F3F4F6"}
                textColor={doctor.status === "Active" ? "#16A34A" : "#6B7280"}
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
        <p className="text-sm font-semibold text-gray-700 break-all">{value}</p>
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
