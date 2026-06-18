import { Routes, Route, Navigate } from "react-router-dom";
import { ClinicProvider } from "./assets/pertemuan-5/context/ClinicContext";
import { MainLayout } from "./assets/pertemuan-5/layouts/MainLayout";
import AuthLayout from "./assets/pertemuan-5/layouts/AuthLayouth";
import GuestLayout from "./assets/pertemuan-5/layouts/GuestLayout";
import MemberLayout from "./assets/pertemuan-5/layouts/MemberLayout";
import React, { Suspense } from "react";


const Dashboard = React.lazy(() => import("./assets/pertemuan-5/pages/main/Dashboard"))
const Doctors = React.lazy(() => import("./assets/pertemuan-5/pages/main/Doctors"))
const Pasien = React.lazy(() => import("./assets/pertemuan-5/pages/main/Pasien"))
const ChatAdmin = React.lazy(() => import("./assets/pertemuan-5/pages/main/ChatAdmin"))
const FinancialCRM = React.lazy(() => import("./assets/pertemuan-5/pages/main/FinancialCRM"))
const ComplaintResolution = React.lazy(() => import("./assets/pertemuan-5/pages/main/ComplaintResolution"))
const NotFound = React.lazy(() => import("./assets/pertemuan-5/pages/main/NotFound"))
const PatientDetail = React.lazy(() => import("./assets/pertemuan-5/pages/main/PatientDetail"))
const DoctorDetail = React.lazy(() => import("./assets/pertemuan-5/pages/main/DoctorDetail"))
const PasienCRM = React.lazy(() => import("./assets/pertemuan-5/pages/main/PasienCRM"))
const CampaignPromo = React.lazy(() => import("./assets/pertemuan-5/pages/main/CampaignPromo"))
const FeedbackRating = React.lazy(() => import("./assets/pertemuan-5/pages/main/FeedbackRating"))
const NotificationSettings = React.lazy(() => import("./assets/pertemuan-5/pages/main/NotificationSettings"))

const GuestBeranda  = React.lazy(() => import("./assets/pertemuan-5/pages/guest/GuestBeranda"))
const GuestJadwal   = React.lazy(() => import("./assets/pertemuan-5/pages/guest/GuestJadwal"))
const GuestLayanan  = React.lazy(() => import("./assets/pertemuan-5/pages/guest/GuestLayanan"))
const GuestDokter   = React.lazy(() => import("./assets/pertemuan-5/pages/guest/GuestDokter"))
const GuestHarga    = React.lazy(() => import("./assets/pertemuan-5/pages/guest/GuestHarga"))
const GuestChat     = React.lazy(() => import("./assets/pertemuan-5/pages/guest/GuestChat"))
const GuestKomplain = React.lazy(() => import("./assets/pertemuan-5/pages/guest/GuestKomplain"))
const GuestPromo    = React.lazy(() => import("./assets/pertemuan-5/pages/guest/GuestPromo"))

const MemberDashboard = React.lazy(() => import("./assets/pertemuan-5/pages/member/MemberDashboard"))
const MemberBooking   = React.lazy(() => import("./assets/pertemuan-5/pages/member/MemberBooking"))
const MemberRiwayat   = React.lazy(() => import("./assets/pertemuan-5/pages/member/MemberRiwayat"))
const MemberTransaksi = React.lazy(() => import("./assets/pertemuan-5/pages/member/MemberTransaksi"))
const MemberLoyalty   = React.lazy(() => import("./assets/pertemuan-5/pages/member/MemberLoyalty"))
const MemberChat      = React.lazy(() => import("./assets/pertemuan-5/pages/member/MemberChat"))
const MemberProfil    = React.lazy(() => import("./assets/pertemuan-5/pages/member/MemberProfil"))

const Register = React.lazy(() => import("./assets/pertemuan-5/pages/auth/Register"))
const Login = React.lazy(() => import("./assets/pertemuan-5/pages/auth/Login"))
const Forgot = React.lazy(() => import("./assets/pertemuan-5/pages/auth/Forgot"))
const Loading = React.lazy(() => import("./assets/pertemuan-5/components/Loading"))








// Protected Route untuk Member Area
function ProtectedMemberRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userRole = localStorage.getItem("user_role");
  
  console.log("ProtectedMemberRoute check:", { isLoggedIn, userRole });
  
  if (!isLoggedIn) {
    console.log("Not logged in, redirecting to /login");
    return <Navigate to="/login" replace />;
  }
  
  // Admin tidak bisa akses member area
  if (userRole === "admin") {
    console.log("User is admin, redirecting to /dashboard");
    return <Navigate to="/dashboard" replace />;
  }
  
  console.log("Access granted to member area");
  return children;
}

function App() {
  return (
    <ClinicProvider>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Navigate to="/guest" replace />} />
          
          {/* Admin Routes */}
          <Route element={<MainLayout />} >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/doctors/:id" element={<DoctorDetail />} />
            <Route path="/pasien" element={<Pasien />} />
            <Route path="/pasien/:id" element={<PatientDetail />} />
            <Route path="/chat-admin" element={<ChatAdmin />} />
            <Route path="/financial-crm" element={<FinancialCRM />} />
            <Route path="/complaints" element={<ComplaintResolution />} />
            <Route path="/crm-pasien"     element={<PasienCRM />} />
            <Route path="/campaign-promo" element={<CampaignPromo />} />
            <Route path="/feedback"       element={<FeedbackRating />} />
            <Route path="/notification-settings" element={<NotificationSettings />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          
          {/* Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<Forgot />} />
          </Route>
          
          {/* Guest Routes (Public) */}
          <Route element={<GuestLayout />}>
            <Route path="/guest"          element={<GuestBeranda />} />
            <Route path="/guest/layanan"  element={<GuestLayanan />} />
            <Route path="/guest/dokter"   element={<GuestDokter />} />
            <Route path="/guest/harga"    element={<GuestHarga />} />
            <Route path="/guest/jadwal"   element={<GuestJadwal />} />
            <Route path="/guest/chat"     element={<GuestChat />} />
            <Route path="/guest/komplain" element={<GuestKomplain />} />
            <Route path="/guest/promo"    element={<GuestPromo />} />
          </Route>

          {/* Member Routes (Protected) */}
          <Route element={<MemberLayout />}>
            <Route path="/member" element={<ProtectedMemberRoute><MemberDashboard /></ProtectedMemberRoute>} />
            <Route path="/member/booking" element={<ProtectedMemberRoute><MemberBooking /></ProtectedMemberRoute>} />
            <Route path="/member/riwayat" element={<ProtectedMemberRoute><MemberRiwayat /></ProtectedMemberRoute>} />
            <Route path="/member/transaksi" element={<ProtectedMemberRoute><MemberTransaksi /></ProtectedMemberRoute>} />
            <Route path="/member/loyalty" element={<ProtectedMemberRoute><MemberLoyalty /></ProtectedMemberRoute>} />
            <Route path="/member/chat" element={<ProtectedMemberRoute><MemberChat /></ProtectedMemberRoute>} />
            <Route path="/member/profil" element={<ProtectedMemberRoute><MemberProfil /></ProtectedMemberRoute>} />
          </Route>

          {/* 404 Catch All */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </ClinicProvider>
  );
}

export default App;
