import { Link } from "react-router-dom";
import { useClinic } from "../../context/ClinicContext";
import {
  FaArrowRight, FaCheckCircle, FaStar, FaTooth,
  FaUserMd, FaCalendarAlt, FaPhoneAlt,
} from "react-icons/fa";

const SERVICES = [
  {
    title: "Scaling Gigi",
    sub: "Pembersihan karang gigi",
    img: "https://images.unsplash.com/photo-1588776814546-1ffbb172d436?w=400&q=80",
    color: "from-teal-500/80",
  },
  {
    title: "Tambal Gigi",
    sub: "Komposit & Amalgam",
    img: "https://images.unsplash.com/photo-1629909615184-74f495363b67?w=400&q=80",
    color: "from-blue-500/80",
  },
  {
    title: "Pemasangan Behel",
    sub: "Metal & Ceramic",
    img: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=400&q=80",
    color: "from-purple-500/80",
  },
  {
    title: "Whitening Gigi",
    sub: "Laser & Bleaching",
    img: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&q=80",
    color: "from-pink-500/80",
  },
  {
    title: "Veneer Gigi",
    sub: "Estetika & Smile Design",
    img: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=400&q=80",
    color: "from-orange-500/80",
  },
  {
    title: "Cabut Gigi",
    sub: "Umum & Bedah Minor",
    img: "https://images.unsplash.com/photo-1643833497740-6e9e9b7da53c?w=400&q=80",
    color: "from-red-500/80",
  },
];

const STATS = [
  { value: "5000+", label: "Pasien Puas" },
  { value: "8+",    label: "Tahun Berpengalaman" },
  { value: "3",     label: "Dokter Spesialis" },
  { value: "15+",   label: "Jenis Layanan" },
];

const TESTIMONIALS = [
  { name: "Andi Pratama",   rating: 5, text: "Pelayanan sangat baik dan ramah! Scaling gigi jadi terasa nyaman.",        level: "Gold" },
  { name: "Budi Santoso",   rating: 5, text: "Hasilnya luar biasa, gigi jadi putih bersih setelah whitening laser.",     level: "Platinum" },
  { name: "Rizky Firmansyah", rating: 5, text: "Behel terpasang rapi, dokternya berpengalaman dan sabar.",              level: "Silver" },
  { name: "Maya Anggraini",  rating: 4, text: "Veneer hasilnya natural dan cantik! Sangat puas dengan hasilnya.",       level: "Gold" },
];

