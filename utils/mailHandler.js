const nodemailer = require("nodemailer");
const crypto = require("crypto"); // Thư viện có sẵn của Node.js để gen chuỗi ngẫu nhiên

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525, // Đổi sang 2525 để đồng nhất với cấu hình dưới
    auth: {
        user: "e8373cebe94c4c", 
        pass: "662aeab6ada703",
    },
});

// Hàm reset mật khẩu cũ của bạn
const sendMail = async (to, url) => {
    const info = await transporter.sendMail({
        from: 'admin@haha.com',
        to: to,
        subject: "RESET PASSWORD REQUEST",
        text: "lick vo day de doi pass", 
        html: "lick vo <a href="+url+">day</a> de doi pass",
    });
    console.log("Message sent:", info.messageId);
};

// Hàm gen password ngẫu nhiên (chính là hàm báo lỗi thiếu lúc nãy)
const generateRandomPassword = () => {
    return crypto.randomBytes(8).toString('hex'); 
};

// Export CẢ 2 hàm ra ngoài
module.exports = { 
    sendMail, 
    generateRandomPassword 
};