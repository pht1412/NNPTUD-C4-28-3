const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "e8373cebe94c4c", 
        pass: "662aeab6ada703"
    }
});

const sendPasswordEmail = async (email, username, password) => {
    const mailOptions = {
        from: '"Hệ thống Admin" <admin@haha.com>',
        to: email,
        subject: 'Thông tin tài khoản mới của bạn',
        text: `Chào ${username},\n\nTài khoản của bạn đã được tạo thành công.\nUsername: ${username}\nMật khẩu tạm thời của bạn là: ${password}\n\nVui lòng đổi mật khẩu sau khi đăng nhập.`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Đã gửi email thành công đến ${email}`);
    } catch (error) {
        console.error(`Lỗi khi gửi email đến ${email}:`, error);
    }
};

module.exports = { sendPasswordEmail };