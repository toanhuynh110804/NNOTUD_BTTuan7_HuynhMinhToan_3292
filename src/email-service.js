const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST || 'smtp.mailtrap.io',
  port: Number(process.env.MAILTRAP_PORT) || 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

async function sendLoginInfo(user) {
  const contentText = `Chào ${user.username},\n\nThông tin đăng nhập của bạn:\n- Username: ${user.username}\n- Password: ${user.password}\n- Role: ${user.role}\n\nVui lòng thay đổi mật khẩu sau lần đăng nhập đầu tiên.`;
  const mail = {
    from: '"Admin" <no-reply@myapp.local>',
    to: user.email,
    subject: '[Mailtrap] Thông tin đăng nhập tài khoản',
    text: contentText,
    html: `<p>Chào ${user.username},</p><p>Thông tin đăng nhập của bạn:</p><ul><li>Username: <b>${user.username}</b></li><li>Password: <b>${user.password}</b></li><li>Role: <b>${user.role}</b></li></ul><p>Vui lòng đổi mật khẩu sau lần đăng nhập đầu tiên.</p>`,
  };
  return transporter.sendMail(mail);
}

module.exports = { sendLoginInfo };
