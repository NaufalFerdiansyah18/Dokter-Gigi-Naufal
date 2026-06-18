/**
 * Reward & Loyalty Service
 * Mengelola sistem poin, reward, dan voucher
 */

// ==================== REWARD CATALOG ====================
export const REWARD_CATALOG = [
  {
    id: "RW-001",
    name: "Diskon 50rb Scaling",
    description: "Potongan Rp 50.000 untuk layanan scaling gigi",
    pointsRequired: 500,
    type: "discount",
    category: "scaling",
    value: 50000,
    validityDays: 30,
    icon: "🦷",
    color: "from-teal-500 to-teal-700",
    maxRedemption: 1,
  },
  {
    id: "RW-002",
    name: "Diskon 20% Whitening",
    description: "Diskon 20% untuk layanan whitening gigi",
    pointsRequired: 1000,
    type: "percentage",
    category: "whitening",
    value: 20,
    validityDays: 60,
    icon: "✨",
    color: "from-yellow-400 to-yellow-600",
    maxRedemption: 1,
  },
  {
    id: "RW-003",
    name: "Konsultasi Gratis",
    description: "Konsultasi gratis dengan dokter spesialis",
    pointsRequired: 300,
    type: "free",
    category: "consultation",
    value: 150000,
    validityDays: 45,
    icon: "👨‍⚕️",
    color: "from-blue-500 to-blue-700",
    maxRedemption: 2,
  },
  {
    id: "RW-004",
    name: "Diskon 100rb Behel",
    description: "Potongan Rp 100.000 untuk pemasangan behel",
    pointsRequired: 1500,
    type: "discount",
    category: "braces",
    value: 100000,
    validityDays: 90,
    icon: "😁",
    color: "from-purple-500 to-purple-700",
    maxRedemption: 1,
  },
  {
    id: "RW-005",
    name: "Free Dental Kit",
    description: "Paket sikat gigi, pasta gigi, dan mouthwash gratis",
    pointsRequired: 700,
    type: "gift",
    category: "merchandise",
    value: 150000,
    validityDays: 30,
    icon: "🎁",
    color: "from-green-500 to-green-700",
    maxRedemption: 3,
  },
  {
    id: "RW-006",
    name: "Diskon 15% Semua Layanan",
    description: "Diskon 15% untuk semua jenis perawatan gigi",
    pointsRequired: 2000,
    type: "percentage",
    category: "all",
    value: 15,
    validityDays: 30,
    icon: "🏆",
    color: "from-orange-400 to-orange-600",
    maxRedemption: 1,
  },
  {
    id: "RW-007",
    name: "Cashback 200rb",
    description: "Cashback Rp 200.000 untuk transaksi minimal Rp 1.000.000",
    pointsRequired: 2500,
    type: "cashback",
    category: "all",
    value: 200000,
    validityDays: 60,
    icon: "💰",
    color: "from-red-500 to-red-700",
    maxRedemption: 1,
    minTransaction: 1000000,
  },
];

// ==================== POINTS EARNING RULES ====================
const POINTS_RULES = {
  // Poin per transaksi (1% dari nilai transaksi)
  transactionRate: 0.01,

  // Bonus poin per aktivitas
  activities: {
    newRegistration: 100,
    firstVisit: 50,
    referralSuccess: 200,
    reviewSubmit: 30,
    socialMediaShare: 20,
    birthdayBonus: 150,
    anniversaryBonus: 100,
  },

  // Multiplier berdasarkan level membership
  levelMultiplier: {
    Bronze: 1.0,
    Silver: 1.2,
    Gold: 1.5,
    Platinum: 2.0,
  },

  // Level upgrade threshold
  levelThreshold: {
    Bronze: 0,
    Silver: 501,
    Gold: 1501,
    Platinum: 3001,
  },
};

// ==================== REWARD SERVICE ====================
class RewardService {
  /**
   * Hitung poin dari transaksi
   * @param {number} amount - Jumlah transaksi
   * @param {string} memberLevel - Level membership
   * @returns {number} Jumlah poin yang didapat
   */
  static calculatePointsFromTransaction(amount, memberLevel = "Bronze") {
    const basePoints = Math.floor(amount * POINTS_RULES.transactionRate);
    const multiplier = POINTS_RULES.levelMultiplier[memberLevel] || 1.0;
    return Math.floor(basePoints * multiplier);
  }

