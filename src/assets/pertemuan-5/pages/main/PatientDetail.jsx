import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useClinic } from "../../context/ClinicContext";
import {
  FaArrowLeft, FaPhone, FaUserMd,
  FaCalendarCheck, FaMapMarkerAlt, FaVenusMars, FaBirthdayCake,
  FaEnvelope, FaMobile, FaShieldAlt, FaCity, FaUser,
} from "react-icons/fa";

import Badge       from "../../components/Badge";
import Avatar      from "../../components/Avatar";
import Card        from "../../components/Card";
import Alert       from "../../components/Alert";
import ProgressBar from "../../components/ProgressBar";
import Tabs        from "../../components/Tabs";

import { Button }   from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const STATUS_BADGE = { Active: "success", Waiting: "warning", Completed: "teal", Cancel: "danger" };
const LEVEL_COLOR  = {
  Platinum: "bg-purple-100 text-purple-700",
  Gold:     "bg-yellow-100 text-yellow-700",
  Silver:   "bg-gray-100 text-gray-600",
  Bronze:   "bg-orange-100 text-orange-600",
};

function DetailSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <Skeleton className="h-28 w-full rounded-none" />
          <div className="px-6 pb-6 -mt-10 flex flex-col items-center gap-3">
            <Skeleton className="w-20 h-20 rounded-2xl" />
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-5 w-16 rounded-full" />
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex gap-3 py-2 border-b border-gray-50 w-full">
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
      <div className="lg:col-span-2 flex flex-col gap-6">
        <Skeleton className="h-12 w-full rounded-xl" />
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-3">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-20 w-full rounded-xl" />
          <Skeleton className="h-20 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ icon, title, color = "bg-[#E8F8F6] text-[#1A7C6E]" }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${color}`}>
        {icon}
      </div>
      <h2 className="font-bold text-gray-800 text-base">{title}</h2>
    </div>
  );
}

