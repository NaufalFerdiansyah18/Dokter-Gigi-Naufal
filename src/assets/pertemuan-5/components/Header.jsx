import { useState, useEffect, useRef } from "react";
import { FaBell, FaSearch, FaTimes } from "react-icons/fa";
import { FcAreaChart } from "react-icons/fc";
import { SlSettings } from "react-icons/sl";
import { orders, STATUS_CONFIG } from "../data/ordersData.jsx";

// Improvisasi 3: Live Clock
function LiveClock() {
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);
    return (
        <div className="flex flex-col items-end select-none">
            <span className="text-base font-bold text-gray-800 tabular-nums leading-tight">
                {time.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
            </span>
            <span className="text-[10px] text-gray-400 font-medium">
                {time.toLocaleDateString("id-ID", { weekday: "short", day: "numeric", month: "short" })}
            </span>
        </div>
    );
}

export default function Header() {
    const [query, setQuery] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const wrapperRef = useRef(null);

    // Tutup dropdown saat klik di luar
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filtered = query.trim()
        ? orders.filter((o) =>
            o.customer.toLowerCase().includes(query.toLowerCase()) ||
            o.id.toLowerCase().includes(query.toLowerCase())
        )
        : [];

    return (
        <div className="flex justify-between items-center mb-8 gap-6">

            {/* Improvisasi 1: Search Bar dengan Dropdown */}
            <div className="relative flex-1 max-w-md" ref={wrapperRef}>
                <div className="flex items-center bg-white border border-gray-100 px-5 py-3 rounded-xl shadow-sm gap-3">
                    <FaSearch className="text-gray-300 text-sm shrink-0" />
                    <input
                        type="text"
                        value={query}
                        placeholder="Cari nama pelanggan..."
                        className="flex-1 outline-none text-sm text-gray-600 placeholder:text-gray-300 bg-transparent"
                        onChange={(e) => { setQuery(e.target.value); setShowDropdown(true); }}
                        onFocus={() => setShowDropdown(true)}
                    />
                    {query && (
                        <button onClick={() => { setQuery(""); setShowDropdown(false); }}>
                            <FaTimes className="text-gray-300 hover:text-gray-400 text-sm" />
                        </button>
                    )}
                </div>

                {/* Dropdown hasil pencarian */}
                {showDropdown && query.trim() && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-100 rounded-xl shadow-lg z-20 overflow-hidden">
                        {filtered.length > 0 ? (
                            <>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 pt-3 pb-1">
                                    Hasil ({filtered.length})
                                </p>
                                {filtered.map((order, idx) => {
                                    const s = STATUS_CONFIG[order.status];
                                    return (
                                        <div
                                            key={order.id}
                                            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                                            onClick={() => { setQuery(order.customer); setShowDropdown(false); }}
                                        >
                                            <img
                                                src={`https://avatar.iran.liara.run/public/${idx % 2 === 0 ? "boy" : "girl"}?username=${order.customer}`}
                                                className="w-8 h-8 rounded-full object-cover shrink-0"
                                                alt={order.customer}
                                            />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-semibold text-gray-800 truncate">{order.customer}</p>
                                                <p className="text-[11px] text-gray-400 truncate font-barlow">{order.menu}</p>
                                            </div>
                                            <div className="flex items-center gap-2 shrink-0">
                                                <span className="text-[11px] font-mono text-gray-400">{order.id}</span>
                                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${s.bg} ${s.text}`}>
                                                    {s.label}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </>
                        ) : (
                            <div className="px-4 py-5 text-center">
                                <p className="text-sm text-gray-400">Pelanggan tidak ditemukan</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Icons & Profile */}
            <div className="flex items-center gap-3">
                <LiveClock />
                <div className="w-px h-8 bg-gray-200" />

                <div className="relative p-2.5 bg-blue-50 rounded-xl text-blue-400 cursor-pointer hover:bg-blue-100 transition-colors">
                    <FaBell className="text-base" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-400 rounded-full border border-white" />
                </div>

                <div className="p-2.5 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                    <FcAreaChart className="text-base" />
                </div>

                <div className="p-2.5 bg-red-50 rounded-xl text-red-300 cursor-pointer hover:bg-red-100 transition-colors">
                    <SlSettings className="text-base" />
                </div>

                <div className="w-px h-8 bg-gray-200" />

                <div className="flex items-center gap-3 cursor-pointer">
                    <div className="text-right">
                        <p className="text-[10px] text-gray-400 font-medium leading-none mb-0.5">Hello,</p>
                        <p className="text-sm font-bold text-gray-800 leading-tight"> Naufal Ferdiansyah Putra</p>
                    </div>
                    <img
                        src="https://avatar.iran.liara.run/public/boy?username=Fikri"
                        className="w-10 h-10 rounded-full border-2 border-gray-100 object-cover"
                        alt="Profile"
                    />
                </div>
            </div>
        </div>
    );
}
