import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../../services/supabaseClient";
import {
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaBirthdayCake,
  FaVenusMars, FaUserMd, FaStar, FaSignOutAlt, FaTooth,
} from "react-icons/fa";
import { MdOutlineLoyalty } from "react-icons/md";

const ACTIVE_PATIENT_ID = "PS-001";

const LEVEL_GRADIENT = {
  Platinum: "from-purple-500 to-purple-700",
  Gold:     "from-yellow-400 to-yellow-600",
  Silver:   "from-gray-400 to-gray-600",
  Bronze:   "from-orange-400 to-orange-600",
};

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0">
      <div className="w-8 h-8 rounded-xl bg-[#E8F8F6] text-[#0F766E] flex items-center justify-center text-sm shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-sm font-semibold text-gray-800">{value || "-"}</p>
      </div>
    </div>
  );
}

export default function GuestProfil() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      const userEmail = localStorage.getItem("user_email");
      
      if (!userEmail) {
        navigate("/login");
        return;
      }

      // Ambil data user dari auth
      const { data: authData } = await supabase.auth.getUser();
      
      if (!authData.user) {
        navigate("/login");
        return;
      }

      // Ambil data lengkap dari tabel public.users
      const { data: publicUserData, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", userEmail)
        .single();

      if (error) {
        console.error("Error fetching user:", error);
      }

      setUserData(publicUserData || {
        email: authData.user.email,
        username: authData.user.email.split("@")[0],
        role: "guest"
      });
      
      setLoading(false);
    }

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Memuat profil...</div>
      </div>
    );
  }

  if (!userData) return null;

  const displayName = userData.full_name || userData.username || userData.email?.split("@")[0] || "Pengguna";
  const initials = displayName.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
  const levelMembership = userData.levelMembership || "Bronze";
  const statusAktif = userData.statusAktif ?? true;

  return (
    <div>
      {/* Hero / banner profil */}
      <div className={`bg-gradient-to-r ${LEVEL_GRADIENT[levelMembership] || "from-gray-400 to-gray-600"} text-white py-16 px-6`}>
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-2xl bg-white/20 border-2 border-white/40 flex items-center justify-center text-4xl font-extrabold shadow-lg shrink-0">
            {initials}
          </div>
          <div>
            <p className="text-white/70 text-sm mb-1">Profil Pengguna</p>
            <h1 className="text-3xl font-extrabold">{displayName}</h1>
            <p className="text-white/80 text-sm mt-1">{userData.email}</p>
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full border border-white/30">
                {levelMembership} Member
              </span>
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${statusAktif ? "bg-green-400/20 border-green-300/40 text-white" : "bg-red-400/20 border-red-300/40 text-white"}`}>
                {statusAktif ? "✅ Aktif" : "❌ Nonaktif"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Data diri */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-5 py-4">
          <h3 className="font-extrabold text-gray-900 mb-1">Data Diri</h3>
          <InfoRow icon={<FaBirthdayCake />}  label="Tanggal Lahir"  value={userData.tanggalLahir ? new Date(userData.tanggalLahir).toLocaleDateString("id-ID", { day:"numeric", month:"long", year:"numeric" }) : (userData.umur ? `${userData.umur} Tahun` : "-")} />
          <InfoRow icon={<FaVenusMars />}     label="Jenis Kelamin"  value={userData.jenisKelamin === "L" ? "Laki-laki" : userData.jenisKelamin === "P" ? "Perempuan" : "-"} />
          <InfoRow icon={<FaPhone />}         label="No. HP"         value={userData.noHp || userData.phone || "-"} />
          <InfoRow icon={<FaEnvelope />}      label="Email"          value={userData.email} />
          <InfoRow icon={<FaMapMarkerAlt />}  label="Alamat"         value={userData.alamat || userData.address || "-"} />
          <InfoRow icon={<FaUserMd />}        label="Dokter Utama"   value={userData.dokter || "-"} />
        </div>

        {/* Membership */}
        <div className="space-y-5">
          <div className={`bg-gradient-to-r ${LEVEL_GRADIENT[levelMembership] || "from-gray-400 to-gray-600"} rounded-2xl p-5 text-white`}>
            <div className="flex items-center gap-2 mb-3">
              <MdOutlineLoyalty className="text-xl" />
              <p className="font-bold">Membership {userData.statusMember || "Aktif"}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-white/60 text-xs">Terdaftar</p>
                <p className="font-semibold">{userData.tanggalDaftar ? new Date(userData.tanggalDaftar).toLocaleDateString("id-ID", { day:"numeric", month:"short", year:"numeric" }) : new Date().toLocaleDateString("id-ID", { day:"numeric", month:"short", year:"numeric" })}</p>
              </div>
              <div>
                <p className="text-white/60 text-xs">Level</p>
                <p className="font-extrabold text-lg">{levelMembership}</p>
              </div>
            </div>
          </div>

          {/* Riwayat singkat */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <h4 className="font-bold text-gray-800 mb-3 text-sm">Perawatan Terakhir</h4>
            {(userData.riwayatPerawatan || []).length > 0 ? (
              (userData.riwayatPerawatan || []).slice(0, 3).map((r, i) => (
                <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                  <div className="w-8 h-8 rounded-xl bg-[#E8F8F6] text-[#0F766E] flex items-center justify-center shrink-0">
                    <FaTooth className="text-xs" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-800 truncate">{r.tindakan}</p>
                    <p className="text-[11px] text-gray-400">{r.tanggal}</p>
                  </div>
                  <p className="text-xs font-bold text-[#0F766E] shrink-0">Rp {r.biaya?.toLocaleString("id-ID")}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-400 text-center py-4">Belum ada riwayat perawatan</p>
            )}
          </div>

          {/* Rating */}
          {userData.feedbackReview && (
            <div className="bg-yellow-50 rounded-2xl border border-yellow-100 p-4">
              <p className="font-bold text-gray-800 text-sm mb-2">Ulasan Saya</p>
              <div className="flex gap-0.5 mb-2">
                {[1,2,3,4,5].map((i) => (
                  <FaStar key={i} className={i <= userData.feedbackReview.rating ? "text-yellow-400" : "text-gray-200"} />
                ))}
              </div>
              <p className="text-sm text-gray-700 italic">"{userData.feedbackReview.komentar}"</p>
            </div>
          )}

          {/* Logout */}
          <button
            onClick={() => {
              localStorage.removeItem("isLoggedIn");
              localStorage.removeItem("user_email");
              localStorage.removeItem("user_role");
              navigate("/login");
            }}
            className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 font-bold py-3 rounded-2xl transition-colors"
          >
            <FaSignOutAlt /> Keluar dari Akun
          </button>
        </div>
      </div>
    </div>
  );
}
