import { useParams, useNavigate } from "react-router-dom";
import { useClinic } from "../../context/ClinicContext";
import {
  FaArrowLeft, FaPhone, FaUserMd, FaTooth,
  FaCalendarCheck, FaMapMarkerAlt, FaVenusMars,
  FaBirthdayCake, FaClipboardList, FaHistory,
} from "react-icons/fa";

import Button      from "../../components/Button";
import Badge       from "../../components/Badge";
import Avatar      from "../../components/Avatar";
import Card        from "../../components/Card";
import Table       from "../../components/Table";
import Alert       from "../../components/Alert";
import ProgressBar from "../../components/ProgressBar";

const STATUS_BADGE = {
  Active:    "success",
  Waiting:   "warning",
  Completed: "teal",
  Cancel:    "danger",
};

export default function PatientDetail() {
  const { id }          = useParams();
  const { patients }    = useClinic();
  const navigate        = useNavigate();

  const patient = patients.find((p) => p.id === id);

  if (!patient) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-4">
        <div className="text-7xl">🦷</div>
        <h2 className="text-2xl font-bold text-gray-800">Pasien Tidak Ditemukan</h2>
        <p className="text-gray-500">
          Data pasien dengan ID <span className="font-mono font-bold text-[#1A7C6E]">{id}</span> tidak tersedia.
        </p>
        <Button variant="primary" leftIcon={<FaArrowLeft />} onClick={() => navigate("/pasien")}>
          Kembali ke Daftar Pasien
        </Button>
      </div>
    );
  }

  const riwayatPerawatan = patient.riwayatPerawatan || [
    { tanggal: patient.terakhirKunjungan || "-", tindakan: patient.treatment || "-", dokter: patient.dokter || "-" },
  ];
  const jadwalKontrol = patient.jadwalKontrol || null;
  const keluhan       = patient.keluhan || patient.treatment || "-";

  const riwayatColumns = [
    { key: "tanggal",  label: "Tanggal",  render: (v) => <span className="font-mono text-xs text-gray-500">{v}</span> },
    { key: "tindakan", label: "Tindakan", render: (v) => <span className="font-medium text-gray-800">{v}</span> },
    { key: "dokter",   label: "Dokter" },
  ];

  return (
    <div className="flex flex-col w-full pb-10">

      {/* Breadcrumb */}
      <div className="flex items-center gap-3 mb-6">
        <Button
          variant="ghost"
          size="sm"
          leftIcon={<FaArrowLeft />}
          onClick={() => navigate("/pasien")}
        >
          Kembali
        </Button>
        <div className="h-4 w-px bg-gray-200" />
        <p className="text-sm text-gray-400">
          <span className="text-gray-500 font-medium">Daftar Pasien</span>
          <span className="mx-2">/</span>
          <span className="text-[#1A7C6E] font-semibold">Detail Pasien</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Profil */}
        <div className="lg:col-span-1">
          <Card padding="none">
            <div
              className="h-28 w-full rounded-t-2xl"
              style={{ background: "linear-gradient(135deg, #1A7C6E22 0%, #2BB5A033 100%)" }}
            />
            <div className="px-6 pb-6 -mt-12 flex flex-col items-center text-center">
              <Avatar
                name={patient.nama}
                size="xl"
                shape="square"
                color="bg-[#E8F8F6] text-[#1A7C6E]"
              />
              <h1 className="mt-4 text-xl font-bold text-gray-800">{patient.nama}</h1>
              <p className="text-xs text-gray-400 font-mono mt-1">{patient.id}</p>
              <div className="mt-2">
                <Badge variant={STATUS_BADGE[patient.status] || "default"} dot size="md">
                  {patient.status}
                </Badge>
              </div>

              <div className="mt-6 w-full space-y-3 text-left">
                <InfoRow icon={<FaBirthdayCake />}  label="Umur"          value={`${patient.umur} Tahun`} />
                <InfoRow icon={<FaVenusMars />}      label="Jenis Kelamin" value={patient.jenisKelamin === "L" ? "Laki-laki ♂" : "Perempuan ♀"} />
                <InfoRow icon={<FaPhone />}          label="Nomor HP"      value={patient.noHp} />
                <InfoRow icon={<FaMapMarkerAlt />}   label="Alamat"        value={patient.alamat || "-"} />
                <InfoRow icon={<FaUserMd />}         label="Dokter"        value={patient.dokter || "-"} />
              </div>
            </div>
          </Card>
        </div>

        {/* Konten kanan */}
        <div className="lg:col-span-2 flex flex-col gap-6">

          {/* Keluhan & Treatment */}
          <Card title="Keluhan & Treatment" padding="md">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div className="p-4 rounded-xl bg-[#E8F8F6] border border-[#1A7C6E]/20">
                <p className="text-xs font-medium text-[#1A7C6E]/70 mb-1">Keluhan Utama</p>
                <p className="font-bold text-sm text-[#1A7C6E]">{keluhan}</p>
              </div>
              <div className="p-4 rounded-xl bg-orange-50 border border-orange-200/50">
                <p className="text-xs font-medium text-orange-400 mb-1">Treatment Saat Ini</p>
                <p className="font-bold text-sm text-orange-600">{patient.treatment || "-"}</p>
              </div>
            </div>
          </Card>

          {/* Jadwal Kontrol */}
          {jadwalKontrol ? (
            <Card title="Jadwal Kontrol Berikutnya" padding="md">
              <div className="mt-2 p-4 rounded-xl bg-[#E8F8F6] border border-[#1A7C6E]/20 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#1A7C6E] text-white flex items-center justify-center text-xl shadow shrink-0">
                  <FaCalendarCheck />
                </div>
                <div>
                  <p className="font-bold text-gray-800">{jadwalKontrol.tanggal}</p>
                  <p className="text-sm text-gray-500">{jadwalKontrol.keterangan}</p>
                </div>
              </div>
            </Card>
          ) : (
            <Alert variant="info" title="Belum ada jadwal kontrol">
              Pasien ini belum memiliki jadwal kontrol berikutnya.
            </Alert>
          )}

          {/* Riwayat Perawatan */}
          <Card title="Riwayat Perawatan" padding="none">
            <Table
              columns={riwayatColumns}
              data={riwayatPerawatan}
              emptyText="Belum ada riwayat perawatan."
              className="border-0 rounded-none shadow-none"
            />
          </Card>

          {/* Info Kunjungan */}
          <Card title="Info Kunjungan" padding="md">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                <p className="text-xs font-medium text-blue-400 mb-1">Terakhir Kunjungan</p>
                <p className="font-bold text-sm text-blue-700">{patient.terakhirKunjungan || "-"}</p>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                <p className="text-xs font-medium text-gray-400 mb-2">Status Pasien</p>
                <Badge variant={STATUS_BADGE[patient.status] || "default"} dot size="md">
                  {patient.status}
                </Badge>
              </div>
            </div>

            {/* Progress treatment */}
            <div className="mt-4">
              <ProgressBar
                label="Progress Treatment"
                value={
                  patient.status === "Completed" ? 100 :
                  patient.status === "Active"    ? 60  :
                  patient.status === "Waiting"   ? 20  : 0
                }
                color={
                  patient.status === "Completed" ? "teal"   :
                  patient.status === "Active"    ? "blue"   :
                  patient.status === "Waiting"   ? "yellow" : "red"
                }
                size="md"
              />
            </div>
          </Card>

        </div>
      </div>
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
        <p className="text-sm font-semibold text-gray-700 truncate">{value}</p>
      </div>
    </div>
  );
}