  /**
   * Tambah poin untuk aktivitas tertentu
   * @param {string} activityType - Jenis aktivitas
   * @param {string} memberLevel - Level membership
   * @returns {number} Jumlah poin bonus
   */
  static getActivityPoints(activityType, memberLevel = "Bronze") {
    const basePoints = POINTS_RULES.activities[activityType] || 0;
    const multiplier = POINTS_RULES.levelMultiplier[memberLevel] || 1.0;
    return Math.floor(basePoints * multiplier);
  }

  /**
   * Cek dan upgrade level membership berdasarkan total poin
   * @param {number} totalPoints - Total poin yang dimiliki
   * @returns {string} Level membership yang sesuai
   */
  static checkMembershipLevel(totalPoints) {
    if (totalPoints >= POINTS_RULES.levelThreshold.Platinum) return "Platinum";
    if (totalPoints >= POINTS_RULES.levelThreshold.Gold) return "Gold";
    if (totalPoints >= POINTS_RULES.levelThreshold.Silver) return "Silver";
    return "Bronze";
  }

  /**
   * Get rewards yang bisa di-klaim berdasarkan poin
   * @param {number} currentPoints - Poin yang dimiliki user
   * @param {string} memberLevel - Level membership
   * @returns {Array} List reward yang available
   */
  static getAvailableRewards(currentPoints, memberLevel = "Bronze") {
    return REWARD_CATALOG.filter((reward) => {
      // Filter berdasarkan poin yang cukup
      const hasEnoughPoints = currentPoints >= reward.pointsRequired;

      // Filter berdasarkan level (opsional, bisa ditambahkan logika level)
      return hasEnoughPoints;
    }).sort((a, b) => a.pointsRequired - b.pointsRequired);
  }

  /**
   * Klaim reward
   * @param {Object} user - Data user
   * @param {string} rewardId - ID reward yang akan di-klaim
   * @returns {Object} Voucher yang di-generate
   */
  static claimReward(user, rewardId) {
    const reward = REWARD_CATALOG.find((r) => r.id === rewardId);

    if (!reward) {
      return { success: false, message: "Reward tidak ditemukan" };
    }

    // Validasi poin cukup
    if (user.loyaltyPoints < reward.pointsRequired) {
      return {
        success: false,
        message: `Poin tidak cukup. Anda perlu ${
          reward.pointsRequired - user.loyaltyPoints
        } poin lagi.`,
      };
    }

    // Generate voucher code
    const voucherCode = this.generateVoucherCode(reward.id);

    // Hitung tanggal kadaluarsa
    const validUntil = new Date();
    validUntil.setDate(validUntil.getDate() + reward.validityDays);

    // Create voucher object
    const voucher = {
      id: `VC-${Date.now()}`,
      code: voucherCode,
      rewardId: reward.id,
      rewardName: reward.name,
      type: reward.type,
      category: reward.category,
      value: reward.value,
      discount:
        reward.type === "percentage"
          ? `${reward.value}%`
          : reward.type === "discount" || reward.type === "cashback"
          ? `Rp ${reward.value.toLocaleString("id-ID")}`
          : "Gratis",
      description: reward.description,
      claimedDate: new Date().toISOString(),
      validUntil: validUntil.toISOString(),
      used: false,
      usedDate: null,
      minTransaction: reward.minTransaction || 0,
      icon: reward.icon,
      color: reward.color,
    };

    // Update user points (kurangi poin)
    const updatedPoints = user.loyaltyPoints - reward.pointsRequired;

    return {
      success: true,
      voucher,
      updatedPoints,
      message: `Berhasil klaim ${reward.name}!`,
    };
  }

  /**
   * Generate unique voucher code
   * @param {string} rewardId - ID reward
   * @returns {string} Voucher code
   */
  static generateVoucherCode(rewardId) {
    const prefix = rewardId.split("-")[1] || "XXX";
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `${prefix}${random}`;
  }

