import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useClinic } from "../../context/ClinicContext";
import {
  FaStar, FaRegStar, FaSearch, FaFilter, FaExternalLinkAlt,
  FaCommentAlt, FaChartBar,
} from "react-icons/fa";
import Badge from "../../components/Badge";
import Avatar from "../../components/Avatar";

function StarRating({ value, size = "sm" }) {
  const cls = size === "lg" ? "text-base" : "text-xs";
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) =>
        i <= value
          ? <FaStar key={i} className={`text-yellow-400 ${cls}`} />
          : <FaRegStar key={i} className={`text-gray-200 ${cls}`} />
      )}
    </div>
  );
}

function StatCard({ icon, label, value, color = "teal" }) {
  const colors = {
    teal:   "bg-[#E8F8F6] text-[#0F766E]",
    yellow: "bg-yellow-50 text-yellow-600",
    blue:   "bg-blue-50 text-blue-600",
    gray:   "bg-gray-100 text-gray-500",
  };
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${colors[color]}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-400 font-medium">{label}</p>
        <p className="text-2xl font-extrabold text-gray-800">{value}</p>
      </div>
    </div>
  );
}

export default function FeedbackRating() {
  const { patients } = useClinic();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [filterRating, setFilterRating] = useState("Semua");

  // ── Stats
  const stats = useMemo(() => {
    const rated = patients.filter((p) => p.feedbackReview?.rating);
    if (!rated.length) return { avg: 0, total: 0, bintang5: 0, belumReview: 0 };
    const avg = (rated.reduce((s, p) => s + p.feedbackReview.rating, 0) / rated.length).toFixed(1);
    const bintang5 = rated.filter((p) => p.feedbackReview.rating === 5).length;
    return { avg, total: rated.length, bintang5, belumReview: patients.length - rated.length };
  }, [patients]);

  // ── Rating distribution
  const dist = useMemo(() => {
    return [5, 4, 3, 2, 1].map((r) => ({
      rating: r,
      count: patients.filter((p) => p.feedbackReview?.rating === r).length,
    }));
  }, [patients]);

  // ── Filter
  const filtered = useMemo(() => {
    return patients
      .filter((p) => p.feedbackReview)
      .filter((p) => {
        const matchSearch = p.nama.toLowerCase().includes(search.toLowerCase());
        const matchRating = filterRating === "Semua" || p.feedbackReview.rating === Number(filterRating);
        return matchSearch && matchRating;
      })
      .sort((a, b) => b.feedbackReview.rating - a.feedbackReview.rating);
  }, [patients, search, filterRating]);

  const maxDist = Math.max(...dist.map((d) => d.count), 1);

  return (
    <div className="flex flex-col w-full pb-10 min-h-screen bg-gray-50/30">

      {/* Banner */}
      <div className="relative bg-gradient-to-r from-[#1A7C6E] to-[#2BB5A0] rounded-3xl px-8 pt-10 pb-24 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl translate-y-1/2" />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Feedback & Rating</h1>
          <p className="text-white/80 text-sm max-w-lg">
            Ulasan dan penilaian pasien terhadap layanan klinik.
          </p>
        </div>
      </div>

      <div className="relative -mt-14 z-20 flex flex-col gap-6">

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<FaStar />}       label="Rata-rata Rating"   value={`${stats.avg} ★`} color="yellow" />
        <StatCard icon={<FaCommentAlt />} label="Total Review"       value={stats.total}       color="teal"   />
        <StatCard icon={<FaChartBar />}   label="Bintang 5"          value={stats.bintang5}    color="blue"   />
        <StatCard icon={<FaRegStar />}    label="Belum Review"       value={stats.belumReview} color="gray"   />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Distribusi Rating */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-bold text-gray-700 text-sm mb-4">Distribusi Rating</h3>
          <div className="space-y-3">
            {dist.map((d) => (
              <div key={d.rating} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-14 shrink-0">
                  <span className="text-xs font-bold text-gray-600">{d.rating}</span>
                  <FaStar className="text-yellow-400 text-xs" />
                </div>
                <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-2 rounded-full bg-yellow-400 transition-all duration-500"
                    style={{ width: `${(d.count / maxDist) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-gray-500 w-5 text-right shrink-0">{d.count}</span>
              </div>
            ))}
          </div>

          {/* Avg besar */}
          <div className="mt-6 pt-4 border-t border-gray-100 text-center">
            <p className="text-5xl font-extrabold text-gray-800">{stats.avg}</p>
            <StarRating value={Math.round(stats.avg)} size="lg" />
            <p className="text-xs text-gray-400 mt-1">dari {stats.total} ulasan</p>
          </div>
        </div>

        {/* List Review */}
        <div className="lg:col-span-2 flex flex-col gap-4">

          {/* Filter */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-40">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="text"
                placeholder="Cari nama pasien..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F766E]/30 focus:border-[#0F766E]"
              />
            </div>
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-600 focus:outline-none"
            >
              <option value="Semua">Semua Bintang</option>
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>Bintang {r}</option>
              ))}
            </select>
            <span className="text-xs text-gray-400 ml-auto">{filtered.length} ulasan</span>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filtered.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 hover:border-yellow-300/50 hover:bg-yellow-50/30 transition-colors"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Avatar name={p.nama} size="sm" color="bg-[#E8F8F6] text-[#0F766E]" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 text-sm truncate">{p.nama}</p>
                    <StarRating value={p.feedbackReview.rating} />
                  </div>
                  <span className="text-xs text-gray-400 shrink-0">{p.feedbackReview.tanggal}</span>
                </div>
                <p className="text-sm text-gray-600 italic leading-relaxed">
                  "{p.feedbackReview.komentar}"
                </p>
                <button
                  onClick={() => navigate(`/pasien/${p.id}`, { state: { tab: "engagement" } })}
                  className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#0F766E] hover:underline"
                >
                  Lihat profil <FaExternalLinkAlt className="text-[10px]" />
                </button>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="col-span-2 py-16 text-center">
                <FaStar className="mx-auto text-4xl text-gray-200 mb-3" />
                <p className="text-sm text-gray-400">Tidak ada ulasan ditemukan.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
