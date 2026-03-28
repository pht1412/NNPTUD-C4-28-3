const crypto = require('crypto');

// Tạo chuỗi ngẫu nhiên 16 ký tự
const generateRandomPassword = () => {
    // randomBytes(8) sẽ tạo ra 8 byte, khi chuyển sang chuỗi hex sẽ thành 16 ký tự
    return crypto.randomBytes(8).toString('hex'); 
};

module.exports = { generateRandomPassword };