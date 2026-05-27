import { useState, useEffect } from "react";
import { orders as initialOrders, STATUS_CONFIG } from "../../data/ordersData";
import PageHeader from "../../components/PageHeader";
import Badge      from "../../components/Badge";
import Card       from "../../components/Card";
import Table      from "../../components/Table";
import Input      from "../../components/Input";
import Select     from "../../components/Select";
import Alert      from "../../components/Alert";
import Pagination from "../../components/Pagination";

import { Button }   from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";

import { FaPlus, FaSearch } from "react-icons/fa";

const EMPTY_FORM    = { customerName: "", status: "Pending", totalPrice: "", orderDate: "" };
const PAGE_SIZE     = 8;
const STATUS_VARIANT = { Pending: "warning", Completed: "success", Cancelled: "danger" };

// ─── Skeleton tabel orders ────────────────────────────────────────────────────
function TableSkeleton({ rows = 6 }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex gap-4 px-6 py-3 border-b border-gray-100 bg-gray-50">
        {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-3 flex-1" />)}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 px-6 py-4 border-b border-gray-50 last:border-0">
          <Skeleton className="h-4 w-24 shrink-0" />
          <Skeleton className="h-4 flex-1" />
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
      ))}
    </div>
  );
}

export default function Orders() {
  const [data,        setData]        = useState(initialOrders);
  const [showModal,   setShowModal]   = useState(false);
  const [form,        setForm]        = useState(EMPTY_FORM);
  const [search,      setSearch]      = useState("");
  const [filterSt,    setFilterSt]    = useState("");
  const [savedAlert,  setSavedAlert]  = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading,   setIsLoading]   = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  const filtered = data.filter((o) => {
    const matchSearch = (o.customerName || o.customer || "").toLowerCase().includes(search.toLowerCase());
    const matchStatus = !filterSt || o.status === filterSt;
    return matchSearch && matchStatus;
  });

  const totalPages  = Math.ceil(filtered.length / PAGE_SIZE);
  const pagedOrders = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleSubmit = (e) => {
    e.preventDefault();
    setData([
      { ...form, id: `#ORD-${String(data.length + 1).padStart(3, "0")}`, totalPrice: Number(form.totalPrice) },
      ...data,
    ]);
    setForm(EMPTY_FORM);
    setShowModal(false);
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 3000);
  };

  const columns = [
    { key: "id",           label: "Order ID",  render: (v) => <span className="font-mono text-gray-500 text-xs">{v}</span> },
    { key: "customerName", label: "Customer",  render: (v, row) => v || row.customer || "-" },
    {
      key: "status",
      label: "Status",
      render: (val) => {
        const s = STATUS_CONFIG[val] || {};
        return <Badge variant={STATUS_VARIANT[val] || "default"} dot>{s.label || val}</Badge>;
      },
    },
    { key: "totalPrice", label: "Total",    render: (v) => v ? `Rp ${Number(v).toLocaleString("id-ID")}` : "-" },
    { key: "orderDate",  label: "Tanggal",  render: (v) => v || "-" },
  ];

  return (
    <div className="flex flex-col w-full gap-4">
      <PageHeader title="Orders" breadcrumb={["Dashboard", "Order List"]}>
        <Button onClick={() => setShowModal(true)}><FaPlus /> Add Order</Button>
      </PageHeader>

      {savedAlert && (
        <Alert variant="success" title="Order ditambahkan!" dismissible onDismiss={() => setSavedAlert(false)}>
          Data order baru berhasil disimpan.
        </Alert>
      )}

      <Card padding="sm">
        <div className="flex flex-col md:flex-row gap-3">
          <Input placeholder="Search customer..." leftIcon={<FaSearch className="text-xs" />}
            value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            fullWidth={false} className="w-full md:w-64" />
          <Select
            options={[
              { value: "", label: "Semua Status" }, { value: "Pending", label: "Pending" },
              { value: "Completed", label: "Completed" }, { value: "Cancelled", label: "Cancelled" },
            ]}
            value={filterSt} onChange={(e) => { setFilterSt(e.target.value); setCurrentPage(1); }}
            placeholder={null} fullWidth={false} className="w-full md:w-44" />
        </div>
      </Card>

      {/* ─── Skeleton saat loading ─── */}
      {isLoading
        ? <TableSkeleton rows={6} />
        : <Table columns={columns} data={pagedOrders} emptyText="Belum ada data order." />
      }

      {!isLoading && totalPages > 1 && (
        <div className="flex justify-end">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      )}

      {/* ─── Shadcn Dialog — Add Order ─── */}
      <Dialog open={showModal} onOpenChange={(open) => !open && setShowModal(false)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Add New Order</DialogTitle>
          </DialogHeader>
          <form id="order-form" onSubmit={handleSubmit} className="space-y-4 py-2">
            <Input label="Customer Name" required value={form.customerName}
              onChange={(e) => setForm({ ...form, customerName: e.target.value })} />
            <Select label="Status" options={["Pending", "Completed", "Cancelled"]}
              value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} placeholder={null} />
            <Input label="Total Price (Rp)" type="number" required min="0"
              value={form.totalPrice} onChange={(e) => setForm({ ...form, totalPrice: e.target.value })} />
            <Input label="Order Date" type="date" required
              value={form.orderDate} onChange={(e) => setForm({ ...form, orderDate: e.target.value })} />
          </form>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button type="submit" form="order-form">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
