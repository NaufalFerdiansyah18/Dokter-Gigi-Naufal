import { orders, STATUS_CONFIG } from "../data/ordersData.jsx";

export default function RecentOrders() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-50 mt-6 overflow-hidden">
      {/* Header tabel */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div>
          <h2 className="text-base font-bold text-gray-800 font-poppins">Pesanan Terkini</h2>
          <p className="text-xs text-gray-400 font-barlow mt-0.5">Aktivitas pesanan hari ini</p>
        </div>
        <button className="text-xs font-bold text-[#1A7C6E] hover:underline cursor-pointer">
          Lihat Semua →
        </button>
      </div>

      {/* Tabel */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-50">
              {["ID Pesanan", "Pelanggan", "Menu", "Waktu", "Status"].map((h) => (
                <th key={h} className="text-left px-6 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => {
              const s = STATUS_CONFIG[order.status];
              return (
                <tr
                  key={order.id}
                  className={`hover:bg-gray-50/60 transition-colors ${idx < orders.length - 1 ? "border-b border-gray-50" : ""}`}
                >
                  <td className="px-6 py-4 font-mono font-bold text-gray-600 text-[13px]">{order.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={`https://avatar.iran.liara.run/public/${idx % 2 === 0 ? "boy" : "girl"}?username=${order.customer}`}
                        className="w-7 h-7 rounded-full bg-gray-100 object-cover"
                        alt={order.customer}
                      />
                      <span className="font-semibold text-gray-700">{order.customer}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500 font-barlow">{order.menu}</td>
                  <td className="px-6 py-4 text-gray-400 text-[12px] font-barlow">{order.time}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${s.bg} ${s.text}`}>
                      {s.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}



