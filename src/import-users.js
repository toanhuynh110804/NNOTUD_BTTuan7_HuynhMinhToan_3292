const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const xlsx = require('xlsx');
const { randomPassword } = require('./utils');

function cleanCell(value) {
  if (value == null) return '';
  return String(value).trim();
}

function parseUserRow(username, email) {
  if (!username || !email) return null;
  return {
    username: cleanCell(username),
    email: cleanCell(email),
    password: randomPassword(16),
    role: 'user',
    createdAt: new Date().toISOString(),
  };
}

function importFromCsv(filename) {
  return new Promise((resolve, reject) => {
    const users = [];
    const stream = fs.createReadStream(filename)
      .pipe(csv({ skipLines: 0, trim: true }))
      .on('data', (row) => {
        const u = parseUserRow(row.username || row.userName || row.USERNAME, row.email || row.EMail || row.EMAIL);
        if (u) users.push(u);
      })
      .on('end', () => resolve(users))
      .on('error', (err) => reject(err));

    stream.on('error', reject);
  });
}

function importFromExcel(filename) {
  if (!fs.existsSync(filename)) throw new Error(`File not found: ${filename}`);
  const workbook = xlsx.readFile(filename);
  const sheetName = workbook.SheetNames[0];
  const rows = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: '' });
  const users = rows.map((row) => parseUserRow(row.username || row.userName || row.USERNAME, row.email || row.EMail || row.EMAIL)).filter((u) => u);
  return users;
}

async function importUsers(filePath) {
  const fullPath = path.resolve(filePath);
  if (!fs.existsSync(fullPath)) throw new Error(`Input file not found: ${fullPath}`);
  const ext = path.extname(fullPath).toLowerCase();
  if (ext === '.csv') {
    return importFromCsv(fullPath);
  }
  if (ext === '.xlsx' || ext === '.xls') {
    return importFromExcel(fullPath);
  }
  throw new Error(`Unsupported file extension: ${ext}. Use .csv or .xlsx`);
}

module.exports = { importUsers };
