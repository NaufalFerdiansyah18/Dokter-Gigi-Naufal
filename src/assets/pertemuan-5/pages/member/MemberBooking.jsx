import { useState } from "react";
import { FaCalendarAlt, FaClock, FaUserMd, FaTooth } from "react-icons/fa";

const doctors = [
  { id: 1, name: "Dr. Sarah Putri", specialty: "Orthodonti", avatar: "girl" },
  { id: 2, name: "Dr. Ahmad Fauzi", specialty: "Bedah Mulut", avatar: "boy" },
  { id: 3, name: "Dr. Lisa Amelia", specialty: "Estetika Gigi", avatar: "girl" },
];

const services = [
  "Scaling & Pembersihan",
  "Tambal Gigi",
  "Cabut Gigi",
  "Pemasangan Behel",
  "Whitening",
  "Veneer",
  "Implan Gigi",
];

const timeSlots = [
  "08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"
];

export default function MemberBooking() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: "",
    doctor: "",
    date: "",
    time: "",
    notes: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Booking berhasil! Anda akan menerima konfirmasi via email.");
    // Reset form
    setFormData({ service: "", doctor: "", date: "", time: "", notes: "" });
    setStep(1);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Booking Janji Temu</h1>
      <p className="text-gray-500 mb-8">Pilih layanan, dokter, dan waktu konsultasi Anda</p>

      {/* Progress Steps */}
      <div className="mb-8 flex items-center justify-center gap-4">
        {[1, 2, 3].map((num) => (
          <div key={num} className="flex items-center gap-2">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step >= num ? "bg-[#0F766E] text-white" : "bg-gray-200 text-gray-400"
              }`}
            >
              {num}
            </div>
            {num < 3 && (
              <div className={`w-12 h-1 ${step > num ? "bg-[#0F766E]" : "bg-gray-200"}`} />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        {/* Step 1: Pilih Layanan */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Pilih Layanan</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {services.map((service) => (
                  <button
                    key={service}
                    type="button"
                    onClick={() => setFormData({ ...formData, service })}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      formData.service === service
                        ? "border-[#0F766E] bg-[#E8F8F6]"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <FaTooth className="text-[#0F766E] mb-2" />
                    <p className="font-semibold text-gray-900">{service}</p>
                  </button>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setStep(2)}
              disabled={!formData.service}
              className="w-full bg-[#0F766E] text-white font-semibold py-3 rounded-xl hover:bg-[#0A5E58] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Lanjutkan
            </button>
          </div>
        )}

        {/* Step 2: Pilih Dokter & Tanggal */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Pilih Dokter</label>
              <div className="grid grid-cols-1 gap-3">
                {doctors.map((doctor) => (
                  <button
                    key={doctor.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, doctor: doctor.name })}
                    className={`p-4 rounded-xl border-2 flex items-center gap-4 transition-all ${
                      formData.doctor === doctor.name
                        ? "border-[#0F766E] bg-[#E8F8F6]"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={`https://avatar.iran.liara.run/public/${doctor.avatar}?username=${doctor.name}`}
                      className="w-12 h-12 rounded-full"
                      alt={doctor.name}
                    />
                    <div className="text-left">
                      <p className="font-semibold text-gray-900">{doctor.name}</p>
                      <p className="text-sm text-gray-500">{doctor.specialty}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Pilih Tanggal</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                min={new Date().toISOString().split("T")[0]}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] outline-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 bg-gray-100 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-200 transition-colors"
              >
                Kembali
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                disabled={!formData.doctor || !formData.date}
                className="flex-1 bg-[#0F766E] text-white font-semibold py-3 rounded-xl hover:bg-[#0A5E58] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Lanjutkan
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Pilih Waktu & Konfirmasi */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Pilih Waktu</label>
              <div className="grid grid-cols-4 gap-3">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setFormData({ ...formData, time })}
                    className={`p-3 rounded-xl border-2 font-semibold transition-all ${
                      formData.time === time
                        ? "border-[#0F766E] bg-[#E8F8F6] text-[#0F766E]"
                        : "border-gray-200 hover:border-gray-300 text-gray-700"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Catatan (Opsional)</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                placeholder="Keluhan atau catatan khusus..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] outline-none resize-none"
              />
            </div>

            {/* Summary */}
            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
              <p className="font-bold text-gray-900 mb-3">Ringkasan Booking:</p>
              <div className="flex items-center gap-2 text-sm">
                <FaTooth className="text-[#0F766E]" />
                <span className="text-gray-600">Layanan:</span>
                <span className="font-semibold text-gray-900">{formData.service}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FaUserMd className="text-[#0F766E]" />
                <span className="text-gray-600">Dokter:</span>
                <span className="font-semibold text-gray-900">{formData.doctor}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FaCalendarAlt className="text-[#0F766E]" />
                <span className="text-gray-600">Tanggal:</span>
                <span className="font-semibold text-gray-900">{formData.date}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FaClock className="text-[#0F766E]" />
                <span className="text-gray-600">Waktu:</span>
                <span className="font-semibold text-gray-900">{formData.time} WIB</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex-1 bg-gray-100 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-200 transition-colors"
              >
                Kembali
              </button>
              <button
                type="submit"
                disabled={!formData.time}
                className="flex-1 bg-[#0F766E] text-white font-semibold py-3 rounded-xl hover:bg-[#0A5E58] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Konfirmasi Booking
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
