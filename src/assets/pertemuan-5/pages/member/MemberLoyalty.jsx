import { useState, useEffect } from "react";
import { supabase } from "../../../../services/supabaseClient";
import { FaCoins, FaStar, FaGift, FaCrown, FaTrophy, FaCheckCircle, FaLock } from "react-icons/fa";
import RewardService from "../../../../services/rewardService";
import NotificationManager from "../../../../services/notificationService";

const levelBenefits = {
  Bronze: { points: "0-500", discount: "5%", priority: "Normal", freeCheckup: "1x/tahun" },
  Silver: { points: "501-1500", discount: "10%", priority: "Sedang", freeCheckup: "2x/tahun" },
  Gold: { points: "1501-3000", discount: "15%", priority: "Tinggi", freeCheckup: "3x/tahun" },
  Platinum: { points: "3000+", discount: "20%", priority: "VIP", freeCheckup: "4x/tahun" },
};

export default function MemberLoyalty() {
  const [userData, setUserData] = useState(null);
  const [vouchers, setVouchers] = useState([]);
  const [availableRewards, setAvailableRewards] = useState([]);
  const [voucherFilter, setVoucherFilter] = useState("active");
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);
  const [claimLoading, setClaimLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: "", type: "success" });

  useEffect(() => {
    async function fetchUserData() {
      try {
        const userEmail = localStorage.getItem("user_email");
        
        if (!userEmail) {
          console.error("No user email in localStorage");
          setUserData({ 
            levelMembership: "Bronze", 
            loyaltyPoints: 0,
            vouchers: [],
            name: "Guest",
            email: userEmail || "guest@example.com"
          });
          return;
        }
        
        const { data, error } = await supabase.from("users").select("*").eq("email", userEmail).single();
        
        if (error) {
          console.error("Error fetching user:", error);
          // Fallback data jika user tidak ada di database
          setUserData({ 
            levelMembership: "Bronze", 
            loyaltyPoints: 0,
            vouchers: [],
            name: userEmail.split("@")[0],
            email: userEmail
          });
          setVouchers([]);
          setAvailableRewards(RewardService.getAvailableRewards(0, "Bronze"));
          return;
        }
        
        const initialData = data || { 
          levelMembership: "Bronze", 
          loyaltyPoints: 0,
          vouchers: []
        };
        
        setUserData(initialData);
        setVouchers(initialData.vouchers || []);
        
        // Load available rewards
        const rewards = RewardService.getAvailableRewards(
          initialData.loyaltyPoints,
          initialData.levelMembership
        );
        setAvailableRewards(rewards);
      } catch (err) {
        console.error("Unexpected error:", err);
        // Fallback data
        setUserData({ 
          levelMembership: "Bronze", 
          loyaltyPoints: 0,
          vouchers: [],
          name: "Guest"
        });
        setVouchers([]);
        setAvailableRewards([]);
      }
    }
    fetchUserData();
  }, []);

  const level = userData?.levelMembership || "Bronze";
  const points = userData?.loyaltyPoints || 0;
  const levelColors = {
    Platinum: "from-purple-500 to-purple-700",
    Gold: "from-yellow-400 to-yellow-600",
    Silver: "from-gray-400 to-gray-600",
    Bronze: "from-orange-400 to-orange-600",
  };

  // Get upgrade info
  const upgradeInfo = RewardService.getUpgradeInfo(points, level);

  // Filter vouchers
  const filteredVouchers = RewardService.filterVouchers(vouchers, voucherFilter);

  // Handle claim reward
  const handleClaimReward = async () => {
    if (!selectedReward) return;

    setClaimLoading(true);

    try {
      // Claim reward
      const result = RewardService.claimReward(userData, selectedReward.id);

      if (!result.success) {
        setNotification({ show: true, message: result.message, type: "error" });
        setClaimLoading(false);
        return;
      }

      // Update vouchers
      const updatedVouchers = [...vouchers, result.voucher];
      setVouchers(updatedVouchers);

      // Update user data
      const updatedUserData = {
        ...userData,
        loyaltyPoints: result.updatedPoints,
        vouchers: updatedVouchers,
      };
      setUserData(updatedUserData);

      // Update available rewards
      const newAvailableRewards = RewardService.getAvailableRewards(
        result.updatedPoints,
        level
      );
      setAvailableRewards(newAvailableRewards);

      // Save to database (optional - untuk production)
      const userEmail = localStorage.getItem("user_email");
      await supabase
        .from("users")
        .update({
          loyaltyPoints: result.updatedPoints,
          vouchers: updatedVouchers,
        })
        .eq("email", userEmail);

      // Send notification
      await NotificationManager.sendLoyaltyReward(
        { nama: userData.name || "Member", noHp: userData.phone || "081234567890", levelMembership: level, loyaltyPoints: result.updatedPoints },
        { rewardName: selectedReward.name }
      );

      setNotification({ show: true, message: result.message, type: "success" });
      setShowClaimModal(false);
      setSelectedReward(null);
    } catch (error) {
      console.error("Claim error:", error);
      setNotification({ show: true, message: "Terjadi kesalahan saat klaim reward", type: "error" });
    }

    setClaimLoading(false);
  };

  // Handle use voucher
  const handleUseVoucher = (voucherId) => {
    const voucher = vouchers.find((v) => v.id === voucherId);
    if (!voucher) return;

    // Simulate using voucher (in real app, this happens during checkout)
    const updatedVouchers = vouchers.map((v) =>
      v.id === voucherId ? { ...v, used: true, usedDate: new Date().toISOString() } : v
    );
    setVouchers(updatedVouchers);

    // Update database
    const userEmail = localStorage.getItem("user_email");
    supabase.from("users").update({ vouchers: updatedVouchers }).eq("email", userEmail);

    setNotification({ show: true, message: "Voucher berhasil digunakan!", type: "success" });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Notification Toast */}
      {notification.show && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-xl shadow-lg ${notification.type === "success" ? "bg-green-500" : "bg-red-500"} text-white animate-fade-in`}>
          <p className="font-semibold flex items-center gap-2">
            {notification.type === "success" ? <FaCheckCircle /> : "⚠️"}
            {notification.message}
          </p>
          <button onClick={() => setNotification({ ...notification, show: false })} className="absolute top-2 right-2 text-white/70 hover:text-white">✕</button>
        </div>
      )}

      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Loyalty & Rewards</h1>
        <p className="text-gray-500">Poin, voucher, dan benefit membership Anda</p>
      </div>

      {/* Level Card */}
      <div className={`bg-gradient-to-r ${levelColors[level]} rounded-2xl p-8 text-white relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-white/80 text-sm mb-1">Current Level</p>
              <h2 className="text-4xl font-extrabold flex items-center gap-2">
                <FaCrown />
                {level} Member
              </h2>
            </div>
            <div className="text-right">
              <p className="text-white/80 text-sm mb-1">Total Poin</p>
              <p className="text-4xl font-extrabold">{points}</p>
            </div>
          </div>
          <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex justify-between text-sm mb-2">
              <span>{upgradeInfo.message}</span>
              <span>{upgradeInfo.canUpgrade ? "✨ Ready!" : `${upgradeInfo.pointsNeeded} poin lagi`}</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div className="bg-white rounded-full h-2 transition-all" style={{ width: `${upgradeInfo.progress}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Benefit {level} Member</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
            <FaStar className="text-3xl text-yellow-500 mx-auto mb-2" />
            <p className="text-xs text-gray-500 mb-1">Diskon</p>
            <p className="text-lg font-bold text-gray-900">{levelBenefits[level].discount}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
            <FaGift className="text-3xl text-green-500 mx-auto mb-2" />
            <p className="text-xs text-gray-500 mb-1">Free Checkup</p>
            <p className="text-lg font-bold text-gray-900">{levelBenefits[level].freeCheckup}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
            <FaCoins className="text-3xl text-orange-500 mx-auto mb-2" />
            <p className="text-xs text-gray-500 mb-1">Range Poin</p>
            <p className="text-lg font-bold text-gray-900">{levelBenefits[level].points}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
            <FaCrown className="text-3xl text-purple-500 mx-auto mb-2" />
            <p className="text-xs text-gray-500 mb-1">Priority</p>
            <p className="text-lg font-bold text-gray-900">{levelBenefits[level].priority}</p>
          </div>
        </div>
      </div>

      {/* Available Rewards to Claim */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <FaTrophy className="text-yellow-500" />
            Reward yang Bisa Diklaim
          </h2>
          <span className="text-sm text-gray-500">{availableRewards.length} rewards</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {availableRewards.length === 0 ? (
            <div className="col-span-3 py-12 text-center text-gray-400 border-2 border-dashed border-gray-200 rounded-2xl">
              <FaLock className="text-4xl mx-auto mb-2 text-gray-300" />
              <p className="font-semibold">Belum ada reward yang bisa diklaim</p>
              <p className="text-sm mt-1">Kumpulkan lebih banyak poin untuk unlock reward!</p>
            </div>
          ) : (
            availableRewards.map((reward) => {
              const canClaim = points >= reward.pointsRequired;
              return (
                <div key={reward.id} className={`rounded-2xl p-5 border-2 ${canClaim ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200" : "bg-gray-50 border-gray-200"}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-4xl">{reward.icon}</div>
                    {canClaim ? (
                      <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">✓ Available</span>
                    ) : (
                      <span className="bg-gray-300 text-gray-600 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                        <FaLock className="text-[10px]" /> Locked
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{reward.name}</h3>
                  <p className="text-xs text-gray-600 mb-3">{reward.description}</p>
                  <div className="flex items-center justify-between text-sm mb-3">
                    <span className="text-gray-500">Poin dibutuhkan:</span>
                    <span className="font-bold text-orange-600 flex items-center gap-1">
                      <FaCoins /> {reward.pointsRequired}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedReward(reward);
                      setShowClaimModal(true);
                    }}
                    disabled={!canClaim}
                    className={`w-full font-bold py-2 rounded-xl transition-colors ${
                      canClaim
                        ? "bg-[#0F766E] hover:bg-[#0A5E58] text-white"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {canClaim ? "Klaim Sekarang" : "Poin Tidak Cukup"}
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Vouchers */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Voucher Saya</h2>
          <div className="flex gap-2">
            {["active", "used", "expired", "all"].map((filter) => (
              <button
                key={filter}
                onClick={() => setVoucherFilter(filter)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  voucherFilter === filter
                    ? "bg-[#0F766E] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredVouchers.length === 0 ? (
            <div className="col-span-2 py-12 text-center text-gray-400 border-2 border-dashed border-gray-200 rounded-2xl">
              <FaGift className="text-4xl mx-auto mb-2 text-gray-300" />
              <p className="font-semibold">Tidak ada voucher di kategori ini</p>
              <p className="text-sm mt-1">Klaim reward untuk mendapatkan voucher!</p>
            </div>
          ) : (
            filteredVouchers.map((v) => {
              const isExpired = !v.used && new Date(v.validUntil) < new Date();
              return (
                <div
                  key={v.id}
                  className={`rounded-2xl p-6 border-2 border-dashed ${
                    v.used
                      ? "bg-gray-50 border-gray-200"
                      : isExpired
                      ? "bg-red-50 border-red-200"
                      : "bg-gradient-to-br from-[#0F766E] to-[#14B8A6] border-white text-white"
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className={`text-xs font-semibold mb-1 ${v.used ? "text-gray-400" : isExpired ? "text-red-500" : "text-white/80"}`}>
                        {v.used ? "Sudah Digunakan" : isExpired ? "Kadaluarsa" : "Aktif"}
                      </p>
                      <p className={`text-2xl font-extrabold ${v.used || isExpired ? "text-gray-400" : ""}`}>{v.discount} OFF</p>
                    </div>
                    <div className="text-4xl">{v.icon}</div>
                  </div>
                  <div className={`text-sm ${v.used ? "text-gray-500" : isExpired ? "text-red-600" : "text-white/90"}`}>
                    <p className="font-bold mb-1">{v.rewardName || v.code}</p>
                    <p className="font-mono text-xs mb-2 bg-white/20 px-2 py-1 rounded">{v.code}</p>
                    <p className="text-xs">Berlaku hingga {new Date(v.validUntil).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</p>
                  </div>
                  {!v.used && !isExpired && (
                    <button
                      onClick={() => handleUseVoucher(v.id)}
                      className="mt-4 w-full bg-white text-[#0F766E] font-bold py-2 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      Gunakan Voucher
                    </button>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Claim Modal */}
      {showClaimModal && selectedReward && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Konfirmasi Klaim Reward</h3>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-5 mb-4">
              <div className="text-5xl mb-3">{selectedReward.icon}</div>
              <h4 className="font-bold text-lg text-gray-900 mb-2">{selectedReward.name}</h4>
              <p className="text-sm text-gray-600 mb-3">{selectedReward.description}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Poin yang dibutuhkan:</span>
                <span className="font-bold text-orange-600 flex items-center gap-1">
                  <FaCoins /> {selectedReward.pointsRequired}
                </span>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 mb-4 text-sm">
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">Poin Anda saat ini:</span>
                <span className="font-bold">{points}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Poin setelah klaim:</span>
                <span className="font-bold text-green-600">{points - selectedReward.pointsRequired}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowClaimModal(false);
                  setSelectedReward(null);
                }}
                disabled={claimLoading}
                className="flex-1 border border-gray-200 text-gray-600 font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleClaimReward}
                disabled={claimLoading}
                className="flex-1 bg-[#0F766E] hover:bg-[#0A5E58] text-white font-bold py-2.5 rounded-xl transition-colors disabled:bg-gray-300"
              >
                {claimLoading ? "Memproses..." : "Klaim Reward"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
