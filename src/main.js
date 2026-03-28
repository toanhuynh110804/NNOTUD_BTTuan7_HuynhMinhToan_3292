const fs = require('fs');
const path = require('path');
const { importUsers } = require('./import-users');
const { sendLoginInfo } = require('./email-service');
require('dotenv').config();

async function run() {
  try {
    const inputPath = process.argv[2] || 'src/data/users.xlsx';
    const outputPath = process.env.OUTPUT_JSON || 'src/data/users-output.json';

    if (!fs.existsSync(path.dirname(outputPath))) {
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    }

    console.log('Đọc dữ liệu từ file:', inputPath);
    const users = await importUsers(inputPath);

    console.log(`Đã tạo ${users.length} user. Ghi vào: ${outputPath}`);
    fs.writeFileSync(outputPath, JSON.stringify(users, null, 2), 'utf8');

    console.log('Bắt đầu gửi email qua Mailtrap...');
    for (const user of users) {
      try {
        const info = await sendLoginInfo(user);
        console.log(`OK: ${user.username} -> ${user.email} | messageId=${info.messageId}`);
      } catch (err) {
        console.error(`Lỗi gửi mail ${user.email}:`, err.message || err);
      }
    }

    console.log('Hoàn thành việc import + gửi email.');
  } catch (error) {
    console.error('Lỗi tổng:', error.message || error);
    process.exit(1);
  }
}

run();
