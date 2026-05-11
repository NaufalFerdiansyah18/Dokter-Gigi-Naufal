import { FaUserMd, FaUserFriends, FaPlus, FaExclamationTriangle, FaLock, FaBan, FaTooth } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";

const menuClass = ({ isActive }) =>
  `flex cursor-pointer items-center rounded-xl p-4 space-x-2 ${isActive
    ? "text-[#2BB5A0] bg-[#E8F8F6] font-extrabold"
    : "text-gray-500 hover:text-[#2BB5A0] hover:bg-[#E8F8F6] hover:font-extrabold"
  }`;

export default function Sidebar() {
  return (
    <div className="flex flex-col w-64 min-h-screen bg-white border-r border-gray-100 py-8 px-6">

      {/* Logo */}
      <div className="mb-10 flex items-center gap-2.5">
        <FaTooth className="text-[32px] text-[#2BB5A0] -scale-x-100" />
        <div>
          <span className="block text-[22px] font-[800] text-gray-900 leading-none tracking-tight font-poppins">
            nopall
          </span>
          <span className="block text-[9px] font-semibold text-gray-400 mt-0.5 tracking-widest uppercase font-barlow">
            DENTAL CLINIC SYSTEM
          </span>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1">
        <ul className="space-y-1">
          <li>
            <NavLink id="menu-1" to="/" className={menuClass}>
              <MdSpaceDashboard className="mr-4 text-xl" />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink id="menu-2" to="/doctors" className={menuClass}>
              <FaUserMd className="text-base shrink-0" />
              <span>Doctors</span>
            </NavLink>
          </li>
          <li>
            <NavLink id="menu-3" to="/pasien" className={menuClass}>
              <FaUserFriends className="text-base shrink-0" />
              <span>Pasien</span>
            </NavLink>
          </li>

          {/* Divider */}
          <li className="pt-3 pb-1 px-2">
            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Error Pages</span>
          </li>
          <li>
            <NavLink id="menu-4" to="/error-400" className={menuClass}>
              <FaExclamationTriangle className="text-base shrink-0" />
              <span>Error 400</span>
            </NavLink>
          </li>
          <li>
            <NavLink id="menu-5" to="/error-401" className={menuClass}>
              <FaLock className="text-base shrink-0" />
              <span>Error 401</span>
            </NavLink>
          </li>
          <li>
            <NavLink id="menu-6" to="/error-403" className={menuClass}>
              <FaBan className="text-base shrink-0" />
              <span>Error 403</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Footer Banner */}
      <div className="mt-8">
        <div className="bg-[#2BB5A0] rounded-2xl p-4 mb-6 relative overflow-hidden">
          {/* Decorative circle */}
          <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10" />

          {/* Avatar */}
          <div className="flex justify-end mb-2">
            <img
              className="w-14 h-14 rounded-full border-2 border-white object-cover"
              src="https://avatar.iran.liara.run/public/boy?username=Ash"
              alt="Guide"
            />
          </div>

          <p className="text-white text-xs font-medium leading-relaxed mb-3">
            Please organize your menus through button below!
          </p>
          <button className="flex items-center gap-1.5 bg-white text-gray-700 px-3 py-2 rounded-lg font-bold text-xs hover:bg-gray-50 transition-colors w-full justify-center">
            <FaPlus className="text-[10px]" />
            <span>Add Menus</span>
          </button>
        </div>

        <div className="px-1">
          <p className="font-bold text-[#2BB5A0] text-[11px] leading-snug">
            Dentiva Dental Clinic
          </p>
          <p className="text-gray-400 text-[11px] mt-0.5">
            © 2025 All Right Reserved
          </p>
        </div>
      </div>
    </div>
  );
}
