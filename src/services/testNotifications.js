/**
 * Test Helper untuk Notification & Reward System
 * 
 * File ini berisi function helper untuk testing fitur baru
 * Bisa dipanggil dari console browser untuk quick testing
 */

import NotificationManager from "./notificationService";
import RewardService from "./rewardService";

// ==================== TEST DATA ====================
const TEST_PATIENT = {
  nama: "John Doe",
  noHp: "081234567890",
  email: "john.doe@example.com",
  levelMembership: "Gold",
  loyaltyPoints: 1500,
};

const TEST_BOOKING = {
  tanggal: "15 Juni 2026",
  waktu: "10:00 WIB",
  dokter: "drg. Amanda",
  treatment: "Scaling Gigi",
};

const TEST_PROMO = {
  judul: "Diskon 30% Scaling Gigi",
  deskripsi: "Dapatkan diskon 30% untuk scaling gigi berlaku untuk member Gold ke atas",
  berlakuHingga: "2026-12-31",
  badge: "Diskon 30%",
};

// ==================== TEST FUNCTIONS ====================

/**
 * Test booking confirmation notification
 */
export async function testBookingConfirmation() {
  console.log("\n🧪 Testing Booking Confirmation Notification...\n");
  
  const result = await NotificationManager.sendBookingConfirmation(
    TEST_PATIENT,
    TEST_BOOKING
  );
  
  console.log("✅ Result:", result);
  return result;
}

/**
 * Test reminder kontrol notification
 */
export async function testReminderKontrol() {
  console.log("\n🧪 Testing Reminder Kontrol Notification...\n");
  
  const result = await NotificationManager.sendReminderKontrol(
    TEST_PATIENT,
    { tanggal: "16 Juni 2026", waktu: "14:00 WIB" }
  );
  
  console.log("✅ Result:", result);
  return result;
}

/**
 * Test promo notification
 */
export async function testPromoNotification() {
  console.log("\n🧪 Testing Promo Notification...\n");
  
  const result = await NotificationManager.sendPromoNotification(
    TEST_PATIENT,
    TEST_PROMO
  );
  
  console.log("✅ Result:", result);
  return result;
}

/**
 * Test transaction success notification
 */
export async function testTransactionSuccess() {
  console.log("\n🧪 Testing Transaction Success Notification...\n");
  
  const result = await NotificationManager.sendTransactionSuccess(
    TEST_PATIENT,
    {
      treatment: "Scaling Gigi",
      biaya: 350000,
      metodePembayaran: "Transfer Bank",
    }
  );
  
  console.log("✅ Result:", result);
  return result;
}

/**
 * Test loyalty reward notification
 */
export async function testLoyaltyReward() {
  console.log("\n🧪 Testing Loyalty Reward Notification...\n");
  
  const result = await NotificationManager.sendLoyaltyReward(
    { ...TEST_PATIENT, loyaltyPoints: 1200 },
    { rewardName: "Diskon 20% Whitening" }
  );
  
  console.log("✅ Result:", result);
  return result;
}

/**
 * Test calculate points from transaction
 */
export function testCalculatePoints() {
  console.log("\n🧪 Testing Calculate Points...\n");
  
  const amount = 500000;
  const level = "Gold";
  
  const points = RewardService.calculatePointsFromTransaction(amount, level);
  
  console.log(`💰 Transaksi: Rp ${amount.toLocaleString("id-ID")}`);
  console.log(`⭐ Level: ${level}`);
  console.log(`🎯 Poin didapat: ${points}`);
  console.log(`📊 Kalkulasi: ${amount} × 0.01 × 1.5 (Gold multiplier) = ${points}`);
  
  return points;
}

/**
 * Test get activity points
 */
export function testActivityPoints() {
  console.log("\n🧪 Testing Activity Points...\n");
  
  const activities = [
    "newRegistration",
    "firstVisit",
    "referralSuccess",
    "reviewSubmit",
    "birthdayBonus",
  ];
  
  activities.forEach((activity) => {
    const points = RewardService.getActivityPoints(activity, "Silver");
    console.log(`${activity}: ${points} poin (Silver)`);
  });
}

/**
 * Test check membership level
 */
export function testCheckMembershipLevel() {
  console.log("\n🧪 Testing Check Membership Level...\n");
  
  const testCases = [
    { points: 300, expected: "Bronze" },
    { points: 800, expected: "Silver" },
    { points: 2000, expected: "Gold" },
    { points: 3500, expected: "Platinum" },
  ];
  
  testCases.forEach(({ points, expected }) => {
    const level = RewardService.checkMembershipLevel(points);
    const isCorrect = level === expected;
    console.log(`${points} poin → ${level} ${isCorrect ? "✅" : "❌"}`);
  });
}

/**
 * Test get available rewards
 */
export function testGetAvailableRewards() {
  console.log("\n🧪 Testing Get Available Rewards...\n");
  
  const currentPoints = 1200;
  const level = "Gold";
  
  const rewards = RewardService.getAvailableRewards(currentPoints, level);
  
  console.log(`💎 Current Points: ${currentPoints}`);
  console.log(`⭐ Level: ${level}`);
  console.log(`🎁 Available Rewards (${rewards.length}):\n`);
  
  rewards.forEach((r) => {
    console.log(`  ${r.icon} ${r.name} - ${r.pointsRequired} poin`);
    console.log(`     ${r.description}`);
  });
  
  return rewards;
}

/**
 * Test claim reward
 */
