const fs = require('fs');
const csv = require('csv-parser');
const { generateRandomPassword } = require('../utils/mailHandler'); 
const { sendPasswordEmail } = require('../service/emailService');     

// Hàm xử lý import user
const importUsersFromFile = (filePath) => {
    const users = [];

    // Đọc file CSV
    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
            // Đẩy từng dòng dữ liệu (username, email) vào mảng
            users.push(row);
        })
        .on('end', async () => {
            console.log('Đã đọc xong file CSV. Bắt đầu xử lý import...');
            
            for (const userData of users) {
                
                // 1. Kiểm tra để bỏ qua các dòng trống (nguyên nhân gây lỗi undefined ban nãy)
                if (!userData.email) {
                    console.log("⚠️ Bỏ qua dòng bị lỗi hoặc dòng trống:", userData);
                    continue; 
                }

                // 2. Tiếp tục luồng xử lý bình thường nếu có email
                const password = generateRandomPassword();
                
                const newUser = {
                    username: userData.username,
                    email: userData.email,
                    role: 'user',
                    password: password 
                };

                try {
                    console.log(`Đang xử lý gửi email cho: ${newUser.email}...`);
                    // 3. Gọi hàm gửi email
                    await sendPasswordEmail(newUser.email, newUser.username, password);
                } catch (error) {
                    console.error(`Có lỗi xảy ra khi xử lý user ${userData.username}:`, error);
                }
            }
            
            console.log('🎉 Quá trình import và gửi mail hoàn tất!');
        });
};

// Gọi hàm và truyền đường dẫn tới file CSV 
// (Lưu ý: Mình đã sửa lại thành đuôi .csv giống như bước trước chúng ta đã làm nhé)
importUsersFromFile('./users.csv');