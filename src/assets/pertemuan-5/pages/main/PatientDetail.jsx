import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useClinic } from "../../context/ClinicContext";
import { LOYALTY_CONFIG } from "../../data/ordersData";
import {
  FaArrowLeft, FaPhone, FaUserMd,
  FaCalendarCheck, FaMapMarkerAlt, FaVenusMars, FaBirthdayCake,
  FaEnvelope, FaStar, FaRegStar, FaMobile, FaClock, FaBullhorn,
  FaShieldAlt, FaCommentAlt, FaStickyNote, FaExclamationCircle,
  FaMoneyBillWave, FaCreditCard, FaCity, FaUser, FaHistory,
} from "react-icons/fa";

import Badge       from "../../components/Badge";
import Avatar      from "../../components/Avatar";
import Card        from "../../components/Card";
import Table       from "../../components/Table";
import Alert       from "../../components/Alert";
import ProgressBar from "../../components/ProgressBar";
import Tabs        from "../../components/Tabs";

import { Button }   from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const STATUS_BADGE  = { Active: "success", Waiting: "warning", Completed: "teal", Cancel: "danger" };
const LEVEL_COLOR   = { Platinum: "bg-purple-100 text-purple-700", Gold: "bg-yellow-100 text-yellow-700", Silver: "bg-gray-100 text-gray-600", Bronze: "bg-orange-100 text-orange-600" };
const KOMPLAIN_BADGE = { Resolved: "success", Pending: "warning", "In Progress": "teal" };

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

