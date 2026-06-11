import { FaCheckCircle } from "react-icons/fa";

const HARGA = [
  { kategori: "Perawatan Dasar",     items: [
    { nama: "Konsultasi Umum",            harga: "Rp 100.000",   note: "Gratis untuk pasien baru" },
    { nama: "Rontgen Gigi",               harga: "Rp 200.000" },
    { nama: "Scaling Gigi",               harga: "Rp 250.000 – 400.000" },
    { nama: "Tambal Gigi (Komposit)",     harga: "Rp 200.000 – 350.000" },
    { nama: "Tambal Gigi (Amalgam)",      harga: "Rp 150.000 – 250.000" },
    { nama: "Cabut Gigi Biasa",           harga: "Rp 150.000 – 200.000" },
    { nama: "Cabut Gigi Bungsu",          harga: "Rp 500.000 – 800.000" },
  ]},
  { kategori: "Perawatan Lanjutan",  items: [
    { nama: "Perawatan Saluran Akar (PSA)", harga: "Rp 500.000 – 1.000.000/sesi" },
    { nama: "Crown Gigi (Porcelain)",       harga: "Rp 2.500.000 – 4.000.000" },
    { nama: "Crown Gigi (PFM)",             harga: "Rp 1.500.000 – 2.500.000" },
    { nama: "Gigi Tiruan Lepasan",          harga: "Rp 2.000.000 – 5.000.000" },
  ]},
  { kategori: "Estetika & Kosmetik", items: [
    { nama: "Whitening Gigi (Laser)",   harga: "Rp 1.500.000 – 2.000.000" },
    { nama: "Bleaching Gigi",           harga: "Rp 800.000 – 1.200.000" },
    { nama: "Veneer (Komposit)",        harga: "Rp 800.000 – 1.200.000/gigi" },
    { nama: "Veneer (Porcelain)",       harga: "Rp 2.500.000 – 4.000.000/gigi" },
    { nama: "Smile Design",             harga: "Konsultasi" },
  ]},
  { kategori: "Ortodonti (Behel)",    items: [
    { nama: "Behel Metal",              harga: "Rp 5.000.000 – 7.000.000" },
    { nama: "Behel Ceramic",            harga: "Rp 7.000.000 – 9.000.000" },
    { nama: "Clear Aligner",            harga: "Rp 12.000.000 – 20.000.000" },
    { nama: "Kontrol Behel",            harga: "Rp 200.000 – 350.000/bulan" },
    { nama: "Retainer",                 harga: "Rp 500.000 – 1.000.000" },
  ]},
];

export default function GuestHarga() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-r from-[#0F766E] to-[#14B8A6] text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-extrabold mb-3">Daftar Harga</h1>
        <p className="text-white/80 max-w-xl mx-auto">
          Harga transparan, tidak ada biaya tersembunyi. Konsultasi gratis untuk pasien baru!
        </p>
      </div>

      {/* Info boxes */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {[
            { icon: "💳", title: "Berbagai Metode Bayar", desc: "Tunai, Transfer, QRIS, Kartu Kredit & Debit" },
            { icon: "🎁", title: "Konsultasi Gratis",     desc: "Gratis untuk kunjungan pertama pasien baru" },
            { icon: "💰", title: "Cicilan 0%",            desc: "Tersedia cicilan 0% untuk behel & implant" },
          ].map((b) => (
            <div key={b.title} className="bg-[#E8F8F6] rounded-2xl p-5 flex items-start gap-3">
              <span className="text-2xl">{b.icon}</span>
              <div>
                <p className="font-bold text-gray-800">{b.title}</p>
                <p className="text-sm text-gray-600 mt-0.5">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Harga tables */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {HARGA.map((kat) => (
            <div key={kat.kategori} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-[#0F766E] px-5 py-3">
                <h3 className="font-extrabold text-white">{kat.kategori}</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {kat.items.map((item) => (
                  <div key={item.nama} className="flex items-center justify-between px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <FaCheckCircle className="text-[#0F766E] text-xs shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{item.nama}</p>
                        {item.note && <p className="text-[11px] text-green-600 font-medium">{item.note}</p>}
                      </div>
                    </div>
                    <p className="text-sm font-bold text-[#0F766E] shrink-0 ml-4">{item.harga}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-400 text-center mt-8">
          * Harga dapat berubah sewaktu-waktu. Biaya final akan dikonfirmasi setelah pemeriksaan oleh dokter.
        </p>
      </div>
    </div>
  );
}
