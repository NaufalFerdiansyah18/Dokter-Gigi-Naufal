import {
  FaUserMd,
  FaUserFriends,
  FaTooth,
  FaComments,
  FaExclamationTriangle,
  FaSignOutAlt,
  FaBullhorn,
  FaStar,
} from "react-icons/fa";
import {
  MdSpaceDashboard,
  MdOutlineSettings,
  MdOutlineLoyalty,
} from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";

const menuClass = ({ isActive }) =>
  `group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all duration-150 ${
    isActive
      ? "bg-white/20"
      : "hover:bg-white/10"
  }`;

const SectionLabel = ({ children }) => (
  <p style={{ color: '#ffffff' }} className="text-[10px] font-bold uppercase tracking-[0.2em] px-3.5 mb-1 mt-6 first:mt-0">
    {children}
  </p>
);

const ActionItem = ({ icon, label, onClick, danger }) => (
  <button
    onClick={onClick}
    style={{ color: danger ? '#fca5a5' : '#ffffff' }}
    className={`group w-full flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all duration-150 ${
      danger ? "hover:bg-red-500/20" : "hover:bg-white/10"
    }`}
  >
    <span className="w-7 h-7 rounded-lg flex items-center justify-center text-base flex-shrink-0">
      {icon}
    </span>
    <span>{label}</span>
  </button>
);

function MenuItem({ to, end, icon, label }) {
  return (
    <NavLink to={to} end={end} className={menuClass} style={{ color: '#ffffff' }}>
      {({ isActive }) => (
        <>
          <span
            className={`w-7 h-7 rounded-lg flex items-center justify-center text-base flex-shrink-0 transition-all duration-150 ${
              isActive ? "bg-white/25" : "bg-white/10"
            }`}
            style={{ color: '#ffffff' }}
          >
            {icon}
          </span>
          <span style={{ color: '#ffffff' }}>{label}</span>
          {isActive && (
            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />
          )}
        </>
      )}
    </NavLink>
  );
}

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside
      className="w-64 min-h-screen flex flex-col select-none"
      style={{
        background: "linear-gradient(160deg, #1A9E96 0%, #0F766E 40%, #0A5E58 75%, #084E4A 100%)",
      }}
    >
      {/* ── LOGO ── */}
      <div className="flex items-center gap-3 px-5 pt-6 pb-5 border-b border-white/10">
        <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0 border border-white/20">
          <FaTooth className="text-white text-lg -scale-x-100" />
        </div>
        <div className="leading-tight">
          <p className="text-[17px] font-extrabold tracking-tight" style={{ color: '#ffffff' }}>
            Nopal Dental Care
          </p>
          <p className="text-[10px] font-semibold tracking-[0.18em] uppercase mt-0.5" style={{ color: '#ffffff' }}>
            Admin Panel
          </p>
        </div>
      </div>

      {/* ── SCROLLABLE MENU ── */}
      <div className="flex-1 overflow-y-auto px-3 pb-3">

        <SectionLabel>Utama</SectionLabel>
        <nav className="space-y-0.5">
          <MenuItem to="/dashboard" end icon={<MdSpaceDashboard />} label="Dashboard" />
        </nav>

        <SectionLabel>Klinik</SectionLabel>
        <nav className="space-y-0.5">
          <MenuItem to="/doctors"  icon={<FaUserMd />}      label="Doctors"  />
          <MenuItem to="/pasien"   icon={<FaUserFriends />}  label="Patients" />
        </nav>

        <SectionLabel>CRM & Pemasaran</SectionLabel>
        <nav className="space-y-0.5">
          <MenuItem to="/crm-pasien"     icon={<MdOutlineLoyalty />}      label="CRM Pasien"      />
          <MenuItem to="/campaign-promo" icon={<FaBullhorn />}             label="Campaign & Promo" />
          <MenuItem to="/feedback"       icon={<FaStar />}                 label="Feedback & Rating" />
          <MenuItem to="/complaints"     icon={<FaExclamationTriangle />}  label="Complaints"      />
          <MenuItem to="/chat-admin"     icon={<FaComments />}             label="Chat Admin"      />
        </nav>

        <SectionLabel>Akun</SectionLabel>
        <nav className="space-y-0.5">
          <ActionItem
            icon={<MdOutlineSettings />}
            label="Pengaturan"
            onClick={() => {}}
          />
          <ActionItem
            icon={<FaSignOutAlt />}
            label="Keluar"
            onClick={() => {
              localStorage.removeItem("isLoggedIn");
              localStorage.removeItem("user_email");
              localStorage.removeItem("user_role");
              navigate("/login");
            }}
            danger
          />
        </nav>

      </div>

    </aside>
  );
}
