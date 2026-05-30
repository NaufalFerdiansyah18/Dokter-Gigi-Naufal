import { useState, useEffect } from "react";
import { FaUserFriends, FaCalendarCheck, FaUserMd, FaTooth, FaClock, FaWhatsapp } from "react-icons/fa";
import { useClinic } from "../../context/ClinicContext";

// Custom UI components
import StatCard from "../../components/StatCard";
import Badge from "../../components/Badge";
import Card from "../../components/Card";
import Avatar from "../../components/Avatar";
import Table from "../../components/Table";
import ProgressBar from "../../components/ProgressBar";
import Tabs from "../../components/Tabs";
import Alert from "../../components/Alert";

// Shadcn UI — Skeleton (loading state tabel appointment)
import { Skeleton } from "@/components/ui/skeleton";

const STATUS_BADGE = {
  Active: { variant: "success" },
  Completed: { variant: "teal" },
  Waiting: { variant: "warning" },
  Cancel: { variant: "danger" },
};

function AppointmentSkeleton() {
  return (
    <div className="divide-y divide-gray-50">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 px-6 py-4">
          <Skeleton className="h-4 w-12 shrink-0" />
          <div className="flex items-center gap-3 flex-1">
            <Skeleton className="h-8 w-8 rounded-full shrink-0" />
            <Skeleton className="h-4 w-28" />
          </div>
          <Skeleton className="h-4 w-24 hidden md:block" />
          <Skeleton className="h-4 w-20 hidden lg:block" />
          <Skeleton className="h-5 w-16 rounded-full shrink-0" />
        </div>
      ))}
    </div>
  );
}

function StatCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-5">
      <Skeleton className="w-14 h-14 rounded-full shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-7 w-12" />
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { patients, doctors } = useClinic();
  const [activeTab, setActiveTab] = useState("appointments");
  const [isLoading, setIsLoading] = useState(true);
  const [reminderSent, setReminderSent] = useState(null);

  const handleSendReminder = (patientName, noHp) => {
    setReminderSent(`Reminder kontrol gigi berhasil dikirim ke WhatsApp ${patientName} (${noHp})!`);
    setTimeout(() => {
      setReminderSent(null);
    }, 4000);
  };

  // Simulasi loading 1.5 detik saat pertama mount
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const totalPatients = patients.length;
  const appointmentsToday = patients.length;
  const activeDoctors = doctors.filter((d) => d.status === "Active").length;

  const treatmentCounts = patients.reduce((acc, p) => {
    if (p.treatment) acc[p.treatment] = (acc[p.treatment] || 0) + 1;
    return acc;
  }, {});
  const popularTreatments = Object.entries(treatmentCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }));

  const maxCount = popularTreatments[0]?.count || 1;

  const appointmentColumns = [
    { key: "jam", label: "Jam" },
    {
      key: "nama",
      label: "Pasien",
      render: (val) => (
        <div className="flex items-center gap-3">
          <Avatar name={val} size="sm" />
          <span className="font-semibold text-gray-800">{val}</span>
        </div>
      ),
    },
    { key: "dokter", label: "Dokter" },
    { key: "treatment", label: "Treatment" },
    {
      key: "status",
      label: "Status",
      render: (val) => {
        const cfg = STATUS_BADGE[val] || { variant: "default" };
        return <Badge variant={cfg.variant} dot>{val}</Badge>;
      },
    },
  ];

  const appointmentData = patients.slice(0, 5).map((p, idx) => ({
    id: p.id,
    jam: `09:${String(idx * 10).padStart(2, "0")}`,
    nama: p.nama,
    dokter: p.dokter || "-",
    treatment: p.treatment || "-",
    status: p.status,
  }));

  const tabs = [
    { key: "appointments", label: "Appointments", badge: patients.slice(0, 5).length },
    { key: "treatments", label: "Treatments", badge: popularTreatments.length },
  ];

  return (
    <div className="flex flex-col w-full pb-10 min-h-screen bg-gray-50/30">

      {/* Banner */}
      <div className="relative bg-gradient-to-r from-[#1A7C6E] to-[#2BB5A0] rounded-3xl px-8 pt-10 pb-24 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl translate-y-1/2" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Hello Naufal! 👋</h1>
            <p className="text-white/80 text-sm md:text-base max-w-lg">
              Manage Nopall Dental Clinic easily and beautifully. Have a great day at work!
            </p>
          </div>
          <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors px-6 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 w-fit">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            Announcements
          </button>
        </div>
      </div>

      <div className="px-0 relative -mt-14 z-20">

        {reminderSent && (
          <div className="mb-6">
            <Alert variant="success" title="WhatsApp Terkirim!" dismissible onDismiss={() => setReminderSent(null)}>
              {reminderSent}
            </Alert>
          </div>
        )}

        {/* ─── Stat Cards — Skeleton saat loading ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {isLoading ? (
            <>
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
            </>
          ) : (
            <>
              <StatCard
                title="Total Patients"
                value={totalPatients}
                icon={<FaUserFriends />}
                iconBg="bg-[#E8F8F6]"
                iconColor="text-[#1A7C6E]"
                trend={12}
                trendLabel="bulan ini"
              />
              <StatCard
                title="Appointments"
                value={appointmentsToday}
                icon={<FaCalendarCheck />}
                iconBg="bg-blue-50"
                iconColor="text-blue-600"
                trend={5}
                trendLabel="dari kemarin"
              />
              <StatCard
                title="Active Doctors"
                value={activeDoctors}
                icon={<FaUserMd />}
                iconBg="bg-purple-50"
                iconColor="text-purple-600"
              />
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Kiri — Tabel dengan Tabs */}
          <div className="lg:col-span-2">
            <Card
              padding="none"
              headerAction={
                <button className="text-xs font-bold text-gray-500 hover:text-[#1A7C6E] transition-colors">
                  View All ›
                </button>
              }
            >
              <div className="px-6 pt-5 pb-0">
                <Tabs
                  tabs={tabs}
                  activeKey={activeTab}
                  onChange={setActiveTab}
                  variant="underline"
                />
              </div>

              {activeTab === "appointments" && (
                isLoading ? (
                  /* ─── Shadcn Skeleton — loading tabel appointment ─── */
                  <AppointmentSkeleton />
                ) : (
                  <Table
                    columns={appointmentColumns}
                    data={appointmentData}
                    className="border-0 rounded-none shadow-none"
                  />
                )
              )}

              {activeTab === "treatments" && (
                <div className="p-6 space-y-5">
                  {isLoading ? (
                    /* ─── Shadcn Skeleton — loading treatment list ─── */
                    Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <Skeleton className="w-9 h-9 rounded-xl shrink-0" />
                        <div className="flex-1 space-y-2">
                          <div className="flex justify-between">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-4 w-6" />
                          </div>
                          <Skeleton className="h-1.5 w-full rounded-full" />
                        </div>
                      </div>
                    ))
                  ) : popularTreatments.length > 0 ? (
                    popularTreatments.map((t, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
                          <FaTooth className="text-sm" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-semibold text-gray-700">{t.name}</span>
                            <span className="text-sm font-bold text-gray-800">{t.count}</span>
                          </div>
                          <ProgressBar
                            value={Math.round((t.count / maxCount) * 100)}
                            showValue={false}
                            color={idx === 0 ? "teal" : idx === 1 ? "blue" : "purple"}
                            size="sm"
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400 italic text-center py-4">Belum ada data treatment.</p>
                  )}
                </div>
              )}
            </Card>
          </div>

          {/* Kanan */}
          <div className="space-y-6">

            {/* Reminder Kontrol Gigi */}
            <Card title="Reminder Kontrol Gigi" padding="md">
              <div className="space-y-3 mt-1">
                {isLoading ? (
                  Array.from({ length: 2 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-gray-50">
                      <Skeleton className="w-10 h-10 rounded-full shrink-0" />
                      <div className="flex-1 space-y-1.5">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                      <Skeleton className="h-6 w-12 rounded-md shrink-0" />
                    </div>
                  ))
                ) : (
                  patients.filter((p) => p.jadwalKontrol).map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between gap-3 p-3 rounded-xl border border-gray-50 hover:bg-gray-50 transition"
                    >
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-800 truncate text-sm">{p.nama}</h4>
                        <p className="text-xs text-[#1A7C6E] font-medium mt-0.5">{p.jadwalKontrol.tanggal}</p>
                        <p className="text-[10px] text-gray-400 truncate mt-0.5">{p.jadwalKontrol.keterangan}</p>
                      </div>
                      <button
                        onClick={() => handleSendReminder(p.nama, p.noHp)}
                        className="p-2 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg text-xs flex items-center justify-center shrink-0 transition"
                        title="Kirim Reminder WhatsApp"
                      >
                        <FaWhatsapp className="text-base" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </Card>

            {/* Active Doctors */}
            <Card title="Active Doctors" padding="md">
              <div className="space-y-3 mt-1">
                {isLoading ? (
                  /* ─── Shadcn Skeleton — loading doctor list ─── */
                  Array.from({ length: 2 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-gray-50">
                      <Skeleton className="w-10 h-10 rounded-full shrink-0" />
                      <div className="flex-1 space-y-1.5">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                      <Skeleton className="h-5 w-14 rounded-md shrink-0" />
                    </div>
                  ))
                ) : (
                  doctors.filter((d) => d.status === "Active").map((d) => (
                    <div
                      key={d.id}
                      className="flex items-center gap-3 p-3 rounded-xl border border-gray-50 hover:bg-gray-50 transition cursor-pointer"
                    >
                      <Avatar
                        name={d.nama.replace("drg. ", "")}
                        size="md"
                        color="bg-purple-50 text-purple-600"
                        status="online"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-800 truncate text-sm">{d.nama}</h4>
                        <p className="text-xs text-gray-400 font-medium mt-0.5">{d.spesialis}</p>
                      </div>
                      <div className="text-[10px] font-bold text-[#1A7C6E] bg-[#E8F8F6] px-2 py-1 rounded-md flex items-center gap-1 shrink-0">
                        <FaClock className="text-[9px]" /> 08:00
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>

            {/* Patient Status Summary */}
            <Card title="Patient Status" padding="md">
              <div className="space-y-3 mt-1">
                {isLoading ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Skeleton className="h-5 w-20 rounded-full shrink-0" />
                      <Skeleton className="h-1.5 flex-1 rounded-full" />
                      <Skeleton className="h-4 w-4 shrink-0" />
                    </div>
                  ))
                ) : (
                  [
                    { label: "Active", color: "green", variant: "success" },
                    { label: "Waiting", color: "yellow", variant: "warning" },
                    { label: "Completed", color: "teal", variant: "teal" },
                    { label: "Cancel", color: "red", variant: "danger" },
                  ].map(({ label, color, variant }) => {
                    const count = patients.filter((p) => p.status === label).length;
                    const pct = totalPatients > 0 ? Math.round((count / totalPatients) * 100) : 0;
                    return (
                      <div key={label} className="flex items-center gap-3">
                        <Badge variant={variant} className="w-20 justify-center shrink-0">{label}</Badge>
                        <div className="flex-1">
                          <ProgressBar value={pct} showValue={false} color={color} size="sm" />
                        </div>
                        <span className="text-xs font-bold text-gray-600 w-6 text-right shrink-0">{count}</span>
                      </div>
                    );
                  })
                )}
              </div>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
}
