import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useClinic } from "../../context/ClinicContext";
import {
  FaStar, FaRegStar, FaSearch, FaFilter, FaExternalLinkAlt,
  FaCheckCircle, FaBullhorn, FaUsers,
} from "react-icons/fa";
import { MdOutlineLoyalty } from "react-icons/md";
import Badge from "../../components/Badge";
import Avatar from "../../components/Avatar";

const LEVEL_COLOR = {
  Platinum: "bg-purple-100 text-purple-700",
  Gold:     "bg-yellow-100 text-yellow-700",
  Silver:   "bg-gray-100 text-gray-600",
  Bronze:   "bg-orange-100 text-orange-600",
};
const PROMO_BADGE = { Aktif: "success", "Tidak Aktif": "default" };

function StarRating({ value }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) =>
        i <= value
          ? <FaStar key={i} className="text-yellow-400 text-xs" />
          : <FaRegStar key={i} className="text-gray-300 text-xs" />
      )}
    </div>
  );
}

function StatCard({ icon, label, value, color = "teal" }) {
  const colors = {
    teal:   "bg-[#E8F8F6] text-[#0F766E]",
    blue:   "bg-blue-50 text-blue-600",
    purple: "bg-purple-50 text-purple-600",
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

export default function PasienCRM() {
  const { patients } = useClinic();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [filterLevel, setFilterLevel] = useState("Semua");
  const [filterPromo, setFilterPromo] = useState("Semua");

  // ── Stats
  const stats = useMemo(() => {
    const promoAktif = patients.filter((p) => p.statusPromo === "Aktif").length;
    const avgRating = (() => {
      const rated = patients.filter((p) => p.feedbackReview?.rating);
      if (!rated.length) return 0;
      return (rated.reduce((s, p) => s + p.feedbackReview.rating, 0) / rated.length).toFixed(1);
    })();
    return { promoAktif, total: patients.length, avgRating };
  }, [patients]);

  // ── Filter
  const filtered = useMemo(() => {
    return patients.filter((p) => {
      const matchSearch = p.nama.toLowerCase().includes(search.toLowerCase()) ||
        p.id.toLowerCase().includes(search.toLowerCase());
      const matchLevel = filterLevel === "Semua" || p.levelMembership === filterLevel;
      const matchPromo = filterPromo === "Semua" || p.statusPromo === filterPromo;
      return matchSearch && matchLevel && matchPromo;
    });
  }, [patients, search, filterLevel, filterPromo]);

  return (
    <div className="flex flex-col gap-6 pb-10">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-gray-800">CRM Pasien</h1>
        <p className="text-sm text-gray-400 mt-1">
          Overview engagement, level membership, dan status promo seluruh pasien.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard icon={<FaUsers />}         label="Total Pasien"    value={stats.total}      color="teal"   />
        <StatCard icon={<MdOutlineLoyalty />} label="Promo Aktif"    value={stats.promoAktif} color="blue"   />
        <StatCard icon={<FaStar />}           label="Avg. Rating"    value={`${stats.avgRating} ★`} color="purple" />
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-48">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            placeholder="Cari nama / ID pasien..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F766E]/30 focus:border-[#0F766E]"
          />
        </div>
        <div className="flex items-center gap-2">
          <FaFilter className="text-gray-400 text-xs" />
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            className="border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-600 focus:outline-none"
          >
            {["Semua", "Platinum", "Gold", "Silver", "Bronze"].map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
          <select
            value={filterPromo}
            onChange={(e) => setFilterPromo(e.target.value)}
            className="border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-600 focus:outline-none"
          >
            {["Semua", "Aktif", "Tidak Aktif"].map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
        </div>
        <span className="text-xs text-gray-400 ml-auto">{filtered.length} pasien ditemukan</span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/60">
                <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider py-3 px-4">Pasien</th>
                <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider py-3 px-4">Level</th>
                <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider py-3 px-4">Sumber</th>
                <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider py-3 px-4">Promo</th>
                <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider py-3 px-4">Rating</th>
                <th className="py-3 px-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={p.nama} size="sm" color="bg-[#E8F8F6] text-[#0F766E]" />
                      <div>
                        <p className="font-semibold text-gray-800">{p.nama}</p>
                        <p className="text-xs text-gray-400 font-mono">{p.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${LEVEL_COLOR[p.levelMembership] || "bg-gray-100 text-gray-500"}`}>
                      {p.levelMembership || "-"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-500 text-xs">{p.sumberUser || "-"}</td>
                  <td className="py-3 px-4">
                    <Badge variant={PROMO_BADGE[p.statusPromo] || "default"} dot size="sm">
                      {p.statusPromo || "-"}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    {p.feedbackReview
                      ? <StarRating value={p.feedbackReview.rating} />
                      : <span className="text-xs text-gray-300 italic">-</span>}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => navigate(`/pasien/${p.id}`)}
                      className="flex items-center gap-1 text-xs font-semibold text-[#0F766E] hover:underline"
                    >
                      Detail <FaExternalLinkAlt className="text-[10px]" />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-16 text-center text-sm text-gray-400 italic">
                    Tidak ada pasien ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
