import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useClinic } from "../../context/ClinicContext";
import {
  FaArrowLeft, FaPhone, FaEnvelope,
  FaCalendarAlt, FaUsers, FaStar,
} from "react-icons/fa";

import Badge       from "../../components/Badge";
import Avatar      from "../../components/Avatar";
import Card        from "../../components/Card";
import Table       from "../../components/Table";
import Alert       from "../../components/Alert";
import AvatarGroup from "../../components/AvatarGroup";

import { Button }   from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const STATUS_BADGE         = { Active: "success", Inactive: "default" };
const PATIENT_STATUS_BADGE = { Active: "success", Waiting: "warning", Completed: "teal", Cancel: "danger" };

// ─── Skeleton layout untuk halaman detail ────────────────────────────────────
function DetailSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Kolom kiri */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <Skeleton className="h-28 w-full rounded-none" />
          <div className="px-6 pb-6 -mt-10 flex flex-col items-center gap-3">
            <Skeleton className="w-20 h-20 rounded-2xl" />
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-16 rounded-full" />
            <div className="w-full space-y-3 mt-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex gap-3 py-2 border-b border-gray-50">
                  <Skeleton className="w-7 h-7 rounded-lg shrink-0" />
                  <div className="flex-1 space-y-1">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Kolom kanan */}
      <div className="lg:col-span-2 flex flex-col gap-6">
        {[4, 2, 3].map((rows, ci) => (
          <div key={ci} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-3">
            <div className="flex items-center gap-3 mb-2">
              <Skeleton className="w-8 h-8 rounded-lg" />
              <Skeleton className="h-5 w-40" />
            </div>
            {Array.from({ length: rows }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full rounded-xl" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DoctorDetail() {
  const { id }                = useParams();
  const { doctors, patients } = useClinic();
  const navigate              = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  const doctor = doctors.find((d) => d.id === id);

  if (!isLoading && !doctor) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-4">
        <div className="text-7xl">🩺</div>
        <h2 className="text-2xl font-bold text-gray-800">Dokter Tidak Ditemukan</h2>
        <p className="text-gray-500">
          Data dokter dengan ID <span className="font-mono font-bold text-[#1A7C6E]">{id}</span> tidak tersedia.
        </p>
        <Button onClick={() => navigate("/doctors")}>
          <FaArrowLeft /> Kembali ke Daftar Dokter
        </Button>
      </div>
    );
  }

  const handledPatients = doctor ? patients.filter((p) => p.dokter === doctor.nama) : [];
  const keahlian        = doctor?.keahlian || [`${doctor?.spesialis}`, "Konsultasi Gigi Umum", "Pemeriksaan Rutin"];
  const pendidikan      = doctor?.pendidikan || [
    { tahun: "2018", institusi: "Universitas Indonesia", gelar: `Spesialis ${doctor?.spesialis}` },
    { tahun: "2014", institusi: "Universitas Gadjah Mada", gelar: "Sarjana Kedokteran Gigi" },
  ];

  const patientColumns = [
    {
      key: "nama",
      label: "Nama Pasien",
      render: (val) => (
        <div className="flex items-center gap-2">
          <Avatar name={val} size="xs" color="bg-[#E8F8F6] text-[#1A7C6E]" />
          <span className="font-medium text-gray-800">{val}</span>
        </div>
      ),
    },
    { key: "treatment", label: "Treatment", render: (v) => v || "-" },
    {
      key: "status",
      label: "Status",
      render: (val) => <Badge variant={PATIENT_STATUS_BADGE[val] || "default"} dot>{val}</Badge>,
    },
  ];

  return (
    <div className="flex flex-col w-full pb-10">

      {/* Breadcrumb */}
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="sm" onClick={() => navigate("/doctors")}>
          <FaArrowLeft /> Kembali
        </Button>
        <div className="h-4 w-px bg-gray-200" />
        <p className="text-sm text-gray-400">
          <span className="text-gray-500 font-medium">Daftar Dokter</span>
          <span className="mx-2">/</span>
          <span className="text-[#1A7C6E] font-semibold">Detail Dokter</span>
        </p>
      </div>

      {/* ─── Skeleton saat loading ─── */}
      {isLoading ? <DetailSkeleton /> : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Profil */}
          <div className="lg:col-span-1">
            <Card padding="none">
              <div className="h-28 w-full rounded-t-2xl"
                style={{ background: "linear-gradient(135deg, #1A7C6E22 0%, #1A7C6E33 100%)" }} />
              <div className="px-6 pb-6 -mt-12 flex flex-col items-center text-center">
                <Avatar name={doctor.nama.replace("drg. ", "")} size="xl" shape="square" color="bg-[#E8F8F6] text-[#1A7C6E]" />
                <h1 className="mt-4 text-xl font-bold text-gray-800">{doctor.nama}</h1>
                <p className="text-sm text-[#1A7C6E] font-semibold mt-1">{doctor.spesialis}</p>
                <p className="text-xs text-gray-400 font-mono mt-1">{doctor.id}</p>
                <div className="mt-2">
                  <Badge variant={STATUS_BADGE[doctor.status] || "default"} dot size="md">{doctor.status}</Badge>
                </div>
                <div className="mt-6 w-full space-y-3 text-left">
                  <InfoRow icon={<FaPhone />}       label="Nomor HP"       value={doctor.noHp} />
                  <InfoRow icon={<FaEnvelope />}    label="Email"          value={doctor.email} />
                  <InfoRow icon={<FaCalendarAlt />} label="Jadwal Praktik" value={doctor.jadwal} />
                  <InfoRow icon={<FaUsers />}       label="Total Pasien"   value={`${handledPatients.length} Pasien`} />
                </div>
                {handledPatients.length > 0 && (
                  <div className="mt-5 w-full">
                    <p className="text-xs text-gray-400 mb-2 text-left">Pasien yang ditangani</p>
                    <AvatarGroup avatars={handledPatients.map((p) => ({ name: p.nama }))} max={5} size="sm" />
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Konten kanan */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            <Card title="Spesialis & Keahlian" padding="md">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                {keahlian.map((k, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-[#E8F8F6] border border-[#1A7C6E]/10">
                    <div className="w-7 h-7 rounded-lg bg-[#1A7C6E] text-white flex items-center justify-center shrink-0">
                      <FaStar className="text-xs" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{k}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="Riwayat Pendidikan" padding="md">
              <div className="space-y-4 mt-2">
                {pendidikan.map((p, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-[#1A7C6E] mt-1 shrink-0" />
                      {idx < pendidikan.length - 1 && <div className="w-0.5 h-8 bg-gray-200 mt-1" />}
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-mono">{p.tahun}</p>
                      <p className="font-semibold text-gray-800 text-sm">{p.gelar}</p>
                      <p className="text-xs text-gray-500">{p.institusi}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="Pasien yang Ditangani" padding="none"
              headerAction={<Badge variant="teal">{handledPatients.length} Pasien</Badge>}>
              {handledPatients.length === 0 ? (
                <div className="p-6">
                  <Alert variant="info">Belum ada pasien yang ditangani oleh dokter ini.</Alert>
                </div>
              ) : (
                <Table columns={patientColumns} data={handledPatients} className="border-0 rounded-none shadow-none" />
              )}
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card padding="md">
                <p className="text-xs text-gray-400 font-medium mb-1">Jadwal Praktik</p>
                <p className="font-bold text-sm text-[#1A7C6E]">{doctor.jadwal}</p>
              </Card>
              <Card padding="md">
                <p className="text-xs text-gray-400 font-medium mb-1">Status Dokter</p>
                <Badge variant={STATUS_BADGE[doctor.status] || "default"} dot size="md">{doctor.status}</Badge>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
      <div className="w-7 h-7 rounded-lg bg-[#E8F8F6] text-[#1A7C6E] flex items-center justify-center text-xs shrink-0 mt-0.5">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-sm font-semibold text-gray-700 break-all">{value}</p>
      </div>
    </div>
  );
}
