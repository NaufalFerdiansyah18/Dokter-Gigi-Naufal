import { useState, useEffect } from "react";
import { supabase } from "../../../../services/supabaseClient";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaSave } from "react-icons/fa";

export default function MemberProfil() {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    async function fetchUserData() {
      const userEmail = localStorage.getItem("user_email");
      const { data } = await supabase.from("users").select("*").eq("email", userEmail).single();
      if (data) {
        setUserData({
          full_name: data.full_name || "",
          email: data.email || "",
          phone: data.phone || data.noHp || "",
          address: data.address || data.alamat || "",
        });
      }
    }
    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulasi update
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert("Profil berhasil diperbarui!");
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Profil Saya</h1>
      <p className="text-gray-500 mb-8">Kelola informasi pribadi Anda</p>

      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        {/* Avatar Section */}
        <div className="flex flex-col items-center mb-8 pb-8 border-b border-gray-100">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#0F766E] to-[#14B8A6] text-white flex items-center justify-center text-3xl font-bold mb-4">
            {userData.full_name?.[0]?.toUpperCase() || "U"}
          </div>
          <button className="text-sm text-[#0F766E] font-semibold hover:underline">
            Ubah Foto Profil
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <FaUser className="text-[#0F766E]" />
              Nama Lengkap
            </label>
            <input
              type="text"
              value={userData.full_name}
              onChange={(e) => setUserData({ ...userData, full_name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] outline-none"
              placeholder="Masukkan nama lengkap"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <FaEnvelope className="text-[#0F766E]" />
              Email
            </label>
            <input
              type="email"
              value={userData.email}
              disabled
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed"
            />
            <p className="text-xs text-gray-400 mt-1">Email tidak dapat diubah</p>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <FaPhone className="text-[#0F766E]" />
              No. Telepon
            </label>
            <input
              type="tel"
              value={userData.phone}
              onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] outline-none"
              placeholder="08xxxxxxxxxx"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <FaMapMarkerAlt className="text-[#0F766E]" />
              Alamat
            </label>
            <textarea
              value={userData.address}
              onChange={(e) => setUserData({ ...userData, address: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] outline-none resize-none"
              placeholder="Masukkan alamat lengkap"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0F766E] text-white font-semibold py-3 rounded-xl hover:bg-[#0A5E58] disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
          >
            <FaSave />
            {loading ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </form>

        {/* Password Section */}
        <div className="mt-8 pt-8 border-t border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4">Keamanan Akun</h3>
          <button className="text-sm text-[#0F766E] font-semibold hover:underline">
            Ubah Password
          </button>
        </div>
      </div>
    </div>
  );
}