export function testClaimReward() {
  console.log("\n🧪 Testing Claim Reward...\n");
  
  const userData = {
    nama: "Test User",
    loyaltyPoints: 1500,
    levelMembership: "Gold",
  };
  
  const rewardId = "RW-002"; // Diskon 20% Whitening (1000 poin)
  
  console.log(`👤 User: ${userData.nama}`);
  console.log(`💎 Current Points: ${userData.loyaltyPoints}`);
  console.log(`🎁 Claiming: ${rewardId}\n`);
  
  const result = RewardService.claimReward(userData, rewardId);
  
  if (result.success) {
    console.log("✅ Claim Success!");
    console.log(`📄 Voucher Code: ${result.voucher.code}`);
    console.log(`💰 Discount: ${result.voucher.discount}`);
    console.log(`📅 Valid Until: ${new Date(result.voucher.validUntil).toLocaleDateString("id-ID")}`);
    console.log(`💎 Points After: ${result.updatedPoints}`);
  } else {
    console.log("❌ Claim Failed:", result.message);
  }
  
  return result;
}

/**
 * Test validate voucher
 */
export function testValidateVoucher() {
  console.log("\n🧪 Testing Validate Voucher...\n");
  
  const testVouchers = [
    {
      name: "Valid Voucher",
      voucher: {
        code: "TEST123",
        used: false,
        validUntil: "2026-12-31",
        minTransaction: 0,
      },
      amount: 500000,
    },
    {
      name: "Already Used",
      voucher: {
        code: "USED456",
        used: true,
        validUntil: "2026-12-31",
        minTransaction: 0,
      },
      amount: 500000,
    },
    {
      name: "Expired",
      voucher: {
        code: "OLD789",
        used: false,
        validUntil: "2025-01-01",
        minTransaction: 0,
      },
      amount: 500000,
    },
  ];
  
  testVouchers.forEach(({ name, voucher, amount }) => {
    const result = RewardService.validateVoucher(voucher, amount);
    console.log(`${name}: ${result.valid ? "✅ Valid" : "❌ Invalid"} - ${result.message}`);
  });
}

/**
 * Test get upgrade info
 */
export function testGetUpgradeInfo() {
  console.log("\n🧪 Testing Get Upgrade Info...\n");
  
  const testCases = [
    { points: 400, level: "Bronze" },
    { points: 1200, level: "Silver" },
    { points: 2800, level: "Gold" },
    { points: 4000, level: "Platinum" },
  ];
  
  testCases.forEach(({ points, level }) => {
    const info = RewardService.getUpgradeInfo(points, level);
    console.log(`\n📊 ${level} - ${points} poin:`);
    console.log(`   ${info.message}`);
    console.log(`   Progress: ${info.progress.toFixed(1)}%`);
  });
}

/**
 * Run all notification tests
 */
export async function runAllNotificationTests() {
  console.log("\n" + "=".repeat(50));
  console.log("🧪 RUNNING ALL NOTIFICATION TESTS");
  console.log("=".repeat(50));
  
  await testBookingConfirmation();
  await new Promise((r) => setTimeout(r, 500));
  
  await testReminderKontrol();
  await new Promise((r) => setTimeout(r, 500));
  
  await testPromoNotification();
  await new Promise((r) => setTimeout(r, 500));
  
  await testTransactionSuccess();
  await new Promise((r) => setTimeout(r, 500));
  
  await testLoyaltyReward();
  
  console.log("\n✅ All notification tests completed!");
}

/**
 * Run all reward tests
 */
export function runAllRewardTests() {
  console.log("\n" + "=".repeat(50));
  console.log("🧪 RUNNING ALL REWARD TESTS");
  console.log("=".repeat(50));
  
  testCalculatePoints();
  testActivityPoints();
  testCheckMembershipLevel();
  testGetAvailableRewards();
  testClaimReward();
  testValidateVoucher();
  testGetUpgradeInfo();
  
  console.log("\n✅ All reward tests completed!");
}

/**
 * Run all tests
 */
export async function runAllTests() {
  await runAllNotificationTests();
  console.log("\n" + "-".repeat(50) + "\n");
  runAllRewardTests();
  
  console.log("\n" + "=".repeat(50));
  console.log("✅ ALL TESTS COMPLETED!");
  console.log("=".repeat(50) + "\n");
}

// ==================== BROWSER CONSOLE HELPER ====================

/**
 * Expose to window for browser console testing
 */
if (typeof window !== "undefined") {
  window.testNotifications = {
    // Notification tests
    testBookingConfirmation,
    testReminderKontrol,
    testPromoNotification,
    testTransactionSuccess,
    testLoyaltyReward,
    
    // Reward tests
    testCalculatePoints,
    testActivityPoints,
    testCheckMembershipLevel,
    testGetAvailableRewards,
    testClaimReward,
    testValidateVoucher,
    testGetUpgradeInfo,
    
    // Run all
    runAllNotificationTests,
    runAllRewardTests,
    runAllTests,
  };
  
  console.log("\n✅ Test helpers loaded!");
  console.log("💡 Try in console:");
  console.log("   testNotifications.runAllTests()");
  console.log("   testNotifications.testBookingConfirmation()");
  console.log("   testNotifications.testClaimReward()");
}

// Export default
export default {
  testBookingConfirmation,
  testReminderKontrol,
  testPromoNotification,
  testTransactionSuccess,
  testLoyaltyReward,
  testCalculatePoints,
  testActivityPoints,
  testCheckMembershipLevel,
  testGetAvailableRewards,
  testClaimReward,
  testValidateVoucher,
  testGetUpgradeInfo,
  runAllNotificationTests,
  runAllRewardTests,
  runAllTests,
};