  /**
   * Validasi voucher untuk digunakan
   * @param {Object} voucher - Data voucher
   * @param {number} transactionAmount - Jumlah transaksi (opsional)
   * @returns {Object} Validasi result
   */
  static validateVoucher(voucher, transactionAmount = 0) {
    // Cek sudah digunakan
    if (voucher.used) {
      return {
        valid: false,
        message: "Voucher sudah digunakan",
      };
    }

    // Cek kadaluarsa
    const now = new Date();
    const validUntil = new Date(voucher.validUntil);
    if (now > validUntil) {
      return {
        valid: false,
        message: "Voucher sudah kadaluarsa",
      };
    }

    // Cek minimal transaksi (untuk cashback)
    if (voucher.minTransaction && transactionAmount < voucher.minTransaction) {
      return {
        valid: false,
        message: `Transaksi minimal Rp ${voucher.minTransaction.toLocaleString(
          "id-ID"
        )}`,
      };
    }

    return {
      valid: true,
      message: "Voucher valid",
    };
  }

  /**
   * Hitung diskon dari voucher
   * @param {Object} voucher - Data voucher
   * @param {number} transactionAmount - Jumlah transaksi
   * @returns {number} Jumlah diskon
   */
  static calculateDiscount(voucher, transactionAmount) {
    if (voucher.type === "percentage") {
      return Math.floor((transactionAmount * voucher.value) / 100);
    } else if (voucher.type === "discount" || voucher.type === "cashback") {
      return voucher.value;
    } else if (voucher.type === "free") {
      return voucher.value; // Nilai layanan gratis
    }
    return 0;
  }

  /**
   * Gunakan voucher (mark as used)
   * @param {Object} voucher - Data voucher
   * @param {number} transactionAmount - Jumlah transaksi
   * @returns {Object} Updated voucher
   */
  static useVoucher(voucher, transactionAmount) {
    const validation = this.validateVoucher(voucher, transactionAmount);

    if (!validation.valid) {
      return { success: false, message: validation.message };
    }

    const discount = this.calculateDiscount(voucher, transactionAmount);

    return {
      success: true,
      voucher: {
        ...voucher,
        used: true,
        usedDate: new Date().toISOString(),
      },
      discount,
      finalAmount: Math.max(0, transactionAmount - discount),
    };
  }

  /**
   * Get voucher history (filter used/unused)
   * @param {Array} vouchers - List semua voucher user
   * @param {string} filter - "all" | "active" | "used" | "expired"
   * @returns {Array} Filtered vouchers
   */
  static filterVouchers(vouchers, filter = "all") {
    const now = new Date();

    return vouchers.filter((v) => {
      if (filter === "all") return true;
      if (filter === "used") return v.used;
      if (filter === "expired")
        return !v.used && new Date(v.validUntil) < now;
      if (filter === "active")
        return !v.used && new Date(v.validUntil) >= now;
      return true;
    });
  }

  /**
   * Get poin yang dibutuhkan untuk upgrade level
   * @param {number} currentPoints - Poin saat ini
   * @param {string} currentLevel - Level saat ini
   * @returns {Object} Info upgrade
   */
  static getUpgradeInfo(currentPoints, currentLevel) {
    const levels = ["Bronze", "Silver", "Gold", "Platinum"];
    const currentIndex = levels.indexOf(currentLevel);

    if (currentIndex === -1 || currentIndex === levels.length - 1) {
      return {
        canUpgrade: false,
        nextLevel: null,
        pointsNeeded: 0,
        message: "Anda sudah di level maksimal",
      };
    }

    const nextLevel = levels[currentIndex + 1];
    const nextThreshold = POINTS_RULES.levelThreshold[nextLevel];
    const pointsNeeded = nextThreshold - currentPoints;

    return {
      canUpgrade: pointsNeeded <= 0,
      nextLevel,
      currentPoints,
      nextThreshold,
      pointsNeeded: Math.max(0, pointsNeeded),
      progress: Math.min(100, (currentPoints / nextThreshold) * 100),
      message:
        pointsNeeded <= 0
          ? `Selamat! Anda bisa upgrade ke ${nextLevel}`
          : `${pointsNeeded} poin lagi untuk upgrade ke ${nextLevel}`,
    };
  }
}

// ==================== EXPORTS ====================
export { RewardService, POINTS_RULES };
export default RewardService;