export default function PatientDetail() {
  const { id }       = useParams();
  const { patients } = useClinic();
  const navigate     = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  const patient = patients.find((p) => p.id === id);

  if (!isLoading && !patient) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-4">
        <div className="text-7xl">🦷</div>
        <h2 className="text-2xl font-bold text-gray-800">Pasien Tidak Ditemukan</h2>
        <p className="text-gray-500">
          Data pasien dengan ID <span className="font-mono font-bold text-[#1A7C6E]">{id}</span> tidak tersedia.
        </p>
        <Button onClick={() => navigate("/pasien")}>
          <FaArrowLeft /> Kembali ke Daftar Pasien
        </Button>
      </div>
    );
  }

  const detailTabs = [
    { key: "overview", label: "Overview & Profil",  icon: <FaUser /> },
    { key: "akun",     label: "Akun & Aktivitas",   icon: <FaShieldAlt /> },
  ];

  return (
    <div className="flex flex-col w-full pb-10">

      {/* Breadcrumb */}
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="sm" onClick={() => navigate("/pasien")}>
          <FaArrowLeft /> Kembali
        </Button>
        <div className="h-4 w-px bg-gray-200" />
        <p className="text-sm text-gray-400">
          <span className="text-gray-500 font-medium">Daftar Pasien</span>
          <span className="mx-2">/</span>
          <span className="text-[#1A7C6E] font-semibold">Detail Pasien</span>
        </p>
      </div>

      {isLoading ? <DetailSkeleton /> : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── Kolom Kiri: Profil ── */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <Card padding="none">
              <div className="h-28 w-full rounded-t-2xl"
                style={{ background: "linear-gradient(135deg, #1A7C6E22 0%, #2BB5A033 100%)" }} />
              <div className="px-6 pb-6 -mt-12 flex flex-col items-center text-center">
                <Avatar name={patient.nama} size="xl" shape="square" color="bg-[#E8F8F6] text-[#1A7C6E]" />
                <h1 className="mt-4 text-xl font-bold text-gray-800">{patient.nama}</h1>
                <p className="text-xs text-gray-400 font-mono mt-1">{patient.id}</p>
                <div className="mt-2 flex gap-2 flex-wrap justify-center">
                  <Badge variant={STATUS_BADGE[patient.status] || "default"} dot size="md">{patient.status}</Badge>
                  {patient.levelMembership && (
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${LEVEL_COLOR[patient.levelMembership] || "bg-gray-100 text-gray-600"}`}>
                      {patient.levelMembership}
                    </span>
                  )}
                </div>
                <div className="mt-6 w-full space-y-1 text-left">
                  <InfoRow icon={<FaBirthdayCake />} label="Tanggal Lahir" value={patient.tanggalLahir ? new Date(patient.tanggalLahir).toLocaleDateString("id-ID", { day:"numeric", month:"long", year:"numeric" }) : `${patient.umur} Tahun`} />
                  <InfoRow icon={<FaVenusMars />}    label="Jenis Kelamin" value={patient.jenisKelamin === "L" ? "Laki-laki ♂" : "Perempuan ♀"} />
                  <InfoRow icon={<FaPhone />}         label="Nomor HP"      value={patient.noHp} />
                  <InfoRow icon={<FaEnvelope />}      label="Email"         value={patient.email || "-"} />
                  <InfoRow icon={<FaMapMarkerAlt />}  label="Alamat"        value={patient.alamat || "-"} />
                  <InfoRow icon={<FaCity />}          label="Kota/Provinsi" value={patient.kotaProvinsi || "-"} />
                  <InfoRow icon={<FaUserMd />}        label="Dokter Utama"  value={patient.dokter || "-"} />
                </div>
              </div>
            </Card>
          </div>

          {/* ── Kolom Kanan: Tab ── */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            <Card padding="none" className="overflow-hidden">
              <Tabs tabs={detailTabs} activeKey={activeTab} onChange={setActiveTab} variant="underline" className="px-2" />
            </Card>

            {/* TAB 1: OVERVIEW */}
            {activeTab === "overview" && (
              <div className="flex flex-col gap-6">
                <Card title="Keluhan & Treatment Saat Ini" padding="md">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                    <div className="p-4 rounded-xl bg-[#E8F8F6] border border-[#1A7C6E]/20">
                      <p className="text-xs font-medium text-[#1A7C6E]/70 mb-1">Keluhan Utama</p>
                      <p className="font-bold text-sm text-[#1A7C6E]">{patient.keluhan || "-"}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-orange-50 border border-orange-200/50">
                      <p className="text-xs font-medium text-orange-400 mb-1">Jenis Perawatan</p>
                      <p className="font-bold text-sm text-orange-600">{patient.jenisPerawatan || patient.treatment || "-"}</p>
                    </div>
                  </div>
                </Card>

                {patient.jadwalKontrol ? (
                  <Card title="Jadwal Kontrol Berikutnya" padding="md">
                    <div className="mt-2 p-4 rounded-xl bg-[#E8F8F6] border border-[#1A7C6E]/20 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#1A7C6E] text-white flex items-center justify-center text-xl shadow shrink-0">
                        <FaCalendarCheck />
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">{patient.jadwalKontrol.tanggal}</p>
                        <p className="text-sm text-gray-500">{patient.jadwalKontrol.keterangan}</p>
                      </div>
                    </div>
                  </Card>
                ) : (
                  <Alert variant="info" title="Belum ada jadwal kontrol">
                    Pasien ini belum memiliki jadwal kontrol berikutnya.
                  </Alert>
                )}

                <Card title="Info Kunjungan & Progress" padding="md">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                    <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                      <p className="text-xs font-medium text-blue-400 mb-1">Terakhir Kunjungan</p>
                      <p className="font-bold text-sm text-blue-700">{patient.terakhirKunjungan || "-"}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <p className="text-xs font-medium text-gray-400 mb-2">Status Pasien</p>
                      <Badge variant={STATUS_BADGE[patient.status] || "default"} dot size="md">{patient.status}</Badge>
                    </div>
                  </div>
                  <div className="mt-4">
                    <ProgressBar
                      label="Progress Treatment"
                      value={patient.status === "Completed" ? 100 : patient.status === "Active" ? 60 : patient.status === "Waiting" ? 20 : 0}
                      color={patient.status === "Completed" ? "teal" : patient.status === "Active" ? "blue" : patient.status === "Waiting" ? "yellow" : "red"}
                      size="md"
                    />
                  </div>
                </Card>
              </div>
            )}

            {/* TAB 2: AKUN & AKTIVITAS */}
            {activeTab === "akun" && (
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Card padding="md">
                    <SectionHeader icon={<FaShieldAlt />} title="Membership & Akun" color="bg-blue-50 text-blue-600" />
                    <div className="space-y-3">
                      <InfoRowInline label="Tanggal Terdaftar" value={patient.tanggalDaftar ? new Date(patient.tanggalDaftar).toLocaleDateString("id-ID", { day:"numeric", month:"long", year:"numeric" }) : "-"} />
                      <InfoRowInline label="Tipe Membership"   value={patient.statusMember || "-"} />
                      <InfoRowInline label="Tingkatan (Level)" value={
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${LEVEL_COLOR[patient.levelMembership] || "bg-gray-100 text-gray-500"}`}>
                          {patient.levelMembership || "-"}
                        </span>
                      } />
                      <InfoRowInline label="Status Keaktifan" value={
                        <Badge variant={patient.statusAktif ? "success" : "danger"} dot>
                          {patient.statusAktif ? "Aktif" : "Nonaktif"}
                        </Badge>
                      } />
                    </div>
                  </Card>

                  <Card padding="md">
                    <SectionHeader icon={<FaMobile />} title="Aktivitas Login & System" color="bg-purple-50 text-purple-600" />
                    <div className="space-y-3">
                      <InfoRowInline label="Koneksi Terakhir"  value={patient.loginTerakhir ? new Date(patient.loginTerakhir).toLocaleString("id-ID") : "-"} />
                      <InfoRowInline label="Model Perangkat"   value={patient.deviceDigunakan || "-"} />
                      <InfoRowInline label="Durasi Sesi Aktif" value={patient.durasiPenggunaan || "-"} />
                    </div>
                  </Card>
                </div>
              </div>
            )}

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
        <p className="text-sm font-semibold text-gray-700 break-words">{value}</p>
      </div>
    </div>
  );
}

function InfoRowInline({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-2 py-1.5 border-b border-gray-50 last:border-0">
      <p className="text-xs text-gray-400 shrink-0">{label}</p>
      <div className="text-sm font-semibold text-gray-700 text-right">{value}</div>
    </div>
  );
}
