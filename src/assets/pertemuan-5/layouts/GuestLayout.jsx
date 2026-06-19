import { useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { FaTooth, FaBars, FaTimes, FaWhatsapp } from "react-icons/fa";

const navLinks = [
  { to: "/guest",          label: "Beranda" },
  { to: "/guest/layanan",  label: "Layanan" },
  { to: "/guest/dokter",   label: "Jadwal Dokter" },
  { to: "/guest/harga",    label: "Harga" },
  { to: "/guest/promo",    label: "Promo" },
  { to: "/guest/komplain", label: "Komplain" },
];

export default function GuestLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) =>
    path === "/guest"
      ? location.pathname === "/guest"
      : location.pathname.startsWith(path);

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* ── NAVBAR ── */}
      <header className="sticky top-0 z-50 bg-[#0F766E] border-b border-[#0A5E58] shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link to="/guest" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#0F766E] flex items-center justify-center shadow-sm">
              <FaTooth className="text-white text-base -scale-x-100" />
            </div>
            <div className="leading-tight">
              <span className="text-[16px] font-extrabold text-white">Nopal Dental Care</span>
              <p className="text-[9px] text-white/60 font-semibold tracking-widest uppercase -mt-0.5">Klinik Gigi</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                style={{ color: "white" }}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  isActive(item.to)
                    ? "bg-white/20 underline underline-offset-4"
                    : "hover:bg-white/10"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => navigate("/login")}
              style={{ color: "white" }}
              className="text-sm font-semibold hover:opacity-80 transition-opacity"
            >
              Login
            </button>
            <Link
              to="/guest/komplain"
              className="btn-hubungi bg-white hover:bg-gray-100 text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
            >
              Hubungi Kami
            </Link>
          </div>

          {/* Mobile menu btn */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-gray-500 hover:text-gray-800"
          >
            {mobileOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-1">
            {navLinks.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-2.5 text-sm font-semibold rounded-xl transition-colors ${
                  isActive(item.to)
                    ? "text-[#0F766E] bg-[#E8F8F6]"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-gray-100 mt-2 flex gap-2">
              <button
                onClick={() => { navigate("/login"); setMobileOpen(false); }}
                className="flex-1 py-2 text-sm font-semibold border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50"
              >
                Login
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ── PAGE CONTENT ── */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-[#0F766E] flex items-center justify-center">
                <FaTooth className="text-white text-sm -scale-x-100" />
              </div>
              <span className="font-extrabold text-lg">Nopal Dental Care</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Klinik gigi modern dengan teknologi terkini. Memberikan perawatan gigi terbaik untuk senyum lebih percaya diri.
            </p>
          </div>
          <div>
            <p className="font-bold text-sm mb-3 text-white">Layanan</p>
            {["Scaling Gigi", "Tambal Gigi", "Cabut Gigi", "Pemasangan Behel", "Whitening", "Veneer"].map((s) => (
              <p key={s} className="text-sm text-gray-400 mb-1 hover:text-[#14B8A6] cursor-pointer transition-colors">{s}</p>
            ))}
          </div>
          <div>
            <p className="font-bold text-sm mb-3 text-white">Kontak</p>
            <p className="text-sm text-gray-400 mb-1">📍 Jl. Sudirman No. 12, Pekanbaru</p>
            <p className="text-sm text-gray-400 mb-1">📞 0761-123456</p>
            <p className="text-sm text-gray-400 mb-1">✉️ info@nopaldentalcare.com</p>
            <p className="text-sm text-gray-400">🕐 Senin–Sabtu, 08:00–17:00</p>
          </div>
        </div>
        <div className="border-t border-gray-800 px-6 py-4 text-center">
          <p className="text-xs text-gray-500">© 2025 Nopal Dental Care. All rights reserved.</p>
        </div>
      </footer>

      {/* ── WHATSAPP FLOAT ── */}
      <a
        href="https://wa.me/6281234567890"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg text-2xl transition-colors z-50"
        title="Chat WhatsApp"
      >
        <FaWhatsapp />
      </a>
    </div>
  );
}
