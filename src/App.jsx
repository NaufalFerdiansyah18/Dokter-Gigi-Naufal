import { Routes, Route, Navigate } from "react-router-dom";
import { ClinicProvider } from "./assets/pertemuan-5/context/ClinicContext";
// import Dashboard from "./assets/pertemuan-5/pages/main/Dashboard";
// // import Orders from "./assets/pertemuan-5/pages/main/Orders";
// import Customer from "./assets/pertemuan-5/pages/main/Customer";
// import NotFound from "./assets/pertemuan-5/pages/main/NotFound";
// import Error400 from "./assets/pertemuan-5/pages/main/Error400";
// import Error401 from "./assets/pertemuan-5/pages/main/Error401";
// import Error403 from "./assets/pertemuan-5/pages/main/Error403";
import { MainLayout } from "./assets/pertemuan-5/layouts/MainLayout";
import AuthLayout from "./assets/pertemuan-5/layouts/AuthLayouth";
import GuestLayout from "./assets/pertemuan-5/layouts/GuestLayout";
// import Login from "./assets/pertemuan-5/pages/auth/Login";
// import Register from "./assets/pertemuan-5/pages/auth/Register";
// import Forgot from "./assets/pertemuan-5/pages/auth/Forgot";
import React, { Suspense } from "react";
// import Loading from "./assets/pertemuan-5/components/Loading";


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

const GuestBeranda  = React.lazy(() => import("./assets/pertemuan-5/pages/guest/GuestBeranda"))
const GuestJadwal   = React.lazy(() => import("./assets/pertemuan-5/pages/guest/GuestJadwal"))
const GuestLayanan  = React.lazy(() => import("./assets/pertemuan-5/pages/guest/GuestLayanan"))
const GuestDokter   = React.lazy(() => import("./assets/pertemuan-5/pages/guest/GuestDokter"))
const GuestHarga    = React.lazy(() => import("./assets/pertemuan-5/pages/guest/GuestHarga"))
const GuestChat     = React.lazy(() => import("./assets/pertemuan-5/pages/guest/GuestChat"))
const GuestKomplain = React.lazy(() => import("./assets/pertemuan-5/pages/guest/GuestKomplain"))
const GuestProfil   = React.lazy(() => import("./assets/pertemuan-5/pages/guest/GuestProfil"))
const GuestPromo    = React.lazy(() => import("./assets/pertemuan-5/pages/guest/GuestPromo"))



const Register = React.lazy(() => import("./assets/pertemuan-5/pages/auth/Register"))
const Login = React.lazy(() => import("./assets/pertemuan-5/pages/auth/Login"))
const Forgot = React.lazy(() => import("./assets/pertemuan-5/pages/auth/Forgot"))
const Loading = React.lazy(() => import("./assets/pertemuan-5/components/Loading"))








function ProtectedGuestRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  return (
    <ClinicProvider>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Navigate to="/guest" replace />} />
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
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route index element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<Forgot />} />
          </Route>
          <Route element={<GuestLayout />}>
            <Route path="/guest"          element={<GuestBeranda />} />
            <Route path="/guest/layanan"  element={<GuestLayanan />} />
            <Route path="/guest/dokter"   element={<GuestDokter />} />
            <Route path="/guest/harga"    element={<GuestHarga />} />
            <Route path="/guest/jadwal"   element={<GuestJadwal />} />
            <Route path="/guest/chat"     element={<GuestChat />} />
            <Route path="/guest/komplain" element={<GuestKomplain />} />
            <Route path="/guest/promo"    element={<GuestPromo />} />
            <Route path="/guest/profil"   element={<ProtectedGuestRoute><GuestProfil /></ProtectedGuestRoute>} />
          </Route>
        </Routes>
      </Suspense>
    </ClinicProvider>
  );
}

export default App;
