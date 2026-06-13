import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useClinic } from "../../context/ClinicContext";
import {
  FaBullhorn, FaSearch, FaFilter, FaExternalLinkAlt,
  FaPlus, FaTrash, FaTimes,
  FaUsers,
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

const WARNA_OPTIONS = [
  { label: "Teal",   value: "from-teal-500 to-teal-700" },
  { label: "Orange", value: "from-orange-400 to-orange-600" },
  { label: "Blue",   value: "from-blue-500 to-blue-700" },
  { label: "Yellow", value: "from-yellow-400 to-yellow-600" },
  { label: "Green",  value: "from-green-500 to-green-700" },
  { label: "Purple", value: "from-purple-500 to-purple-700" },
  { label: "Red",    value: "from-red-500 to-red-700" },
];

function StatCard({ icon, label, value, color = "teal" }) {
  const colors = {
    teal:   "bg-[#E8F8F6] text-[#0F766E]",
    orange: "bg-orange-50 text-orange-600",
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

const EMPTY_FORM = {
  judul: "", deskripsi: "", badge: "", icon: "🎁",
  warna: "from-teal-500 to-teal-700",
  berlakuHingga: "", status: "Aktif",
  targetMembership: ["Semua"],
  syarat: [""],
};

export default function CampaignPromo() {
  const { patients, campaigns, setCampaigns } = useClinic();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [filterLevel, setFilterLevel] = useState("Semua");
  const [filterPromo, setFilterPromo] = useState("Semua");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  // ── Stats
  const stats = useMemo(() => {
    const promoAktif = patients.filter((p) => p.statusPromo === "Aktif").length;
    const allCampaigns = patients.flatMap((p) => p.campaignDiikuti || []);
    const uniqueCampaigns = [...new Set(allCampaigns)];
    const ikutCampaign = patients.filter((p) => p.campaignDiikuti?.length > 0).length;
    return { promoAktif, totalCampaign: uniqueCampaigns.length, ikutCampaign };
  }, [patients]);

  // ── Filter pasien
  const filtered = useMemo(() => {
    return patients.filter((p) => {
      const matchSearch = p.nama.toLowerCase().includes(search.toLowerCase()) ||
        p.id.toLowerCase().includes(search.toLowerCase());
      const matchLevel = filterLevel === "Semua" || p.levelMembership === filterLevel;
      const matchPromo = filterPromo === "Semua" || p.statusPromo === filterPromo;
      return matchSearch && matchLevel && matchPromo;
    });
  }, [patients, search, filterLevel, filterPromo]);

  // ── Handle form
  const handleAddCampaign = (e) => {
    e.preventDefault();
    const newCampaign = {
      ...form,
      id: `CP-${Date.now()}`,
      syarat: form.syarat.filter((s) => s.trim()),
    };
    setCampaigns([...campaigns, newCampaign]);
    setForm(EMPTY_FORM);
    setShowModal(false);
  };

  const handleDeleteCampaign = (id) => {
    setCampaigns(campaigns.filter((c) => c.id !== id));
  };

  const toggleTarget = (level) => {
    if (level === "Semua") {
      setForm({ ...form, targetMembership: ["Semua"] });
    } else {
      const current = form.targetMembership.filter((t) => t !== "Semua");
      const exists = current.includes(level);
      setForm({ ...form, targetMembership: exists ? current.filter((t) => t !== level) : [...current, level] });
    }
  };

  return (
    <div className="flex flex-col w-full pb-10 min-h-screen bg-gray-50/30">

      {/* Banner */}
      <div className="relative bg-gradient-to-r from-[#1A7C6E] to-[#2BB5A0] rounded-3xl px-8 pt-10 pb-24 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl translate-y-1/2" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Campaign & Promo</h1>
            <p className="text-white/80 text-sm max-w-lg">
              Kelola dan pantau campaign yang aktif di halaman guest.
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors flex items-center gap-2 w-fit"
          >
            <FaPlus /> Tambah Campaign
          </button>
        </div>
      </div>

      <div className="relative -mt-14 z-20 flex flex-col gap-6">

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard icon={<MdOutlineLoyalty />} label="Pasien Promo Aktif"   value={stats.promoAktif}    color="teal"   />
        <StatCard icon={<FaBullhorn />}       label="Campaign Aktif"       value={campaigns.filter(c => c.status === "Aktif").length} color="orange" />
        <StatCard icon={<FaUsers />}          label="Pasien Ikut Campaign" value={stats.ikutCampaign}  color="blue"   />
      </div>

      {/* Campaign list admin */}
      <div>
        <h2 className="text-base font-bold text-gray-700 mb-3">Campaign yang Tayang di Halaman Guest</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {campaigns.map((c) => (
            <div key={c.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className={`bg-gradient-to-r ${c.warna} px-4 py-3 text-white flex items-center justify-between`}>
                <div className="flex items-center gap-2">
                  <span className="text-xl">{c.icon}</span>
                  <span className="font-bold text-sm truncate">{c.judul}</span>
                </div>
                <button onClick={() => handleDeleteCampaign(c.id)} className="text-white/70 hover:text-white transition-colors">
                  <FaTrash className="text-xs" />
                </button>
              </div>
              <div className="px-4 py-3">
                <p className="text-xs text-gray-500 mb-2 line-clamp-2">{c.deskripsi}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-bold px-2 py-0.5 rounded-full ${c.status === "Aktif" ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500"}`}>
                    {c.status}
                  </span>
                  <span className="text-gray-400">Hingga {new Date(c.berlakuHingga).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</span>
                </div>
              </div>
            </div>
          ))}
          {campaigns.length === 0 && (
            <div className="col-span-3 py-10 text-center text-gray-400 border-2 border-dashed border-gray-200 rounded-2xl">
              <FaBullhorn className="mx-auto text-3xl mb-2 text-gray-300" />
              <p className="text-sm">Belum ada campaign. Klik "Tambah Campaign" untuk membuat.</p>
            </div>
          )}
        </div>
      </div>

      {/* Filter Bar pasien */}
      <div>
        <h2 className="text-base font-bold text-gray-700 mb-3">Data Pasien & Status Promo</h2>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-wrap gap-3 items-center mb-4">
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
            <select value={filterLevel} onChange={(e) => setFilterLevel(e.target.value)} className="border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-600 focus:outline-none">
              {["Semua", "Platinum", "Gold", "Silver", "Bronze"].map((l) => <option key={l}>{l}</option>)}
            </select>
            <select value={filterPromo} onChange={(e) => setFilterPromo(e.target.value)} className="border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-600 focus:outline-none">
              {["Semua", "Aktif", "Tidak Aktif"].map((l) => <option key={l}>{l}</option>)}
            </select>
          </div>
          <span className="text-xs text-gray-400 ml-auto">{filtered.length} pasien</span>
        </div>

        {/* List pasien */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-50">
            {filtered.map((p) => (
              <div key={p.id} className="flex items-start gap-4 p-4 hover:bg-gray-50/60 transition-colors">
                <Avatar name={p.nama} size="sm" color="bg-[#E8F8F6] text-[#0F766E]" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <p className="font-semibold text-gray-800 text-sm">{p.nama}</p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${LEVEL_COLOR[p.levelMembership] || "bg-gray-100 text-gray-500"}`}>
                      {p.levelMembership}
                    </span>
                    <Badge variant={PROMO_BADGE[p.statusPromo] || "default"} size="sm" dot>{p.statusPromo}</Badge>
                  </div>
                  <p className="text-xs text-gray-400 mb-2">Sumber: <span className="font-medium text-gray-500">{p.sumberUser || "-"}</span></p>
                  {p.campaignDiikuti?.length ? (
                    <div className="flex flex-wrap gap-1.5">
                      {p.campaignDiikuti.map((c, i) => (
                        <span key={i} className="text-[11px] bg-orange-50 text-orange-600 border border-orange-200 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                          <FaBullhorn className="text-[9px]" />{c}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-gray-300 italic">Tidak ikut campaign apapun</p>
                  )}
                </div>
                <button
                  onClick={() => navigate(`/pasien/${p.id}`, { state: { tab: "engagement" } })}
                  className="flex items-center gap-1 text-xs font-semibold text-[#0F766E] hover:underline shrink-0 mt-1"
                >
                  Detail <FaExternalLinkAlt className="text-[10px]" />
                </button>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="py-16 text-center">
                <FaBullhorn className="mx-auto text-4xl text-gray-200 mb-3" />
                <p className="text-sm text-gray-400">Tidak ada pasien ditemukan.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>

      {/* Modal tambah campaign */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h3 className="font-extrabold text-gray-800">Tambah Campaign Baru</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><FaTimes /></button>
            </div>
            <form onSubmit={handleAddCampaign} className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">Judul Campaign *</label>
                  <input required value={form.judul} onChange={(e) => setForm({ ...form, judul: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F766E]/30" placeholder="Nama campaign..." />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">Badge Label *</label>
                  <input required value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F766E]/30" placeholder="Diskon 20%, Gratis..." />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">Icon (emoji)</label>
                  <input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none" placeholder="🎁" />
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">Deskripsi *</label>
                  <textarea required rows={3} value={form.deskripsi} onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#0F766E]/30" placeholder="Deskripsi promo..." />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">Warna Kartu</label>
                  <select value={form.warna} onChange={(e) => setForm({ ...form, warna: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none">
                    {WARNA_OPTIONS.map((w) => <option key={w.value} value={w.value}>{w.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">Berlaku Hingga *</label>
                  <input required type="date" value={form.berlakuHingga} onChange={(e) => setForm({ ...form, berlakuHingga: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none" />
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-semibold text-gray-600 mb-2 block">Target Membership</label>
                  <div className="flex flex-wrap gap-2">
                    {["Semua", "Platinum", "Gold", "Silver", "Bronze"].map((m) => (
                      <button type="button" key={m} onClick={() => toggleTarget(m)}
                        style={form.targetMembership.includes(m) ? { backgroundColor: "#0F766E", color: "white" } : {}}
                        className={`px-3 py-1 rounded-xl text-xs font-semibold border transition-colors ${form.targetMembership.includes(m) ? "border-[#0F766E]" : "bg-white border-gray-200 text-gray-600"}`}>
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-semibold text-gray-600 mb-2 block">Syarat & Ketentuan</label>
                  <div className="space-y-2">
                    {form.syarat.map((s, i) => (
                      <div key={i} className="flex gap-2">
                        <input value={s} onChange={(e) => {
                          const updated = [...form.syarat]; updated[i] = e.target.value;
                          setForm({ ...form, syarat: updated });
                        }} className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none" placeholder={`Syarat ${i + 1}...`} />
                        {form.syarat.length > 1 && (
                          <button type="button" onClick={() => setForm({ ...form, syarat: form.syarat.filter((_, idx) => idx !== i) })}
                            className="text-red-400 hover:text-red-600"><FaTimes /></button>
                        )}
                      </div>
                    ))}
                    <button type="button" onClick={() => setForm({ ...form, syarat: [...form.syarat, ""] })}
                      className="text-xs text-[#0F766E] font-semibold hover:underline">+ Tambah Syarat</button>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)}
                  className="flex-1 border border-gray-200 text-gray-600 font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-sm">
                  Batal
                </button>
                <button type="submit"
                  className="flex-1 bg-[#0F766E] hover:bg-[#0A5E58] text-white font-bold py-2.5 rounded-xl transition-colors text-sm">
                  Simpan Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


