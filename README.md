# NNPTUD-C6

## Hướng dẫn chạy import users và gửi email Mailtrap

1. Sao chép `.env.example` thành `.env` và điền thông tin Mailtrap:
   - MAILTRAP_USER
   - MAILTRAP_PASS
2. Cài node modules (nếu chưa):
   - `npm install`
3. Chạy import từ file Excel mặc định:
   - `node src/main.js`
   - hoặc: `node src/main.js src/data/users.xlsx`
4. Kết quả:
   - `src/data/users-output.json` chứa users + password + role
   - Email đã gửi tới Mailtrap inbox

## Giải thích chức năng

- `src/import-users.js`: đọc file `.xlsx` hoặc `.csv` và tạo password random 16 ký tự.
- `src/email-service.js`: gửi email thông tin đăng nhập qua SMTP Mailtrap.
- `src/main.js`: điều phối toàn bộ.

## Kiểm tra

- Vào Mailtrap, kiểm tra inbox, chụp ảnh màn hình email nhận được.
