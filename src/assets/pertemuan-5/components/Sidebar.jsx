import {
  FaUserMd,
  FaUserFriends,
  FaPlus,
  FaExclamationTriangle,
  FaLock,
  FaBan,
  FaTooth,
} from "react-icons/fa";

import { MdSpaceDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";

const menuClass = ({ isActive }) =>
  `group flex items-center rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
    isActive
      ? "bg-[#0F766E] text-white shadow-sm"
      : "text-[#8A92A6] hover:bg-[#F3F4F6] hover:text-[#0F766E]"
  }`;

const iconClass = ({ isActive }) =>
  `${
    isActive
      ? "text-white"
      : "text-[#8A92A6] group-hover:text-[#0F766E]"
  } transition-colors duration-200`;

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-[#F8F9FB] border-r border-gray-200 flex flex-col">

      {/* HEADER */}
      <div className="h-16 flex items-center px-6 border-b border-gray-200 bg-white">

        <div className="flex items-center gap-3">

          {/* LOGO */}
          <div className="w-10 h-10 rounded-xl bg-[#0F766E] flex items-center justify-center shadow-sm">
            <FaTooth className="text-white text-lg -scale-x-100" />
          </div>

          {/* TEXT */}
          <div>
            <h1 className="text-[22px] font-[800] text-gray-900 leading-none tracking-tight">
              Nopall UI
            </h1>

            <p className="text-[10px] font-semibold text-[#8A92A6] tracking-[0.2em] uppercase mt-1">
              Dental Clinic
            </p>
          </div>

        </div>
      </div>

      {/* MENU */}
      <div className="flex-1 px-4 py-6 overflow-y-auto">

        {/* MAIN MENU */}
        <div className="mb-3 px-3">
          <p className="text-[11px] uppercase tracking-widest text-[#8A92A6] font-bold">
            Main Menu
          </p>
        </div>

        <nav className="space-y-1">

          <NavLink to="/" className={menuClass}>
            {({ isActive }) => (
              <>
                <MdSpaceDashboard
                  className={`text-lg mr-3 ${iconClass({ isActive })}`}
                />
                <span>Dashboard</span>
              </>
            )}
          </NavLink>

          <NavLink to="/doctors" className={menuClass}>
            {({ isActive }) => (
              <>
                <FaUserMd
                  className={`text-base mr-3 ${iconClass({ isActive })}`}
                />
                <span>Doctors</span>
              </>
            )}
          </NavLink>

          <NavLink to="/pasien" className={menuClass}>
            {({ isActive }) => (
              <>
                <FaUserFriends
                  className={`text-base mr-3 ${iconClass({ isActive })}`}
                />
                <span>Patients</span>
              </>
            )}
          </NavLink>

        </nav>

        {/* ERROR MENU */}
        <div className="mt-8 mb-3 px-3">
          <p className="text-[11px] uppercase tracking-widest text-[#8A92A6] font-bold">
            Error Pages
          </p>
        </div>

        <nav className="space-y-1">

          <NavLink to="/error-400" className={menuClass}>
            {({ isActive }) => (
              <>
                <FaExclamationTriangle
                  className={`text-sm mr-3 ${iconClass({ isActive })}`}
                />
                <span>Error 400</span>
              </>
            )}
          </NavLink>

          <NavLink to="/error-401" className={menuClass}>
            {({ isActive }) => (
              <>
                <FaLock
                  className={`text-sm mr-3 ${iconClass({ isActive })}`}
                />
                <span>Error 401</span>
              </>
            )}
          </NavLink>

          <NavLink to="/error-403" className={menuClass}>
            {({ isActive }) => (
              <>
                <FaBan
                  className={`text-sm mr-3 ${iconClass({ isActive })}`}
                />
                <span>Error 403</span>
              </>
            )}
          </NavLink>

        </nav>

        {/* CARD */}
        <div className="mt-10 bg-gradient-to-br from-[#0F766E] to-[#14B8A6] rounded-2xl p-5 text-white relative overflow-hidden">

          {/* BACKGROUND CIRCLE */}
          <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-white/10"></div>

          <div className="relative z-10">

            {/* PROFILE */}
            <img
              className="w-14 h-14 rounded-full border-2 border-white object-cover mb-4"
              src="https://avatar.iran.liara.run/public/boy?username=Ash"
              alt="Profile"
            />

            <h3 className="font-bold text-sm mb-1">
              Dental Clinic System
            </h3>

            <p className="text-xs text-white/80 leading-relaxed mb-4">
              Organize your doctors and patients easily with modern dashboard UI.
            </p>

            <button className="w-full bg-white text-[#0F766E] font-semibold text-xs rounded-xl py-2.5 flex items-center justify-center gap-2 hover:bg-gray-100 transition">
              <FaPlus className="text-[10px]" />
              Add Menus
            </button>

          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="px-6 py-4 border-t border-gray-200 bg-white">

        <p className="text-xs font-semibold text-[#8A92A6]">
          Naufal Dental Clinic
        </p>

        <p className="text-[11px] text-[#8A92A6] mt-1">
          © 2025 All Rights Reserved
        </p>

      </div>
    </aside>
  );
}