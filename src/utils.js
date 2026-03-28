function randomPassword(length = 16) {
  const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+';
  let pwd = '';
  for (let i = 0; i < length; i += 1) {
    pwd += alpha[Math.floor(Math.random() * alpha.length)];
  }
  return pwd;
}

module.exports = { randomPassword };
