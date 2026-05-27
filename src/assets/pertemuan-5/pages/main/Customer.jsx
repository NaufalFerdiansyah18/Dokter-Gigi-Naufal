import { useState, useEffect } from "react";
import { customers as initialCustomers, LOYALTY_CONFIG } from "../../data/ordersData";
import PageHeader from "../../components/PageHeader";
import Badge      from "../../components/Badge";
import Avatar     from "../../components/Avatar";
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

const EMPTY_FORM     = { customerName: "", email: "", phone: "", loyalty: "Gold" };
const PAGE_SIZE      = 8;
const LOYALTY_VARIANT = { Bronze: "warning", Silver: "default", Gold: "teal" };

// ─── Skeleton tabel customer ──────────────────────────────────────────────────
function TableSkeleton({ rows = 6 }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex gap-4 px-6 py-3 border-b border-gray-100 bg-gray-50">
        {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-3 flex-1" />)}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 px-6 py-4 border-b border-gray-50 last:border-0">
          <Skeleton className="h-4 w-20 shrink-0" />
          <div className="flex items-center gap-3 flex-1">
            <Skeleton className="w-8 h-8 rounded-full shrink-0" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-4 w-36 hidden md:block" />
          <Skeleton className="h-4 w-24 hidden md:block" />
          <Skeleton className="h-5 w-16 rounded-full shrink-0" />
        </div>
      ))}
    </div>
  );
}

export default function Customer() {
  const [data,        setData]        = useState(initialCustomers || []);
  const [showModal,   setShowModal]   = useState(false);
  const [form,        setForm]        = useState(EMPTY_FORM);
  const [search,      setSearch]      = useState("");
  const [filterLoy,   setFilterLoy]   = useState("");
  const [savedAlert,  setSavedAlert]  = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading,   setIsLoading]   = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  const filtered = data.filter((c) => {
    const matchSearch  = (c.customerName || "").toLowerCase().includes(search.toLowerCase()) ||
      (c.email || "").toLowerCase().includes(search.toLowerCase());
    const matchLoyalty = !filterLoy || c.loyalty === filterLoy;
    return matchSearch && matchLoyalty;
  });

  const totalPages    = Math.ceil(filtered.length / PAGE_SIZE);
  const pagedCustomer = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleSubmit = (e) => {
    e.preventDefault();
    setData([{ ...form, id: `#CUS-${String(data.length + 1).padStart(3, "0")}` }, ...data]);
    setForm(EMPTY_FORM);
    setShowModal(false);
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 3000);
  };

  const columns = [
    { key: "id",           label: "ID",       render: (v) => <span className="font-mono text-gray-500 text-xs">{v}</span> },
    {
      key: "customerName",
      label: "Customer",
      render: (val) => (
        <div className="flex items-center gap-3">
          <Avatar name={val} size="sm" color="bg-[#E8F8F6] text-[#1A7C6E]" />
          <span className="font-semibold text-gray-800">{val}</span>
        </div>
      ),
    },
    { key: "email",   label: "Email", render: (v) => <span className="text-gray-500">{v || "-"}</span> },
    { key: "phone",   label: "Phone", render: (v) => <span className="text-gray-500">{v || "-"}</span> },
    {
      key: "loyalty",
      label: "Loyalty",
      render: (val) => <Badge variant={LOYALTY_VARIANT[val] || "default"} dot>{val}</Badge>,
    },
  ];

  return (
    <div className="flex flex-col w-full gap-4">
      <PageHeader title="Customers" breadcrumb={["Dashboard", "Customer List"]}>
        <Button onClick={() => setShowModal(true)}><FaPlus /> Add Customer</Button>
      </PageHeader>

      {savedAlert && (
        <Alert variant="success" title="Customer ditambahkan!" dismissible onDismiss={() => setSavedAlert(false)}>
          Data customer baru berhasil disimpan.
        </Alert>
      )}

      <Card padding="sm">
        <div className="flex flex-col md:flex-row gap-3">
          <Input placeholder="Search nama / email..." leftIcon={<FaSearch className="text-xs" />}
            value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            fullWidth={false} className="w-full md:w-64" />
          <Select
            options={[
              { value: "", label: "Semua Loyalty" }, { value: "Bronze", label: "Bronze" },
              { value: "Silver", label: "Silver" },  { value: "Gold",   label: "Gold" },
            ]}
            value={filterLoy} onChange={(e) => { setFilterLoy(e.target.value); setCurrentPage(1); }}
            placeholder={null} fullWidth={false} className="w-full md:w-44" />
        </div>
      </Card>

      {/* ─── Skeleton saat loading ─── */}
      {isLoading
        ? <TableSkeleton rows={6} />
        : <Table columns={columns} data={pagedCustomer} emptyText="Belum ada data customer." />
      }

      {!isLoading && totalPages > 1 && (
        <div className="flex justify-end">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      )}

      {/* ─── Shadcn Dialog — Add Customer ─── */}
      <Dialog open={showModal} onOpenChange={(open) => !open && setShowModal(false)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Add New Customer</DialogTitle>
          </DialogHeader>
          <form id="customer-form" onSubmit={handleSubmit} className="space-y-4 py-2">
            <Input label="Customer Name" required value={form.customerName}
              onChange={(e) => setForm({ ...form, customerName: e.target.value })} />
            <Input label="Email" type="email" required value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <Input label="Phone" required value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <Select label="Loyalty" options={["Bronze", "Silver", "Gold"]}
              value={form.loyalty} onChange={(e) => setForm({ ...form, loyalty: e.target.value })} placeholder={null} />
          </form>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button type="submit" form="customer-form">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
