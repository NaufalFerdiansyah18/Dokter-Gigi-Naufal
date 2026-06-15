import { FaCreditCard, FaCheckCircle, FaClock, FaDownload } from "react-icons/fa";

const transactions = [
  { id: "INV-2025-001", date: "20 Jan 2025", service: "Scaling Gigi", amount: 250000, status: "paid", method: "Transfer Bank" },
  { id: "INV-2024-128", date: "15 Des 2024", service: "Tambal Gigi", amount: 350000, status: "paid", method: "Cash" },
  { id: "INV-2024-115", date: "10 Nov 2024", service: "Konsultasi", amount: 150000, status: "paid", method: "QRIS" },
  { id: "INV-2025-002", date: "25 Jan 2025", service: "Whitening", amount: 750000, status: "pending", method: "Transfer Bank" },
];

export default function MemberTransaksi() {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Riwayat Transaksi</h1>
      <p className="text-gray-500 mb-8">Semua transaksi dan pembayaran Anda</p>

      <div className="space-y-4">
        {transactions.map((trx) => (
          <div key={trx.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  trx.status === "paid" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"
                }`}>
                  {trx.status === "paid" ? <FaCheckCircle className="text-xl" /> : <FaClock className="text-xl" />}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{trx.service}</p>
                  <p className="text-sm text-gray-500">{trx.id} • {trx.date}</p>
                  <p className="text-xs text-gray-400 mt-1">Metode: {trx.method}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">Rp {trx.amount.toLocaleString("id-ID")}</p>
                  <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${
                    trx.status === "paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {trx.status === "paid" ? "Lunas" : "Pending"}
                  </span>
                </div>
                {trx.status === "paid" && (
                  <button className="p-3 bg-[#0F766E] text-white rounded-xl hover:bg-[#0A5E58] transition-colors">
                    <FaDownload />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