function StarRating({ value }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        i <= value
          ? <FaStar key={i} className="text-yellow-400 text-sm" />
          : <FaRegStar key={i} className="text-gray-300 text-sm" />
      ))}
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

  const riwayatPerawatan = patient?.riwayatPerawatan || [
    { tanggal: patient?.terakhirKunjungan || "-", tindakan: patient?.treatment || "-", dokter: patient?.dokter || "-", biaya: 0, metode: "-" },
  ];

  const riwayatColumns = [
    { key: "tanggal",  label: "Tanggal",  render: (v) => <span className="font-mono text-xs text-gray-500">{v}</span> },
    { key: "tindakan", label: "Tindakan", render: (v) => <span className="font-medium text-gray-800">{v}</span> },
    { key: "dokter",   label: "Dokter" },
    {
      key: "biaya",
      label: "Biaya",
      render: (v) => {
        const discountRate = LOYALTY_CONFIG[patient?.levelMembership] || 0;
        if (discountRate > 0 && v > 0) {
          const discounted = v * (1 - discountRate);
          return (
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="line-through text-gray-400 text-xs">Rp {v?.toLocaleString("id-ID")}</span>
                <span className="text-[10px] font-bold text-orange-500 bg-orange-50 px-1 py-0.5 rounded leading-none">
                  -{discountRate * 100}%
                </span>
              </div>
              <span className="font-semibold text-[#1A7C6E]">Rp {discounted.toLocaleString("id-ID")}</span>
            </div>
          );
        }
        return <span className="font-semibold text-gray-700">Rp {v?.toLocaleString("id-ID") ?? "-"}</span>;
      }
    },
    { key: "metode",   label: "Metode",   render: (v) => <span className="text-xs text-gray-500">{v || "-"}</span> },
  ];

  const komplainColumns = [
    { key: "tanggal", label: "Tanggal",  render: (v) => <span className="font-mono text-xs text-gray-500">{v}</span> },
    { key: "isi",     label: "Komplain", render: (v) => <span className="text-sm text-gray-700">{v}</span> },
    { key: "status",  label: "Status",   render: (v) => <Badge variant={KOMPLAIN_BADGE[v] || "default"} dot>{v}</Badge> },
  ];

  const detailTabs = [
    { key: "overview", label: "Overview & Profil", icon: <FaUser /> },
    { key: "transaksi", label: "Transaksi & Riwayat", icon: <FaHistory />, badge: riwayatPerawatan.length },
    { key: "akun", label: "Akun & Aktivitas", icon: <FaShieldAlt /> },
    { key: "engagement", label: "Engagement & Feedback", icon: <FaCommentAlt /> },
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

          {/* ── Kolom Kiri: Profil Utama & Kontak ── */}
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

                {/* Info Kontak Ringkas */}
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

          {/* ── Kolom Kanan: Detail Berdasarkan Tab ── */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* Tabs Control */}
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

            {/* TAB 2: TRANSAKSI & RIWAYAT PERAWATAN */}
            {activeTab === "transaksi" && (
              <div className="flex flex-col gap-6">
                <Card padding="md">
                  <SectionHeader icon={<FaMoneyBillWave />} title="Ringkasan Keuangan Pasien" color="bg-green-50 text-green-600" />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-green-50 border border-green-100 text-center">
                      <p className="text-xs text-green-500 mb-1">Total Akumulasi Transaksi</p>
                      <p className="font-bold text-green-700 text-lg">
                        Rp {patient.totalTransaksi?.toLocaleString("id-ID") ?? "0"}
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 text-center">
                      <p className="text-xs text-blue-500 mb-1 flex items-center justify-center gap-1"><FaCreditCard /> Metode Pembayaran Terakhir</p>
                      <p className="font-bold text-blue-700 text-sm">{patient.metodePembayaran || "-"}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 text-center">
                      <p className="text-xs text-gray-400 mb-1 flex items-center justify-center gap-1"><FaClock /> Kunjungan Terakhir</p>
                      <p className="font-bold text-gray-700 text-sm">{patient.terakhirKunjungan || "-"}</p>
                    </div>
                  </div>
                </Card>

                <Card title="Detail Sesi & Riwayat Tindakan" padding="none">
                  <Table columns={riwayatColumns} data={riwayatPerawatan}
                    emptyText="Belum ada riwayat perawatan."
                    className="border-0 rounded-none shadow-none" />
                </Card>
              </div>
            )}

            {/* TAB 3: AKUN & AKTIVITAS */}
            {activeTab === "akun" && (
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Membership Details */}
                  <Card padding="md">
                    <SectionHeader icon={<FaShieldAlt />} title="Membership & Akun" color="bg-blue-50 text-blue-600" />
                    <div className="space-y-3">
                      <InfoRowInline label="Tanggal Terdaftar" value={patient.tanggalDaftar ? new Date(patient.tanggalDaftar).toLocaleDateString("id-ID", { day:"numeric", month:"long", year:"numeric" }) : "-"} />
                      <InfoRowInline label="Tipe Membership"    value={patient.statusMember || "-"} />
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

                  {/* Device & Activity */}
                  <Card padding="md">
                    <SectionHeader icon={<FaMobile />} title="Aktivitas Login & System" color="bg-purple-50 text-purple-600" />
                    <div className="space-y-3">
                      <InfoRowInline label="Koneksi Terakhir"    value={patient.loginTerakhir ? new Date(patient.loginTerakhir).toLocaleString("id-ID") : "-"} />
                      <InfoRowInline label="Model Perangkat"   value={patient.deviceDigunakan || "-"} />
                      <InfoRowInline label="Durasi Sesi Aktif" value={patient.durasiPenggunaan || "-"} />
                    </div>
                  </Card>
                </div>
              </div>
            )}

            {/* TAB 4: ENGAGEMENT & FEEDBACK */}
            {activeTab === "engagement" && (
              <div className="flex flex-col gap-6">
                
                {/* Marketing & Sumber User */}
                <Card padding="md">
                  <SectionHeader icon={<FaBullhorn />} title="Sumber & Program Marketing" color="bg-orange-50 text-orange-600" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <InfoRowInline label="Sumber Akuisisi" value={patient.sumberUser || "-"} />
                      <InfoRowInline label="Status Promo" value={
                        <Badge variant={patient.statusPromo === "Aktif" ? "success" : "default"} dot>
                          {patient.statusPromo || "-"}
                        </Badge>
                      } />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Campaign yang Diikuti</p>
                      {patient.campaignDiikuti?.length ? (
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {patient.campaignDiikuti.map((c, i) => (
                            <span key={i} className="text-xs bg-orange-50 text-orange-600 border border-orange-200 px-2.5 py-0.5 rounded-full font-medium">{c}</span>
                          ))}
                        </div>
                      ) : <p className="text-sm text-gray-400 italic">Tidak ada campaign yang diikuti.</p>}
                    </div>
                  </div>

                  {/* Referral Section (Strategic CRM) */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Program Referral Pasien</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <InfoRowInline label="Kode Referral Unik" value={<span className="font-mono bg-teal-50 text-[#1A7C6E] font-bold px-2 py-0.5 rounded border border-teal-200">REF-{patient.id}</span>} />
                      </div>
                      <div>
                        <InfoRowInline label="Jumlah Referral Sukses" value={<span className="font-bold text-gray-700">2 Pasien</span>} />
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Review / Feedback */}
                <Card padding="md">
                  <SectionHeader icon={<FaCommentAlt />} title="Feedback & Ulasan Pasien" color="bg-yellow-50 text-yellow-600" />
                  {patient.feedbackReview ? (
                    <div className="p-4 rounded-xl bg-yellow-50 border border-yellow-200/50">
                      <div className="flex items-center gap-2 mb-2">
                        <StarRating value={patient.feedbackReview.rating} />
                        <span className="text-sm font-bold text-yellow-700">{patient.feedbackReview.rating}/5</span>
                        <span className="text-xs text-gray-400 ml-auto">{patient.feedbackReview.tanggal}</span>
                      </div>
                      <p className="text-sm text-gray-700 italic">"{patient.feedbackReview.komentar}"</p>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400 italic">Belum ada feedback / review dari pasien ini.</p>
                  )}
                </Card>

                {/* Komplain */}
                <Card padding="md">
                  <SectionHeader icon={<FaExclamationCircle />} title="Riwayat Keluhan & Komplain Layanan" color="bg-red-50 text-red-500" />
                  {patient.riwayatKomplain?.length ? (
                    <Table columns={komplainColumns} data={patient.riwayatKomplain}
                      emptyText="Tidak ada komplain."
                      className="border-0 rounded-none shadow-none -mx-4" />
                  ) : (
                    <p className="text-sm text-gray-400 italic">Tidak ada riwayat komplain.</p>
                  )}
                </Card>

                {/* Catatan Admin */}
                <Card padding="md">
                  <SectionHeader icon={<FaStickyNote />} title="Catatan Internal Staf / Admin" color="bg-indigo-50 text-indigo-600" />
                  <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100">
                    <p className="text-sm text-indigo-800 font-medium">{patient.catatanAdmin || "Tidak ada catatan internal."}</p>
                  </div>
                </Card>
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
