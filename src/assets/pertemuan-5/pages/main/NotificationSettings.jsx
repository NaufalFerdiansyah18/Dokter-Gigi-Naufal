import { useState } from "react";
import { FaBell, FaWhatsapp, FaEnvelope, FaToggleOn, FaToggleOff, FaSave, FaCog } from "react-icons/fa";
import { NotificationConfig } from "../../../../services/notificationService";

export default function NotificationSettings() {
  const [config, setConfig] = useState({
    whatsapp: {
      enabled: NotificationConfig.whatsapp.enabled,
      apiUrl: NotificationConfig.whatsapp.apiUrl,
      apiKey: NotificationConfig.whatsapp.apiKey || "",
    },
    email: {
      enabled: NotificationConfig.email.enabled,
      serviceId: NotificationConfig.email.serviceId || "",
      templateId: NotificationConfig.email.templateId || "",
      publicKey: NotificationConfig.email.publicKey || "",
    },
    autoNotifications: {
      bookingConfirmation: true,
      reminderKontrol: true,
      promoNew: true,
      transactionSuccess: true,
      loyaltyReward: true,
    },
  });

  const [saved, setSaved] = useState(false);

  const handleToggle = (service, field) => {
    setConfig({
      ...config,
      [service]: {
        ...config[service],
        [field]: !config[service][field],
      },
    });
  };

  const handleInputChange = (service, field, value) => {
    setConfig({
      ...config,
      [service]: {
        ...config[service],
        [field]: value,
      },
    });
  };

  const handleSave = () => {
    // Dalam production, simpan ke database atau environment config
    console.log("Notification config saved:", config);
    
    // Update config (untuk demo)
    NotificationConfig.whatsapp.enabled = config.whatsapp.enabled;
    NotificationConfig.whatsapp.apiKey = config.whatsapp.apiKey;
    NotificationConfig.email.enabled = config.email.enabled;
    NotificationConfig.email.serviceId = config.email.serviceId;
    NotificationConfig.email.templateId = config.email.templateId;
    NotificationConfig.email.publicKey = config.email.publicKey;

    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex flex-col w-full pb-10 min-h-screen bg-gray-50/30">
      {/* Banner */}
      <div className="relative bg-gradient-to-r from-[#1A7C6E] to-[#2BB5A0] rounded-3xl px-8 pt-10 pb-24 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <FaBell className="text-4xl" />
            Service Automation & Notifications
          </h1>
          <p className="text-white/80 text-sm max-w-2xl">
            Kelola pengaturan notifikasi otomatis untuk WhatsApp dan Email. Pastikan API credentials telah dikonfigurasi dengan benar.
          </p>
        </div>
      </div>

      <div className="relative -mt-14 z-20 space-y-6">
        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`bg-white rounded-2xl border-2 p-6 ${config.whatsapp.enabled ? "border-green-200 bg-green-50/30" : "border-gray-200"}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${config.whatsapp.enabled ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}>
                  <FaWhatsapp className="text-2xl" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">WhatsApp Notification</h3>
                  <p className="text-xs text-gray-500">Notifikasi via WhatsApp API</p>
                </div>
              </div>
              <button onClick={() => handleToggle("whatsapp", "enabled")}>
                {config.whatsapp.enabled ? (
                  <FaToggleOn className="text-4xl text-green-500" />
                ) : (
                  <FaToggleOff className="text-4xl text-gray-300" />
                )}
              </button>
            </div>
            <div className={`text-sm ${config.whatsapp.enabled ? "text-green-700" : "text-gray-500"}`}>
              Status: <span className="font-bold">{config.whatsapp.enabled ? "✓ Aktif" : "✕ Nonaktif"}</span>
            </div>
          </div>

          <div className={`bg-white rounded-2xl border-2 p-6 ${config.email.enabled ? "border-blue-200 bg-blue-50/30" : "border-gray-200"}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${config.email.enabled ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-400"}`}>
                  <FaEnvelope className="text-2xl" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Email Notification</h3>
                  <p className="text-xs text-gray-500">Notifikasi via Email Service</p>
                </div>
              </div>
              <button onClick={() => handleToggle("email", "enabled")}>
                {config.email.enabled ? (
                  <FaToggleOn className="text-4xl text-blue-500" />
                ) : (
                  <FaToggleOff className="text-4xl text-gray-300" />
                )}
              </button>
            </div>
            <div className={`text-sm ${config.email.enabled ? "text-blue-700" : "text-gray-500"}`}>
              Status: <span className="font-bold">{config.email.enabled ? "✓ Aktif" : "✕ Nonaktif"}</span>
            </div>
          </div>
        </div>

        {/* WhatsApp Configuration */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
            <FaWhatsapp className="text-2xl text-green-500" />
            <div>
              <h3 className="font-bold text-gray-900">WhatsApp API Configuration</h3>
              <p className="text-xs text-gray-500">Setup WhatsApp notification service (Fonnte, Wablas, atau WhatsApp Business API)</p>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">API URL</label>
              <input
                type="text"
                value={config.whatsapp.apiUrl}
                onChange={(e) => handleInputChange("whatsapp", "apiUrl", e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30"
                placeholder="https://api.fonnte.com/send"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">API Key</label>
              <input
                type="password"
                value={config.whatsapp.apiKey}
                onChange={(e) => handleInputChange("whatsapp", "apiKey", e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30"
                placeholder="Your WhatsApp API Key"
              />
              <p className="text-xs text-gray-500 mt-1">
                💡 Dapatkan API key dari provider WhatsApp Anda (Fonnte, Wablas, dll)
              </p>
            </div>
          </div>
        </div>

        {/* Email Configuration */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
            <FaEnvelope className="text-2xl text-blue-500" />
            <div>
              <h3 className="font-bold text-gray-900">Email Service Configuration</h3>
              <p className="text-xs text-gray-500">Setup Email notification (EmailJS, SendGrid, atau SMTP)</p>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Service ID</label>
              <input
                type="text"
                value={config.email.serviceId}
                onChange={(e) => handleInputChange("email", "serviceId", e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                placeholder="service_xxxxxxx"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Template ID</label>
              <input
                type="text"
                value={config.email.templateId}
                onChange={(e) => handleInputChange("email", "templateId", e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                placeholder="template_xxxxxxx"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Public Key</label>
              <input
                type="password"
                value={config.email.publicKey}
                onChange={(e) => handleInputChange("email", "publicKey", e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                placeholder="Your EmailJS Public Key"
              />
              <p className="text-xs text-gray-500 mt-1">
                💡 Dapatkan credentials dari <a href="https://www.emailjs.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">EmailJS Dashboard</a>
              </p>
            </div>
          </div>
        </div>

        {/* Auto Notification Settings */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
            <FaCog className="text-2xl text-purple-500" />
            <div>
              <h3 className="font-bold text-gray-900">Automatic Notification Triggers</h3>
              <p className="text-xs text-gray-500">Pilih kapan notifikasi otomatis akan dikirim</p>
            </div>
          </div>
          <div className="p-6 space-y-3">
            {[
              { key: "bookingConfirmation", label: "Konfirmasi Booking", desc: "Kirim notifikasi saat pasien booking jadwal" },
              { key: "reminderKontrol", label: "Reminder Jadwal Kontrol", desc: "Kirim reminder H-1 sebelum jadwal kontrol" },
              { key: "promoNew", label: "Promo & Campaign Baru", desc: "Notifikasi saat ada promo baru sesuai membership level" },
              { key: "transactionSuccess", label: "Transaksi Berhasil", desc: "Konfirmasi pembayaran dan transaksi berhasil" },
              { key: "loyaltyReward", label: "Loyalty Reward", desc: "Notifikasi saat pasien klaim reward atau voucher" },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm">{item.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                </div>
                <button onClick={() => handleToggle("autoNotifications", item.key)}>
                  {config.autoNotifications[item.key] ? (
                    <FaToggleOn className="text-3xl text-[#0F766E]" />
                  ) : (
                    <FaToggleOff className="text-3xl text-gray-300" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-[#0F766E] hover:bg-[#0A5E58] text-white font-bold px-8 py-3 rounded-xl flex items-center gap-2 transition-colors shadow-lg"
          >
            <FaSave />
            {saved ? "✓ Tersimpan!" : "Simpan Pengaturan"}
          </button>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
          <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
            <FaBell className="text-blue-600" />
            Catatan Penting
          </h4>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• Untuk <strong>mode production</strong>, pastikan Anda mengganti API credentials dengan yang sebenarnya.</li>
            <li>• <strong>WhatsApp</strong>: Gunakan provider seperti Fonnte, Wablas, atau WhatsApp Business API official.</li>
            <li>• <strong>Email</strong>: Bisa menggunakan EmailJS (gratis), SendGrid, atau SMTP server sendiri.</li>
            <li>• Untuk <strong>development</strong>, notifikasi akan tampil di console log sebagai simulasi.</li>
            <li>• Pastikan nomor HP di database pasien dalam format yang benar (62xxx).</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
