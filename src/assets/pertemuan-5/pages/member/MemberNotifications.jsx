import { useState, useEffect } from "react";
import { supabase } from "../../../../services/supabaseClient";
import { FaWhatsapp, FaEnvelope, FaBell, FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";

const notificationTypes = {
  booking_confirmed: { icon: <FaCheckCircle />, color: "green", label: "Booking Dikonfirmasi" },
  booking_reminder: { icon: <FaClock />, color: "blue", label: "Reminder Jadwal" },
  payment_success: { icon: <FaCheckCircle />, color: "green", label: "Pembayaran Berhasil" },
  payment_pending: { icon: <FaClock />, color: "yellow", label: "Menunggu Pembayaran" },
  promo_blast: { icon: <FaBell />, color: "purple", label: "Promo Terbaru" },
  appointment_cancelled: { icon: <FaTimesCircle />, color: "red", label: "Appointment Dibatalkan" },
};

// Mock data - nanti diganti dengan data dari database
const mockNotifications = [
  {
    id: 1,
    type: "booking_confirmed",
    channel: "whatsapp",
    title: "Booking Berhasil Dikonfirmasi",
    message: "Halo! Booking Anda untuk Scaling Gigi dengan Dr. Sarah pada 25 Jan 2025, 10:00 WIB telah dikonfirmasi. Lihat detail: bit.ly/abc123",
    sentAt: "2025-01-20 14:30",
    status: "sent",
    recipient: "+628123456789",
  },
  {
    id: 2,
    type: "payment_success",
    channel: "email",
    title: "Pembayaran Berhasil - Invoice #INV-2025-001",
    message: "Terima kasih! Pembayaran Anda sebesar Rp 250.000 telah kami terima. Invoice terlampir.",
    sentAt: "2025-01-20 15:00",
    status: "sent",
    recipient: "user@example.com",
  },
  {
    id: 3,
    type: "booking_reminder",
    channel: "whatsapp",
    title: "Reminder: Jadwal Besok",
    message: "Halo! Mengingatkan jadwal konsultasi Anda besok (25 Jan 2025) jam 10:00 WIB dengan Dr. Sarah. Jangan lupa ya!",
    sentAt: "2025-01-24 09:00",
    status: "scheduled",
    recipient: "+628123456789",
  },
  {
    id: 4,
    type: "promo_blast",
    channel: "email",
    title: "🎉 Promo Whitening Gigi - Diskon 30%!",
    message: "Dapatkan diskon 30% untuk whitening gigi selama bulan Januari. Booking sekarang!",
    sentAt: "2025-01-15 10:00",
    status: "sent",
    recipient: "user@example.com",
  },
];

export default function MemberNotifications() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState("all");
  const [stats, setStats] = useState({
    total: 0,
    whatsapp: 0,
    email: 0,
    sent: 0,
  });

  useEffect(() => {
    // Hitung statistik
    setStats({
      total: notifications.length,
      whatsapp: notifications.filter((n) => n.channel === "whatsapp").length,
      email: notifications.filter((n) => n.channel === "email").length,
      sent: notifications.filter((n) => n.status === "sent").length,
    });
  }, [notifications]);

  const filtered = notifications.filter((n) => {
    if (filter === "all") return true;
    if (filter === "whatsapp") return n.channel === "whatsapp";
    if (filter === "email") return n.channel === "email";
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Notification Center</h1>
        <p className="text-gray-500">Riwayat notifikasi WhatsApp & Email yang dikirim ke Anda</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 mb-1">Total Notifikasi</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <FaBell />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 mb-1">WhatsApp</p>
              <p className="text-2xl font-bold text-gray-900">{stats.whatsapp}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
              <FaWhatsapp />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 mb-1">Email</p>
              <p className="text-2xl font-bold text-gray-900">{stats.email}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
              <FaEnvelope />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 mb-1">Terkirim</p>
              <p className="text-2xl font-bold text-gray-900">{stats.sent}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
              <FaCheckCircle />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
            filter === "all" ? "bg-[#0F766E] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Semua
        </button>
        <button
          onClick={() => setFilter("whatsapp")}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${
            filter === "whatsapp" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          <FaWhatsapp /> WhatsApp
        </button>
        <button
          onClick={() => setFilter("email")}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${
            filter === "email" ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          <FaEnvelope /> Email
        </button>
      </div>

      {/* Notification List */}
      <div className="space-y-3">
        {filtered.map((notif) => {
          const typeConfig = notificationTypes[notif.type];
          return (
            <div key={notif.id} className="bg-white rounded-xl p-5 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-${typeConfig.color}-100 text-${typeConfig.color}-600 flex items-center justify-center text-xl shrink-0`}>
                  {typeConfig.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <h3 className="font-bold text-gray-900">{notif.title}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">{typeConfig.label}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {notif.channel === "whatsapp" ? (
                        <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                          <FaWhatsapp /> WA
                        </span>
                      ) : (
                        <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                          <FaEnvelope /> Email
                        </span>
                      )}
                      <span
                        className={`text-xs font-bold px-2 py-1 rounded-full ${
                          notif.status === "sent"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {notif.status === "sent" ? "Terkirim" : "Terjadwal"}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-3">{notif.message}</p>

                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span>📅 {notif.sentAt}</span>
                    <span>📱 {notif.recipient}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center border border-gray-100">
          <FaBell className="text-5xl text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Belum ada notifikasi untuk filter ini</p>
        </div>
      )}

      {/* Info Banner */}
      <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
        <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
          <FaBell className="text-blue-600" />
          Tentang Service Automation
        </h3>
        <p className="text-sm text-blue-800">
          Kami secara otomatis mengirimkan notifikasi via WhatsApp & Email untuk:
        </p>
        <ul className="text-sm text-blue-800 mt-2 space-y-1 list-disc list-inside">
          <li>Konfirmasi booking appointment</li>
          <li>Reminder jadwal konsultasi (H-1)</li>
          <li>Konfirmasi pembayaran & invoice</li>
          <li>Promo & campaign eksklusif</li>
          <li>Pengingat kontrol rutin</li>
        </ul>
      </div>
    </div>
  );
}
