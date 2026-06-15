import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../../services/supabaseClient";
import {
  FaCalendarCheck,
  FaCoins,
  FaStar,
  FaGift,
  FaTooth,
  FaCalendarAlt,
  FaComments,
  FaCreditCard,
} from "react-icons/fa";

function StatCard({ icon, label, value, color, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow ${
        onClick ? "cursor-pointer" : ""
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">{label}</p>
          <p className="text-3xl font-extrabold text-gray-900">{value}</p>
        </div>
        <div
          className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center text-white text-xl`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

function QuickAction({ icon, label, onClick, color }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-3 p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:scale-105"
    >
      <div className={`w-14 h-14 rounded-xl ${color} flex items-center justify-center text-white text-2xl`}>
        {icon}
      </div>
      <span className="text-sm font-semibold text-gray-700">{label}</span>
    </button>
  );
}

export default function MemberDashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

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
        const { data: authData } = await supabase.auth.getUser();
        setUserData({
          email: authData.user.email,
          username: authData.user.email.split("@")[0],
          full_name: authData.user.email.split("@")[0],
          levelMembership: "Bronze",
          loyaltyPoints: 0,
        });
      }
      setLoading(false);
    }
    fetchUserData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-gray-500">Memuat dashboard...</div>
      </div>
    );
  }

  const displayName = userData?.full_name || userData?.username || userData?.email?.split("@")[0] || "Member";
  const levelMembership = userData?.levelMembership || "Bronze";
  const loyaltyPoints = userData?.loyaltyPoints || 0;

  const levelColors = {
    Platinum: "from-purple-500 to-purple-700",
    Gold: "from-yellow-400 to-yellow-600",
    Silver: "from-gray-400 to-gray-600",
    Bronze: "from-orange-400 to-orange-600",
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className={`bg-gradient-to-r ${levelColors[levelMembership]} rounded-2xl p-8 text-white`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <p className="text-white/80 text-sm mb-1">Selamat Datang Kembali!</p>
            <h1 className="text-3xl font-extrabold mb-2">{displayName}</h1>
            <div className="flex items-center gap-3">
              <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full border border-white/30">
                {levelMembership} Member
              </span>
              <span className="text-white/80 text-sm">
                <FaCoins className="inline mr-1" />
                {loyaltyPoints} Poin
              </span>
            </div>
          </div>
          <button
            onClick={() => navigate("/member/loyalty")}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold px-6 py-3 rounded-xl transition-colors border border-white/30"
          >
            Lihat Benefit
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<FaCalendarCheck />}
          label="Total Kunjungan"
          value="12"
          color="bg-blue-500"
          onClick={() => navigate("/member/riwayat")}
        />
        <StatCard
          icon={<FaCoins />}
          label="Poin Loyalty"
          value={loyaltyPoints}
          color="bg-yellow-500"
          onClick={() => navigate("/member/loyalty")}
        />
        <StatCard
          icon={<FaStar />}
          label="Level Member"
          value={levelMembership}
          color="bg-purple-500"
        />
        <StatCard
          icon={<FaGift />}
          label="Voucher Aktif"
          value="3"
          color="bg-green-500"
          onClick={() => navigate("/member/loyalty")}
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <QuickAction
            icon={<FaCalendarAlt />}
            label="Booking Janji"
            color="bg-[#0F766E]"
            onClick={() => navigate("/member/booking")}
          />
          <QuickAction
            icon={<FaTooth />}
            label="Riwayat Medis"
            color="bg-blue-500"
            onClick={() => navigate("/member/riwayat")}
          />
          <QuickAction
            icon={<FaComments />}
            label="Chat Dokter"
            color="bg-green-500"
            onClick={() => navigate("/member/chat")}
          />
          <QuickAction
            icon={<FaCreditCard />}
            label="Transaksi"
            color="bg-purple-500"
            onClick={() => navigate("/member/transaksi")}
          />
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Jadwal Konsultasi Terdekat</h2>
          <button
            onClick={() => navigate("/member/booking")}
            className="text-sm text-[#0F766E] font-semibold hover:underline"
          >
            Lihat Semua
          </button>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
            <div className="w-12 h-12 rounded-xl bg-[#0F766E] text-white flex flex-col items-center justify-center">
              <span className="text-xs font-semibold">JAN</span>
              <span className="text-lg font-bold">25</span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Scaling & Pembersihan Karang Gigi</p>
              <p className="text-sm text-gray-500">Dr. Sarah - 10:00 WIB</p>
            </div>
            <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
              Terkonfirmasi
            </span>
          </div>
          <div className="text-center py-8 text-gray-400 text-sm">
            Belum ada jadwal lainnya. <button onClick={() => navigate("/member/booking")} className="text-[#0F766E] font-semibold hover:underline">Booking sekarang</button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Aktivitas Terakhir</h2>
        <div className="space-y-3">
          {[
            { date: "20 Jan 2025", action: "Pembayaran berhasil", amount: "Rp 250.000", status: "success" },
            { date: "18 Jan 2025", action: "Booking konfirmasi", amount: "Scaling Gigi", status: "info" },
            { date: "15 Jan 2025", action: "Poin loyalty ditambahkan", amount: "+50 Poin", status: "warning" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-4 border-b border-gray-100 last:border-0">
              <div>
                <p className="font-semibold text-gray-900">{item.action}</p>
                <p className="text-sm text-gray-500">{item.date}</p>
              </div>
              <span
                className={`text-sm font-semibold ${
                  item.status === "success"
                    ? "text-green-600"
                    : item.status === "warning"
                    ? "text-yellow-600"
                    : "text-blue-600"
                }`}
              >
                {item.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
