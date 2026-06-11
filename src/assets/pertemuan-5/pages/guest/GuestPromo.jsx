import { useState } from "react";
import { useClinic } from "../../context/ClinicContext";
import { Link } from "react-router-dom";
import { FaArrowRight, FaCheckCircle, FaClock, FaTag } from "react-icons/fa";

function getDaysLeft(tanggal) {
  const diff = new Date(tanggal) - new Date();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export default function GuestPromo() {
  const { campaigns } = useClinic();
  const [filter, setFilter] = useState("Semua");

  const aktif = campaigns.filter((c) => c.status === "Aktif");
  const membership = ["Semua", "Gold", "Platinum", "Silver", "Bronze"];

  const filtered = aktif.filter((c) => {
    if (filter === "Semua") return true;
    return c.targetMembership.includes("Semua") || c.targetMembership.includes(filter);
  });

  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-r from-[#0F766E] to-[#14B8A6] text-white py-16 px-6 text-center">
        <p className="text-white/70 text-sm font-bold uppercase tracking-widest mb-2">Penawaran Terbaik</p>
        <h1 className="text-4xl font-extrabold mb-3">Promo & Campaign</h1>
        <p className="text-white/80 max-w-xl mx-auto">
          Dapatkan penawaran eksklusif untuk perawatan gigi terbaik. Terbatas — jangan sampai terlewat!
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Promo Aktif",       value: aktif.length,                                     icon: "🎯" },
            { label: "Untuk Semua",       value: aktif.filter(c => c.targetMembership.includes("Semua")).length, icon: "👥" },
            { label: "Khusus Member",     value: aktif.filter(c => !c.targetMembership.includes("Semua")).length, icon: "⭐" },
            { label: "Segera Berakhir",   value: aktif.filter(c => getDaysLeft(c.berlakuHingga) <= 14).length,   icon: "⏳" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
              <p className="text-3xl mb-1">{s.icon}</p>
              <p className="text-2xl font-extrabold text-gray-800">{s.value}</p>
              <p className="text-xs text-gray-400 font-medium mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex gap-2 flex-wrap mb-8">
          {membership.map((m) => (
            <button
              key={m}
              onClick={() => setFilter(m)}
              style={filter === m ? { backgroundColor: "#0F766E", color: "white" } : {}}
              className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-colors ${
                filter === m
                  ? "border-[#0F766E]"
                  : "bg-white border-gray-200 text-gray-600 hover:border-[#0F766E] hover:text-[#0F766E]"
              }`}
            >
              {m === "Semua" ? "🏷️ Semua Promo" : `⭐ ${m}`}
            </button>
          ))}
        </div>

        {/* Promo Cards */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-4xl mb-3">🎁</p>
            <p className="font-semibold">Tidak ada promo untuk kategori ini.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((c) => {
              const daysLeft = getDaysLeft(c.berlakuHingga);
              const isExpiringSoon = daysLeft <= 14;
              return (
                <div key={c.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  {/* Card header gradient */}
                  <div className={`bg-gradient-to-r ${c.warna} p-6 text-white relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full translate-x-8 -translate-y-8" />
                    <div className="text-4xl mb-3">{c.icon}</div>
                    <span className="text-xs font-bold bg-white/20 border border-white/30 px-3 py-1 rounded-full inline-flex items-center gap-1 mb-3">
                      <FaTag className="text-[10px]" /> {c.badge}
                    </span>
                    <h3 className="text-lg font-extrabold leading-tight">{c.judul}</h3>
                  </div>

                  {/* Card body */}
                  <div className="p-5">
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">{c.deskripsi}</p>

                    {/* Target membership */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {c.targetMembership.map((t) => (
                        <span key={t} className="text-[11px] bg-[#E8F8F6] text-[#0F766E] px-2 py-0.5 rounded-full font-semibold">
                          {t === "Semua" ? "👥 Semua Pasien" : `⭐ ${t}`}
                        </span>
                      ))}
                    </div>

                    {/* Syarat */}
                    <div className="space-y-1.5 mb-4">
                      {c.syarat.map((s, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <FaCheckCircle className="text-[#0F766E] text-xs mt-0.5 shrink-0" />
                          <p className="text-xs text-gray-500">{s}</p>
                        </div>
                      ))}
                    </div>

                    {/* Expired date */}
                    <div className={`flex items-center gap-1.5 text-xs font-semibold mb-4 ${isExpiringSoon ? "text-red-500" : "text-gray-400"}`}>
                      <FaClock className="text-[10px]" />
                      {isExpiringSoon
                        ? `⚠️ Berakhir dalam ${daysLeft} hari!`
                        : `Berlaku hingga ${new Date(c.berlakuHingga).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}`
                      }
                    </div>

                    <Link
                      to="/guest/komplain"
                      className="w-full flex items-center justify-center gap-2 bg-[#0F766E] hover:bg-[#0A5E58] text-white text-sm font-bold py-2.5 rounded-xl transition-colors"
                    >
                      Klaim Promo <FaArrowRight className="text-xs" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* CTA daftar */}
        <div className="mt-16 bg-gradient-to-r from-[#0F766E] to-[#14B8A6] rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-extrabold mb-2">Jangan Lewatkan Promo Eksklusif!</h3>
          <p className="text-white/80 mb-6">Daftar sebagai member dan dapatkan akses ke promo khusus berdasarkan level keanggotaan Anda.</p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-white text-[#0F766E] font-bold px-8 py-3 rounded-xl hover:bg-gray-100 transition-colors"
          >
            Daftar Sekarang <FaArrowRight className="text-sm" />
          </Link>
        </div>
      </div>
    </div>
  );
}