export default function GuestBeranda() {
  const { doctors } = useClinic();
  const activeDoctors = doctors.filter((d) => d.status === "Active");

  return (
    <div>

      {/* ── HERO SECTION ── */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-[#0F766E]">

        {/* Dekorasi lingkaran pojok kanan atas */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="absolute top-10 right-32 w-16 h-16 bg-white/10 rounded-full pointer-events-none" />

        {/* Dekorasi lingkaran kiri bawah */}
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />

        {/* Dekorasi bintang / spark */}
        <div className="absolute top-16 left-12 text-white text-4xl font-black pointer-events-none select-none opacity-30">✦</div>
        <div className="absolute bottom-24 left-1/3 text-white text-2xl font-black pointer-events-none select-none opacity-20">✦</div>

        {/* Dekorasi garis border rounded */}
        <div className="absolute inset-4 border-[3px] border-white/20 rounded-[2.5rem] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-8 py-16 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

            {/* Kiri: Teks */}
            <div>
              <p className="text-white/80 font-bold text-sm uppercase tracking-widest mb-4">
                Nopall UI Dental Clinic
              </p>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-5">
                Excellence in<br />
                <span className="text-[#A7F3D0]">Dental Care</span>
              </h1>
              <p className="text-white/80 text-base leading-relaxed mb-3">
                Klinik gigi modern di Pekanbaru, memberikan perawatan gigi terbaik yang disesuaikan untuk memenuhi kebutuhan unik setiap pasien.
              </p>
              <p className="text-white/70 text-sm font-medium mb-7 italic">
                *Promo konsultasi gratis untuk pasien baru
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/guest/layanan"
                  className="bg-white hover:bg-gray-100 text-[#0F766E] font-bold px-7 py-3 rounded-xl flex items-center gap-2 transition-colors shadow-md"
                >
                  Lihat Layanan <FaArrowRight className="text-sm" />
                </Link>
                <Link
                  to="/guest/dokter"
                  className="bg-white/20 hover:bg-white/30 text-white font-bold px-7 py-3 rounded-xl border border-white/30 transition-colors"
                >
                  Jadwal Dokter
                </Link>
              </div>
            </div>

            {/* Kanan: Foto */}
            <div className="relative flex justify-center md:justify-end">
              {/* Blob dekoratif di belakang foto */}
              <div className="absolute inset-0 bg-white/10 rounded-[3rem] scale-95 blur-sm pointer-events-none" />
              <img
                src="/img/7636.jpg"
                alt="Dental Care"
                className="relative z-10 w-full max-w-md md:max-w-lg object-cover rounded-3xl shadow-xl"
              />
            </div>

          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-[#0F766E] text-white py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-extrabold">{s.value}</p>
                <p className="text-sm text-white/70 font-medium mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LAYANAN ── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <p className="text-[#0F766E] font-bold text-sm uppercase tracking-widest mb-2">Apa yang kami tawarkan</p>
          <h2 className="text-4xl font-extrabold text-gray-900">
            Makin Pede dengan<br />
            <span className="text-[#0F766E]">Perawatan Gigi</span>
          </h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            Berbagai layanan perawatan gigi profesional dengan teknologi modern dan dokter berpengalaman.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={s.img}
                  alt={s.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className={`absolute inset-0 bg-gradient-to-t ${s.color} to-transparent flex flex-col justify-end p-5`}>
                <h3 className="text-white font-extrabold text-lg">{s.title}</h3>
                <p className="text-white/80 text-sm">{s.sub}</p>
                <button className="mt-3 bg-white text-[#0F766E] text-xs font-bold px-4 py-2 rounded-xl w-fit flex items-center gap-1.5 hover:bg-gray-100 transition-colors">
                  Lihat Detail <FaArrowRight className="text-[10px]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="bg-[#0F766E] py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-white/70 font-bold text-sm uppercase tracking-widest mb-3">Mengapa Kami</p>
            <h2 className="text-4xl font-extrabold text-white mb-6 leading-tight">
              Kepercayaan Anda<br />adalah Prioritas Kami
            </h2>
            <div className="space-y-4">
              {[
                "Dokter gigi bersertifikasi & berpengalaman",
                "Peralatan modern & steril",
                "Lingkungan nyaman & ramah",
                "Harga transparan, tanpa biaya tersembunyi",
                "Layanan konsultasi gratis untuk pasien baru",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <FaCheckCircle className="text-white text-lg shrink-0" />
                  <p className="text-white/90 font-medium">{item}</p>
                </div>
              ))}
            </div>
            <Link
              to="/guest/layanan"
              className="mt-8 inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-[#0F766E] font-bold px-6 py-3 rounded-xl transition-colors"
            >
              Lihat Semua Layanan <FaArrowRight className="text-sm" />
            </Link>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=600&q=80"
              alt="Dental"
              className="rounded-2xl shadow-lg w-full object-cover aspect-square"
            />
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg p-4 flex items-center gap-3">
              <div className="w-12 h-12 bg-[#E8F8F6] rounded-xl flex items-center justify-center">
                <FaTooth className="text-[#0F766E] text-xl" />
              </div>
              <div>
                <p className="font-extrabold text-gray-900">5000+</p>
                <p className="text-xs text-gray-400">Pasien Puas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DOKTER ── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <p className="text-[#0F766E] font-bold text-sm uppercase tracking-widest mb-2">Tim Kami</p>
          <h2 className="text-4xl font-extrabold text-gray-900">Dokter Spesialis Kami</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeDoctors.map((d) => (
            <div key={d.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center hover:shadow-md transition-shadow">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#0F766E] to-[#14B8A6] flex items-center justify-center mx-auto mb-4 text-white text-2xl font-extrabold shadow">
                {d.nama.replace("drg. ", "").charAt(0)}
              </div>
              <h3 className="font-extrabold text-gray-900">{d.nama}</h3>
              <p className="text-sm text-[#0F766E] font-semibold mt-1">{d.spesialis}</p>
              <p className="text-xs text-gray-400 mt-1">{d.jadwal}</p>
              <div className="mt-4 flex flex-wrap gap-1.5 justify-center">
                {d.keahlian?.slice(0, 3).map((k) => (
                  <span key={k} className="text-[11px] bg-[#E8F8F6] text-[#0F766E] px-2 py-0.5 rounded-full font-medium">
                    {k}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONI ── */}
      <section className="bg-[#F0FBF9] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[#0F766E] font-bold text-sm uppercase tracking-widest mb-2">Apa Kata Mereka</p>
            <h2 className="text-4xl font-extrabold text-gray-900">Testimoni Pasien</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="flex gap-0.5 mb-3">
                  {[1,2,3,4,5].map((i) => (
                    <FaStar key={i} className={i <= t.rating ? "text-yellow-400 text-sm" : "text-gray-200 text-sm"} />
                  ))}
                </div>
                <p className="text-sm text-gray-700 italic leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#0F766E] flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800">{t.name}</p>
                    <p className="text-[10px] text-gray-400">Member {t.level}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="bg-gradient-to-r from-[#0F766E] to-[#14B8A6] py-20 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold mb-4">Siap untuk Senyum Lebih Percaya Diri?</h2>
          <p className="text-white/80 text-lg mb-8">
            Hubungi kami sekarang dan dapatkan konsultasi gratis untuk pasien baru.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/guest/komplain"
              className="bg-white/20 hover:bg-white/30 text-white font-extrabold px-8 py-3.5 rounded-xl border border-white/30 transition-colors flex items-center gap-2"
            >
              <FaPhoneAlt /> Hubungi Kami
            </Link>
            <Link
              to="/guest/dokter"
              className="bg-white/20 hover:bg-white/30 text-white font-extrabold px-8 py-3.5 rounded-xl border border-white/30 transition-colors flex items-center gap-2"
            >
              <FaCalendarAlt /> Lihat Jadwal Dokter
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
