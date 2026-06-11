import { FaArrowRight, FaCheckCircle } from "react-icons/fa";

const LAYANAN = [
  {
    title: "Scaling Gigi",
    sub: "Pembersihan karang gigi secara menyeluruh",
    img: "https://images.unsplash.com/photo-1588776814546-1ffbb172d436?w=600&q=80",
    detail: ["Membersihkan plak & tartar", "Mencegah penyakit gusi", "Napas lebih segar", "Prosedur 30–45 menit"],
    harga: "Mulai Rp 250.000",
  },
  {
    title: "Tambal Gigi",
    sub: "Komposit & Amalgam berkualitas tinggi",
    img: "https://images.unsplash.com/photo-1629909615184-74f495363b67?w=600&q=80",
    detail: ["Tambal komposit (sewarna gigi)", "Tambal amalgam tahan lama", "Menggunakan bahan BPOM", "Garansi 1 tahun"],
    harga: "Mulai Rp 200.000",
  },
  {
    title: "Cabut Gigi",
    sub: "Umum & bedah minor profesional",
    img: "https://images.unsplash.com/photo-1643833497740-6e9e9b7da53c?w=600&q=80",
    detail: ["Cabut gigi susu & dewasa", "Cabut gigi bungsu", "Anestesi lokal nyaman", "Perawatan pasca cabut"],
    harga: "Mulai Rp 150.000",
  },
  {
    title: "Pemasangan Behel",
    sub: "Metal, Ceramic & Clear Aligner",
    img: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=600&q=80",
    detail: ["Konsultasi & foto rontgen", "Berbagai pilihan jenis behel", "Kontrol rutin setiap 4 minggu", "Estimasi durasi 1–2 tahun"],
    harga: "Mulai Rp 5.000.000",
  },
  {
    title: "Whitening Gigi",
    sub: "Laser & Bleaching profesional",
    img: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&q=80",
    detail: ["Teknologi laser terkini", "Hasil terlihat dalam 1 sesi", "Prosedur 60–90 menit", "Whitening hingga 8 shade"],
    harga: "Mulai Rp 800.000",
  },
  {
    title: "Veneer Gigi",
    sub: "Porcelain & Composite Veneer",
    img: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=600&q=80",
    detail: ["Konsultasi smile design", "Porcelain veneer tahan lama", "Hasil natural & estetik", "Garansi 5 tahun"],
    harga: "Mulai Rp 1.500.000/gigi",
  },
  {
    title: "Perawatan Saluran Akar",
    sub: "Root canal treatment modern",
    img: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600&q=80",
    detail: ["Menyelamatkan gigi berlubang dalam", "Menghilangkan nyeri gigi", "2–3 sesi perawatan", "Setelah PSA dipasang crown"],
    harga: "Mulai Rp 500.000/sesi",
  },
  {
    title: "Konsultasi Umum",
    sub: "Pemeriksaan & konsultasi gigi",
    img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80",
    detail: ["Pemeriksaan kondisi gigi menyeluruh", "Rontgen gigi digital", "Rencana perawatan komprehensif", "Gratis untuk pasien baru"],
    harga: "Mulai Rp 100.000",
  },
];

export default function GuestLayanan() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-r from-[#0F766E] to-[#14B8A6] text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-extrabold mb-3">Layanan Kami</h1>
        <p className="text-white/80 max-w-xl mx-auto">
          Berbagai layanan perawatan gigi profesional dengan teknologi modern dan dokter berpengalaman.
        </p>
      </div>

      {/* Grid layanan */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {LAYANAN.map((l) => (
            <div key={l.title} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={l.img}
                  alt={l.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="font-extrabold text-gray-900 text-base">{l.title}</h3>
                <p className="text-xs text-[#0F766E] font-semibold mt-0.5">{l.sub}</p>
                <ul className="mt-3 space-y-1.5">
                  {l.detail.map((d) => (
                    <li key={d} className="flex items-center gap-2 text-xs text-gray-600">
                      <FaCheckCircle className="text-[#0F766E] shrink-0 text-[10px]" /> {d}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <p className="text-xs font-bold text-gray-700">{l.harga}</p>
                  <button className="bg-[#0F766E] hover:bg-[#0A5E58] text-white text-[11px] font-bold px-3 py-1.5 rounded-xl flex items-center gap-1 transition-colors">
                    Daftar <FaArrowRight className="text-[9px]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
