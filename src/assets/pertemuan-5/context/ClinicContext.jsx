import React, { createContext, useContext, useState } from "react";

const INITIAL_DOCTORS = [
  {
    id: "DR-001",
    nama: "drg. Amanda",
    spesialis: "Orthodontist",
    noHp: "081223344556",
    email: "amanda@dentiva.com",
    jadwal: "Senin - Jumat",
    status: "Active",
    keahlian: ["Pemasangan Behel", "Retainer & Aligner", "Koreksi Gigitan", "Konsultasi Ortodonti"],
    pendidikan: [
      { tahun: "2019", institusi: "Universitas Indonesia", gelar: "Spesialis Ortodonti" },
      { tahun: "2015", institusi: "Universitas Padjadjaran", gelar: "Sarjana Kedokteran Gigi" },
    ],
  },
  {
    id: "DR-002",
    nama: "drg. Reza",
    spesialis: "General Dentist",
    noHp: "081334455667",
    email: "reza@dentiva.com",
    jadwal: "Selasa - Sabtu",
    status: "Active",
    keahlian: ["Tambal Gigi", "Cabut Gigi", "Scaling & Pembersihan", "Pemeriksaan Rutin"],
    pendidikan: [
      { tahun: "2017", institusi: "Universitas Gadjah Mada", gelar: "Sarjana Kedokteran Gigi" },
      { tahun: "2018", institusi: "PDGI Jakarta", gelar: "Sertifikasi Dokter Gigi Umum" },
    ],
  },
  {
    id: "DR-003",
    nama: "drg. Sinta",
    spesialis: "Cosmetic Dentist",
    noHp: "081445566778",
    email: "sinta@dentiva.com",
    jadwal: "Senin, Rabu, Jumat",
    status: "Inactive",
    keahlian: ["Veneer Gigi", "Whitening & Bleaching", "Smile Design", "Crown & Bridge"],
    pendidikan: [
      { tahun: "2020", institusi: "Universitas Airlangga", gelar: "Spesialis Kedokteran Gigi Estetik" },
      { tahun: "2016", institusi: "Universitas Brawijaya", gelar: "Sarjana Kedokteran Gigi" },
    ],
  }
];


const INITIAL_PATIENTS = [
  {
    id: "PS-001",
    nama: "Andi Pratama",
    umur: 25,
    jenisKelamin: "L",
    noHp: "081234567890",
    alamat: "Pekanbaru, Riau",
    terakhirKunjungan: "2026-05-20",
    keluhan: "Gigi sensitif & karang gigi",
    treatment: "Scaling",
    dokter: "drg. Amanda",
    status: "Active",
    riwayatPerawatan: [
      { tanggal: "2026-05-20", tindakan: "Scaling Gigi", dokter: "drg. Amanda" },
      { tanggal: "2026-03-10", tindakan: "Konsultasi & Pemeriksaan", dokter: "drg. Amanda" },
      { tanggal: "2025-12-05", tindakan: "Scaling Gigi", dokter: "drg. Reza" },
    ],
    jadwalKontrol: { tanggal: "2026-06-20", keterangan: "Kontrol Scaling & Pemeriksaan Rutin" },
  },
  {
    id: "PS-002",
    nama: "Siti Nurhaliza",
    umur: 30,
    jenisKelamin: "P",
    noHp: "081345678901",
    alamat: "Kampar, Riau",
    terakhirKunjungan: "2026-05-01",
    keluhan: "Gigi berlubang sebelah kanan",
    treatment: "Tambal Gigi",
    dokter: "drg. Reza",
    status: "Waiting",
    riwayatPerawatan: [
      { tanggal: "2026-05-01", tindakan: "Tambal Gigi (Komposit)", dokter: "drg. Reza" },
      { tanggal: "2026-04-10", tindakan: "Rontgen Gigi", dokter: "drg. Reza" },
    ],
    jadwalKontrol: { tanggal: "2026-06-01", keterangan: "Kontrol Tambal Gigi" },
  },
  {
    id: "PS-003",
    nama: "Budi Santoso",
    umur: 45,
    jenisKelamin: "L",
    noHp: "085234567890",
    alamat: "Dumai, Riau",
    terakhirKunjungan: "2026-04-15",
    keluhan: "Warna gigi menguning",
    treatment: "Whitening",
    dokter: "drg. Sinta",
    status: "Completed",
    riwayatPerawatan: [
      { tanggal: "2026-04-15", tindakan: "Whitening Gigi (Laser)", dokter: "drg. Sinta" },
      { tanggal: "2026-03-20", tindakan: "Konsultasi Whitening", dokter: "drg. Sinta" },
      { tanggal: "2025-10-12", tindakan: "Scaling Gigi", dokter: "drg. Amanda" },
    ],
    jadwalKontrol: null,
  },
  {
    id: "PS-004",
    nama: "Dewi Kusuma",
    umur: 28,
    jenisKelamin: "P",
    noHp: "08122334455",
    alamat: "Siak, Riau",
    terakhirKunjungan: "2026-05-22",
    keluhan: "Sakit gigi geraham bawah",
    treatment: "Cabut Gigi",
    dokter: "drg. Reza",
    status: "Cancel",
    riwayatPerawatan: [
      { tanggal: "2026-05-22", tindakan: "Konsultasi Cabut Gigi", dokter: "drg. Reza" },
    ],
    jadwalKontrol: { tanggal: "2026-06-05", keterangan: "Reschedule Cabut Gigi" },
  },
];

const ClinicContext = createContext();

export function ClinicProvider({ children }) {
  const [doctors, setDoctors] = useState(INITIAL_DOCTORS);
  const [patients, setPatients] = useState(INITIAL_PATIENTS);

  return (
    <ClinicContext.Provider value={{ doctors, setDoctors, patients, setPatients }}>
      {children}
    </ClinicContext.Provider>
  );
}

export function useClinic() {
  return useContext(ClinicContext);
}
