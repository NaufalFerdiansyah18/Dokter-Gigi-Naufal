import { useState, useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../../../services/supabaseClient";
import {
  FaTooth,
  FaCalendarAlt,
  FaHistory,
  FaCreditCard,
  FaGift,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaBell,
  FaCog,
} from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";

const menuItems = [
  { to: "/member", icon: <MdSpaceDashboard />, label: "Dashboard", end: true },
  { to: "/member/booking", icon: <FaCalendarAlt />, label: "Booking Janji" },
  { to: "/member/riwayat", icon: <FaHistory />, label: "Riwayat Medis" },
  { to: "/member/transaksi", icon: <FaCreditCard />, label: "Transaksi" },
  { to: "/member/loyalty", icon: <FaGift />, label: "Loyalty & Promo" },
];

export default function MemberLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserData() {
      const userEmail = localStorage.getItem("user_email");
      if (!userEmail) {
        navigate("/login");
        return;
      }

      const { data: publicUserData } = await supabase
        .from("users")
        .select("*")
        .eq("email", userEmail)
        .single();

      if (publicUserData) {
        setUserData(publicUserData);
      } else {
        // Fallback jika data tidak ada di public.users
        const { data: authData } = await supabase.auth.getUser();
        setUserData({
          email: authData.user?.email || userEmail,
          username: authData.user?.email?.split("@")[0] || "User",
          full_name: authData.user?.email?.split("@")[0] || "User",
        });
      }
    }
    fetchUserData();
  }, [navigate]);

  const displayName = userData?.full_name || userData?.username || userData?.email?.split("@")[0] || "User";
  const userInitial = displayName.charAt(0).toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user_email");
    localStorage.removeItem("user_role");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex w-64 bg-gradient-to-b from-[#0F766E] to-[#0A5E58] text-white flex-col">
        {/* Logo Section */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <FaTooth className="text-white text-lg -scale-x-100" />
            </div>
            <div>
              <p className="text-lg font-extrabold">Nopal Dental Care</p>
              <p className="text-[10px] text-white/70 font-semibold tracking-widest uppercase">Member Area</p>
            </div>
          </div>
        </div>

        {/* Menu Section */}
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive ? "bg-white/20" : "hover:bg-white/10"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-white/10 space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold hover:bg-white/10 transition-all">
            <FaCog className="text-lg" />
            <span>Settings</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold hover:bg-red-500/20 text-red-200 transition-all"
          >
            <FaSignOutAlt className="text-lg" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`lg:hidden fixed top-0 left-0 bottom-0 w-64 bg-gradient-to-b from-[#0F766E] to-[#0A5E58] text-white z-50 transform transition-transform flex flex-col ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <FaTooth className="text-white text-lg -scale-x-100" />
            </div>
            <div>
              <p className="text-lg font-extrabold">Nopal Dental Care</p>
              <p className="text-[10px] text-white/70 font-semibold tracking-widest uppercase">Member</p>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)}>
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Menu Section */}
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive ? "bg-white/20" : "hover:bg-white/10"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-white/10 space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold hover:bg-white/10 transition-all">
            <FaCog className="text-lg" />
            <span>Settings</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold hover:bg-red-500/20 text-red-200 transition-all"
          >
            <FaSignOutAlt className="text-lg" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-gray-600 hover:text-gray-900 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FaBars className="text-lg" />
            </button>

            <div className="hidden lg:block">
              <h1 className="text-lg font-bold text-gray-900">Member Dashboard</h1>
              <p className="text-xs text-gray-500">Selamat datang kembali!</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <FaBell className="text-lg" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
            </button>

            <div className="h-8 w-px bg-gray-200 hidden sm:block" />

            <button
              onClick={() => navigate("/member/profil")}
              className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all hover:bg-gray-100 hover:shadow-sm active:scale-95"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0F766E] to-[#14B8A6] text-white flex items-center justify-center text-sm font-bold shadow-sm">
                {userInitial}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold text-gray-900">{displayName}</p>
                <p className="text-xs text-gray-500">{userData?.role === "admin" ? "Admin" : "Member"}</p>
              </div>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
