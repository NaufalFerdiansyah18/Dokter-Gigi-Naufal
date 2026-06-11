import { useClinic } from "../../context/ClinicContext";
import { FaCalendarAlt, FaPhone, FaEnvelope } from "react-icons/fa";

const STATUS_STYLE = {
  Active:   "bg-green-50 text-green-700 border-green-200",
  Inactive: "bg-gray-100 text-gray-500 border-gray-200",
};

export default function GuestDokter() {
  const { doctors } = useClinic();

  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-r from-[#0F766E] to-[#14B8A6] text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-extrabold mb-3">Jadwal Dokter</h1>
        <p className="text-white/80 max-w-xl mx-auto">
          Tim dokter spesialis kami siap memberikan perawatan terbaik untukmu.
        </p>
      </div>

      {/* Dokter cards */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((d) => (
            <div key={d.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
              {/* Header card */}
              <div className="bg-gradient-to-br from-[#0F766E] to-[#14B8A6] p-6 text-center text-white">
                <div className="w-20 h-20 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center mx-auto mb-3 text-3xl font-extrabold">
                  {d.nama.replace("drg. ", "").charAt(0)}
                </div>
                <h3 className="font-extrabold text-lg">{d.nama}</h3>
                <p className="text-white/80 text-sm mt-1">{d.spesialis}</p>
                <span className={`inline-block mt-2 text-xs font-bold px-3 py-1 rounded-full border ${STATUS_STYLE[d.status]}`}>
                  {d.status === "Active" ? "Praktik Aktif" : "Tidak Aktif"}
                </span>
              </div>

              <div className="p-5">
                {/* Jadwal */}
                <div className="flex items-center gap-2 mb-4">
                  <FaCalendarAlt className="text-[#0F766E] shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400">Jadwal Praktik</p>
                    <p className="text-sm font-bold text-gray-800">{d.jadwal}</p>
                  </div>
                </div>

                {/* Keahlian */}
                <div className="mb-4">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Keahlian</p>
                  <div className="flex flex-wrap gap-1.5">
                    {d.keahlian?.map((k) => (
                      <span key={k} className="text-[11px] bg-[#E8F8F6] text-[#0F766E] px-2.5 py-0.5 rounded-full font-medium">
                        {k}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pendidikan */}
                <div className="mb-4">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Pendidikan</p>
                  {d.pendidikan?.map((p, i) => (
                    <div key={i} className="flex gap-2 mb-1.5">
                      <span className="text-xs text-[#0F766E] font-mono font-bold shrink-0">{p.tahun}</span>
                      <div>
                        <p className="text-xs font-semibold text-gray-700">{p.gelar}</p>
                        <p className="text-[11px] text-gray-400">{p.institusi}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Kontak */}
                <div className="pt-3 border-t border-gray-100 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <FaPhone className="text-[#0F766E] text-[10px]" /> {d.noHp}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <FaEnvelope className="text-[#0F766E] text-[10px]" /> {d.email}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
