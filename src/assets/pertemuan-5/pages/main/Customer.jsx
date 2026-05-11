import { useState } from "react";
import PageHeader from "../../components/PageHeader";
import { customers as initialCustomers, LOYALTY_CONFIG } from "../../data/ordersData";

const EMPTY_FORM = { customerName: "", email: "", phone: "", loyalty: "Gold" };

export default function Customer() {
  const [data, setData] = useState(initialCustomers);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCustomer = {
      ...form,
      id: `#CUS-${String(data.length + 1).padStart(3, "0")}`,
    };
    setData([newCustomer, ...data]);
    setForm(EMPTY_FORM);
    setShowModal(false);
  };

  return (
    <div className="flex flex-col w-full">
      <PageHeader title="Customers" breadcrumb={["Dashboard", "Customer List"]}>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#1A7C6E] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#15675C] transition-colors"
        >
          + Add Customer
        </button>
      </PageHeader>

      <div className="mt-4 bg-white rounded-2xl shadow-sm border border-gray-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 font-semibold">
              <tr>
                <th className="px-5 py-3 text-left">Customer ID</th>
                <th className="px-5 py-3 text-left">Customer Name</th>
                <th className="px-5 py-3 text-left">Email</th>
                <th className="px-5 py-3 text-left">Phone</th>
                <th className="px-5 py-3 text-left">Loyalty</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {data.map((cus) => {
                const l = LOYALTY_CONFIG[cus.loyalty] || {};
                return (
                  <tr key={cus.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 font-mono text-gray-500">{cus.id}</td>
                    <td className="px-5 py-3 font-medium text-gray-800">{cus.customerName}</td>
                    <td className="px-5 py-3 text-gray-500">{cus.email}</td>
                    <td className="px-5 py-3 text-gray-500">{cus.phone}</td>
                    <td className="px-5 py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${l.bg} ${l.text}`}>
                        {cus.loyalty}
                      </span>
                    </td>
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
            <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Customer</h2>
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
                <label className="text-sm font-semibold text-gray-600">Email</label>
                <input
                  required type="email"
                  className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A7C6E]"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Phone</label>
                <input
                  required
                  className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A7C6E]"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Loyalty</label>
                <select
                  className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A7C6E]"
                  value={form.loyalty}
                  onChange={(e) => setForm({ ...form, loyalty: e.target.value })}
                >
                  <option>Bronze</option>
                  <option>Silver</option>
                  <option>Gold</option>
                </select>
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
