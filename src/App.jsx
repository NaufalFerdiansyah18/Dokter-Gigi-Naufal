import { Routes, Route } from "react-router-dom";
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
// import Login from "./assets/pertemuan-5/pages/auth/Login";
// import Register from "./assets/pertemuan-5/pages/auth/Register";
// import Forgot from "./assets/pertemuan-5/pages/auth/Forgot";
import React, { Suspense } from "react";
// import Loading from "./assets/pertemuan-5/components/Loading";


const Dashboard = React.lazy(() => import("./assets/pertemuan-5/pages/main/Dashboard"))
const Doctors = React.lazy(() => import("./assets/pertemuan-5/pages/main/Doctors"))
const Pasien = React.lazy(() => import("./assets/pertemuan-5/pages/main/Pasien"))
const NotFound = React.lazy(() => import("./assets/pertemuan-5/pages/main/NotFound"))
const Error400 = React.lazy(() => import("./assets/pertemuan-5/pages/main/Error400"))
const Error401 = React.lazy(() => import("./assets/pertemuan-5/pages/main/Error401"))
const Error403 = React.lazy(() => import("./assets/pertemuan-5/pages/main/Error403"))
const PatientDetail = React.lazy(() => import("./assets/pertemuan-5/pages/main/PatientDetail"))
const DoctorDetail = React.lazy(() => import("./assets/pertemuan-5/pages/main/DoctorDetail"))



const Register = React.lazy(() => import("./assets/pertemuan-5/pages/auth/Register"))
const Login = React.lazy(() => import("./assets/pertemuan-5/pages/auth/Login"))
const Forgot = React.lazy(() => import("./assets/pertemuan-5/pages/auth/Forgot"))
const Loading = React.lazy(() => import("./assets/pertemuan-5/components/Loading"))








function App() {
  return (
    <ClinicProvider>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<MainLayout />} >
            <Route path="/" element={<Dashboard />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/doctors/:id" element={<DoctorDetail />} />
            <Route path="/pasien" element={<Pasien />} />
            <Route path="/pasien/:id" element={<PatientDetail />} />
            <Route path="/error-400" element={<Error400 />} />
            <Route path="/error-401" element={<Error401 />} />
            <Route path="/error-403" element={<Error403 />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<Forgot />} />
          </Route>
        </Routes>
      </Suspense>
    </ClinicProvider>
  );
}

export default App;
