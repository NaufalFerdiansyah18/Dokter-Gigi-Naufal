import { useState } from "react";
import PageHeader from "../../components/PageHeader";
import { orders as initialOrders, STATUS_CONFIG } from "../../data/ordersData";

const EMPTY_FORM = { customerName: "", status: "Pending", totalPrice: "", orderDate: "" };

export default function Orders() {
  const [data, setData] = useState(initialOrders);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newOrder = {
      ...form,
      id: `#ORD-${String(data.length + 1).padStart(3, "0")}`,
      totalPrice: Number(form.totalPrice),
    };
    setData([newOrder, ...data]);
    setForm(EMPTY_FORM);
    setShowModal(false);
  };

  return (
    <div className="flex flex-col w-full">
      <PageHeader title="Orders" breadcrumb={["Dashboard", "Order List"]}>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#1A7C6E] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#15675C] transition-colors"
        >
          + Add Orders
        </button>
      </PageHeader>

      <div className="mt-4 bg-white rounded-2xl shadow-sm border border-gray-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 font-semibold">
              <tr>
                <th className="px-5 py-3 text-left">Order ID</th>
                <th className="px-5 py-3 text-left">Customer Name</th>
                <th className="px-5 py-3 text-left">Status</th>
                <th className="px-5 py-3 text-left">Total Price</th>
                <th className="px-5 py-3 text-left">Order Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {data.map((order) => {
                const s = STATUS_CONFIG[order.status] || {};
                return (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 font-mono text-gray-500">{order.id}</td>
                    <td className="px-5 py-3 font-medium text-gray-800">{order.customerName}</td>
                    <td className="px-5 py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${s.bg} ${s.text}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-gray-700">
                      Rp {order.totalPrice.toLocaleString("id-ID")}
                    </td>
                    <td className="px-5 py-3 text-gray-500">{order.orderDate}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Order</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-sm font-semibold text-gray-600">Customer Name</label>
                <input
                  required
                  className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A7C6E]"
                  value={form.customerName}
                  onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Status</label>
                <select
                  className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A7C6E]"
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                  <option>Pending</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Total Price (Rp)</label>
                <input
                  required type="number" min="0"
                  className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A7C6E]"
                  value={form.totalPrice}
                  onChange={(e) => setForm({ ...form, totalPrice: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Order Date</label>
                <input
                  required type="date"
                  className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A7C6E]"
                  value={form.orderDate}
                  onChange={(e) => setForm({ ...form, orderDate: e.target.value })}
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="flex-1 bg-[#1A7C6E] text-white py-2 rounded-lg font-semibold hover:bg-[#15675C] transition-colors">
                  Save
                </button>
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 border border-gray-200 text-gray-600 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
