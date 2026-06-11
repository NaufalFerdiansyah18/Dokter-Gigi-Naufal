import { useState } from "react";
import { useClinic } from "../../context/ClinicContext";
import { FaExclamationCircle, FaCheckCircle, FaHourglass, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ACTIVE_PATIENT_ID = "PS-001";

const STATUS_STYLE = {
  Pending:       { cls: "bg-yellow-50 text-yellow-700 border-yellow-200", icon: <FaHourglass className="text-yellow-500" /> },
  "In Progress": { cls: "bg-blue-50 text-blue-700 border-blue-200",       icon: <FaExclamationCircle className="text-blue-500" /> },
  Resolved:      { cls: "bg-green-50 text-green-700 border-green-200",    icon: <FaCheckCircle className="text-green-500" /> },
};

export default function GuestKomplain() {
  const { patients, setPatients } = useClinic();
  const patient = patients.find((p) => p.id === ACTIVE_PATIENT_ID);
  const [form, setForm] = useState({ nama: "", email: "", subjek: "", pesan: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.pesan.trim()) return;

    const newKomplain = {
      id: `C-NEW-${Date.now()}`,
      tanggal: new Date().toISOString().split("T")[0],
      isi: form.pesan.trim(),
      status: "Pending",
      prioritas: "Medium",
    };
    if (patient) {
      setPatients(patients.map((p) =>
        p.id === ACTIVE_PATIENT_ID
          ? { ...p, riwayatKomplain: [...(p.riwayatKomplain || []), newKomplain] }
          : p
      ));
    }
    setForm({ nama: "", email: "", subjek: "", pesan: "" });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const komplainList = patient?.riwayatKomplain || [];

  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-r from-[#0F766E] to-[#14B8A6] text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-extrabold mb-3">Hubungi Kami</h1>
        <p className="text-white/80 max-w-xl mx-auto">
          Ada pertanyaan atau masukan? Kami siap membantu Anda.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Form */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Kirim Pesan / Komplain</h2>

          {submitted && (
            <div className="bg-green-50 border border-green-200 rounded-xl px-5 py-4 flex items-center gap-3 text-green-700 font-semibold mb-6">
              <FaCheckCircle className="text-green-500 text-lg shrink-0" />
              Pesan berhasil dikirim! Tim kami akan segera merespons dalam 1×24 jam.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nama Lengkap</label>
                <input
                  type="text"
                  value={form.nama}
                  onChange={(e) => setForm({ ...form, nama: e.target.value })}
                  placeholder="Nama kamu"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F766E]/30 focus:border-[#0F766E] bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="email@contoh.com"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F766E]/30 focus:border-[#0F766E] bg-gray-50"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Subjek</label>
              <input
                type="text"
                value={form.subjek}
                onChange={(e) => setForm({ ...form, subjek: e.target.value })}
                placeholder="Topik pesan kamu"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F766E]/30 focus:border-[#0F766E] bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Pesan / Komplain <span className="text-red-500">*</span></label>
              <textarea
                rows={5}
                value={form.pesan}
                onChange={(e) => setForm({ ...form, pesan: e.target.value })}
                placeholder="Ceritakan pertanyaan atau keluhan kamu..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F766E]/30 focus:border-[#0F766E] bg-gray-50 resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={!form.pesan.trim()}
              className="btn-kirim-pesan bg-[#0F766E] hover:bg-[#0A5E58] disabled:bg-gray-300 disabled:cursor-not-allowed font-bold px-8 py-3 rounded-xl transition-colors"
            >
              Kirim Pesan
            </button>
          </form>

          {/* Riwayat komplain */}
          {komplainList.length > 0 && (
            <div className="mt-10">
              <h3 className="font-extrabold text-gray-900 mb-4">Riwayat Komplain Saya</h3>
              <div className="space-y-3">
                {[...komplainList].reverse().map((k, i) => {
                  const s = STATUS_STYLE[k.status] || STATUS_STYLE["Pending"];
                  return (
                    <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border ${s.cls}`}>
                          {s.icon} {k.status}
                        </span>
                        <span className="text-xs text-gray-400 font-mono">{k.tanggal}</span>
                      </div>
                      <p className="text-sm text-gray-700">{k.isi}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Info kontak */}
        <div className="space-y-5">
          <h2 className="text-2xl font-extrabold text-gray-900">Informasi Kontak</h2>
          {[
            { icon: <FaMapMarkerAlt className="text-[#0F766E]" />, label: "Alamat",       value: "Jl. Sudirman No. 12, Pekanbaru, Riau" },
            { icon: <FaPhoneAlt className="text-[#0F766E]" />,    label: "Telepon",      value: "0761-123456" },
            { icon: <FaEnvelope className="text-[#0F766E]" />,    label: "Email",        value: "info@nopallui.com" },
          ].map((c) => (
            <div key={c.label} className="flex items-start gap-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <div className="w-10 h-10 rounded-xl bg-[#E8F8F6] flex items-center justify-center text-lg shrink-0">
                {c.icon}
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">{c.label}</p>
                <p className="text-sm font-semibold text-gray-800">{c.value}</p>
              </div>
            </div>
          ))}

          <div className="bg-[#0F766E] text-white rounded-2xl p-5">
            <p className="font-bold mb-2">Jam Operasional</p>
            <div className="space-y-1 text-sm text-white/80">
              <p>Senin – Jumat: 08:00 – 17:00</p>
              <p>Sabtu: 08:00 – 14:00</p>
              <p>Minggu & Libur: Tutup</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
