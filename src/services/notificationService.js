/**
 * Service Automation untuk WhatsApp & Email Notification
 * 
 * Catatan:
 * - Untuk production, ganti dengan API key yang sebenarnya
 * - WhatsApp: Bisa menggunakan Fonnte, Wablas, atau WhatsApp Business API
 * - Email: Bisa menggunakan EmailJS, SendGrid, atau SMTP
 */

// ==================== CONFIGURATION ====================
const CONFIG = {
  // WhatsApp API Configuration (contoh menggunakan Fonnte)
  whatsapp: {
    enabled: true,
    apiUrl: "https://api.fonnte.com/send", // Ganti dengan provider pilihan Anda
    apiKey: "YOUR_FONNTE_API_KEY", // Ganti dengan API key Anda
  },
  // Email Configuration (contoh menggunakan EmailJS)
  email: {
    enabled: true,
    serviceId: "YOUR_EMAILJS_SERVICE_ID", // Ganti dengan service ID EmailJS
    templateId: "YOUR_EMAILJS_TEMPLATE_ID", // Ganti dengan template ID
    publicKey: "YOUR_EMAILJS_PUBLIC_KEY", // Ganti dengan public key
  },
};

// ==================== WHATSAPP SERVICE ====================
class WhatsAppService {
  /**
   * Kirim pesan WhatsApp
   * @param {string} phoneNumber - Nomor HP (format: 62xxx)
   * @param {string} message - Pesan yang akan dikirim
   */
  static async sendMessage(phoneNumber, message) {
    if (!CONFIG.whatsapp.enabled) {
      console.log("WhatsApp notification disabled");
      return { success: false, message: "WhatsApp disabled" };
    }

    try {
      // Format nomor HP (hapus 0 di depan, tambah 62)
      const formattedPhone = phoneNumber.startsWith("0")
        ? "62" + phoneNumber.substring(1)
        : phoneNumber.startsWith("62")
        ? phoneNumber
        : "62" + phoneNumber;

      // Simulasi pengiriman (untuk development)
      console.log("📱 WhatsApp Message Sent:");
      console.log("To:", formattedPhone);
      console.log("Message:", message);

      // Uncomment untuk production dengan Fonnte
      /*
      const response = await fetch(CONFIG.whatsapp.apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: CONFIG.whatsapp.apiKey,
        },
        body: JSON.stringify({
          target: formattedPhone,
          message: message,
          countryCode: "62",
        }),
      });

      const data = await response.json();
      return { success: response.ok, data };
      */

      // Simulasi response untuk development
      return {
        success: true,
        message: "WhatsApp sent (simulated)",
        phone: formattedPhone,
      };
    } catch (error) {
      console.error("WhatsApp Error:", error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Template pesan untuk berbagai keperluan
   */
  static templates = {
    bookingConfirmation: (nama, tanggal, waktu, dokter) => `
🦷 *Konfirmasi Booking - Klinik Gigi Dentiva*

Halo *${nama}*,

Booking Anda telah dikonfirmasi! ✅

📅 Tanggal: ${tanggal}
⏰ Waktu: ${waktu}
👨‍⚕️ Dokter: ${dokter}

Mohon hadir 10 menit sebelum jadwal. Jika ada perubahan, hubungi kami segera.

Terima kasih! 🙏
    `.trim(),

    reminderKontrol: (nama, tanggal, waktu) => `
🔔 *Pengingat Jadwal Kontrol*

Halo *${nama}*,

Kami mengingatkan jadwal kontrol Anda:

📅 ${tanggal}
⏰ ${waktu}

Jangan lupa hadir ya! Jika berhalangan, silakan reschedule melalui aplikasi.

Salam sehat! 🦷
    `.trim(),

    promoNotification: (nama, judulPromo, deskripsi, berlakuHingga) => `
🎁 *Promo Spesial untuk Anda!*

Halo *${nama}*,

${judulPromo}

${deskripsi}

⏳ Berlaku hingga: ${berlakuHingga}

Klaim sekarang di aplikasi kami!

Dentiva - Senyum Sehat, Hidup Berkualitas 😊
    `.trim(),

    transactionSuccess: (nama, treatment, biaya, metodePembayaran) => `
✅ *Pembayaran Berhasil*

Halo *${nama}*,

Pembayaran Anda telah diterima!

🦷 Treatment: ${treatment}
💰 Total: Rp ${biaya.toLocaleString("id-ID")}
💳 Metode: ${metodePembayaran}

Terima kasih atas kepercayaan Anda! 🙏
    `.trim(),

    loyaltyReward: (nama, level, poin, reward) => `
⭐ *Selamat! Reward Loyalty*

Halo *${nama}*,

Sebagai member *${level}*, Anda mendapat reward:

🎁 ${reward}
💎 Total Poin: ${poin}

Gunakan sekarang untuk perawatan berikutnya!

Keep smiling! 😊
    `.trim(),
  };
}

// ==================== EMAIL SERVICE ====================
class EmailService {
  /**
   * Kirim email
   * @param {string} toEmail - Email tujuan
   * @param {string} subject - Subject email
   * @param {string} htmlContent - Konten email (HTML)
   */
  static async sendEmail(toEmail, subject, htmlContent) {
    if (!CONFIG.email.enabled) {
      console.log("Email notification disabled");
      return { success: false, message: "Email disabled" };
    }

    try {
      // Simulasi pengiriman email (untuk development)
      console.log("📧 Email Sent:");
      console.log("To:", toEmail);
      console.log("Subject:", subject);
      console.log("Content:", htmlContent.substring(0, 100) + "...");

      // Uncomment untuk production dengan EmailJS
      /*
      const emailjs = await import("@emailjs/browser");
      const response = await emailjs.send(
        CONFIG.email.serviceId,
        CONFIG.email.templateId,
        {
          to_email: toEmail,
          subject: subject,
          html_content: htmlContent,
        },
        CONFIG.email.publicKey
      );
      return { success: true, data: response };
      */

      // Simulasi response untuk development
      return {
        success: true,
        message: "Email sent (simulated)",
        to: toEmail,
      };
    } catch (error) {
      console.error("Email Error:", error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Template email HTML
   */
  static templates = {
    bookingConfirmation: (nama, tanggal, waktu, dokter, treatment) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #0F766E, #14B8A6); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
    .info-box { background: white; padding: 15px; margin: 15px 0; border-left: 4px solid #0F766E; }
    .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
    .button { display: inline-block; background: #0F766E; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; margin-top: 15px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🦷 Konfirmasi Booking</h1>
      <p>Klinik Gigi Dentiva</p>
    </div>
    <div class="content">
      <p>Halo <strong>${nama}</strong>,</p>
      <p>Booking Anda telah berhasil dikonfirmasi! ✅</p>
      
      <div class="info-box">
        <p><strong>📅 Tanggal:</strong> ${tanggal}</p>
        <p><strong>⏰ Waktu:</strong> ${waktu}</p>
        <p><strong>👨‍⚕️ Dokter:</strong> ${dokter}</p>
        <p><strong>🦷 Treatment:</strong> ${treatment}</p>
      </div>
      
      <p><strong>Catatan Penting:</strong></p>
      <ul>
        <li>Hadir 10 menit sebelum jadwal</li>
        <li>Bawa kartu identitas</li>
        <li>Jika berhalangan, reschedule melalui aplikasi</li>
      </ul>
      
      <a href="#" class="button">Lihat Detail Booking</a>
    </div>
    <div class="footer">
      <p>Dentiva - Senyum Sehat, Hidup Berkualitas</p>
      <p>Jl. Kesehatan No. 123, Pekanbaru | (0761) 123-4567</p>
    </div>
  </div>
</body>
</html>
    `,

    promoNotification: (nama, judulPromo, deskripsi, berlakuHingga, badge) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; color: #333; }
    .container { max-width: 600px; margin: 0 auto; }
    .header { background: linear-gradient(135deg, #FF6B35, #F7931E); color: white; padding: 40px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #fff; padding: 30px; }
    .promo-badge { display: inline-block; background: #FF6B35; color: white; padding: 8px 20px; border-radius: 20px; font-weight: bold; margin: 10px 0; }
    .cta-button { display: inline-block; background: #0F766E; color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; margin-top: 20px; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎁 Promo Spesial!</h1>
      <p>${judulPromo}</p>
    </div>
    <div class="content">
      <p>Halo <strong>${nama}</strong>,</p>
      <p>Kami punya penawaran istimewa untuk Anda!</p>
      
      <div class="promo-badge">${badge}</div>
      
      <p>${deskripsi}</p>
      
      <p><strong>⏳ Berlaku hingga: ${berlakuHingga}</strong></p>
      
      <a href="#" class="cta-button">Klaim Promo Sekarang</a>
      
      <p style="margin-top: 30px; color: #666; font-size: 14px;">
        Jangan lewatkan kesempatan ini! Promo terbatas.
      </p>
    </div>
  </div>
</body>
</html>
    `,
  };
}

// ==================== NOTIFICATION MANAGER ====================
class NotificationManager {
  /**
   * Kirim notifikasi booking confirmation
   */
  static async sendBookingConfirmation(patient, booking) {
    const { nama, noHp, email } = patient;
    const { tanggal, waktu, dokter, treatment } = booking;

    // Kirim WhatsApp
    const waMessage = WhatsAppService.templates.bookingConfirmation(
      nama,
      tanggal,
      waktu,
      dokter
    );
    const waResult = await WhatsAppService.sendMessage(noHp, waMessage);

    // Kirim Email
    const emailHtml = EmailService.templates.bookingConfirmation(
      nama,
      tanggal,
      waktu,
      dokter,
      treatment
    );
    const emailResult = await EmailService.sendEmail(
      email,
      "Konfirmasi Booking - Dentiva",
      emailHtml
    );

    return {
      whatsapp: waResult,
      email: emailResult,
    };
  }

  /**
   * Kirim reminder jadwal kontrol
   */
  static async sendReminderKontrol(patient, jadwal) {
    const { nama, noHp, email } = patient;
    const { tanggal, waktu } = jadwal;

    const waMessage = WhatsAppService.templates.reminderKontrol(nama, tanggal, waktu);
    return await WhatsAppService.sendMessage(noHp, waMessage);
  }

  /**
   * Kirim notifikasi promo baru
   */
  static async sendPromoNotification(patient, promo) {
    const { nama, noHp, email } = patient;
    const { judul, deskripsi, berlakuHingga, badge } = promo;

    // Format tanggal
    const formattedDate = new Date(berlakuHingga).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    // WhatsApp
    const waMessage = WhatsAppService.templates.promoNotification(
      nama,
      judul,
      deskripsi,
      formattedDate
    );
    const waResult = await WhatsAppService.sendMessage(noHp, waMessage);

    // Email
    const emailHtml = EmailService.templates.promoNotification(
      nama,
      judul,
      deskripsi,
      formattedDate,
      badge
    );
    const emailResult = await EmailService.sendEmail(
      email,
      `🎁 ${judul} - Dentiva`,
      emailHtml
    );

    return { whatsapp: waResult, email: emailResult };
  }

  /**
   * Kirim notifikasi transaksi berhasil
   */
  static async sendTransactionSuccess(patient, transaction) {
    const { nama, noHp } = patient;
    const { treatment, biaya, metodePembayaran } = transaction;

    const waMessage = WhatsAppService.templates.transactionSuccess(
      nama,
      treatment,
      biaya,
      metodePembayaran
    );
    return await WhatsAppService.sendMessage(noHp, waMessage);
  }

  /**
   * Kirim notifikasi loyalty reward
   */
  static async sendLoyaltyReward(patient, reward) {
    const { nama, noHp, levelMembership, loyaltyPoints } = patient;
    const { rewardName } = reward;

    const waMessage = WhatsAppService.templates.loyaltyReward(
      nama,
      levelMembership,
      loyaltyPoints,
      rewardName
    );
    return await WhatsAppService.sendMessage(noHp, waMessage);
  }

  /**
   * Broadcast promo ke semua member dengan level tertentu
   */
  static async broadcastPromo(patients, promo, targetLevels = ["Semua"]) {
    const results = [];

    for (const patient of patients) {
      // Filter berdasarkan target membership
      if (
        targetLevels.includes("Semua") ||
        targetLevels.includes(patient.levelMembership)
      ) {
        const result = await this.sendPromoNotification(patient, promo);
        results.push({ patient: patient.nama, ...result });

        // Delay untuk menghindari rate limiting
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    return results;
  }
}

// ==================== EXPORTS ====================
export {
  NotificationManager,
  WhatsAppService,
  EmailService,
  CONFIG as NotificationConfig,
};

export default NotificationManager;
