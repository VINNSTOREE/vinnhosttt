const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const fs = require('fs');

// Cek apakah file config.json ada
let config;
try {
  const configPath = path.join(__dirname, 'config.json');
  if (!fs.existsSync(configPath)) {
    console.error('❌ File config.json tidak ditemukan!');
    process.exit(1);
  }
  config = require(configPath);
} catch (e) {
  console.error('❌ Gagal load config.json:', e.message);
  process.exit(1);
}

// Cek apakah file database ada (jika menggunakan SQLite)
const dbPath = path.join(__dirname, 'mutasi.db');
if (!fs.existsSync(dbPath)) {
  console.error('❌ File database mutasi.db tidak ditemukan!');
  process.exit(1);
}

// Dummy DB (hapus dan ganti dengan implementasi sesungguhnya jika sudah ada)
const db = require('./models'); // Ini tetap aman meskipun kosong

// Middleware
app.use(express.json());

// Routes
app.use('/webhook/okeconnect', require('./webhook/okeconnect'));
app.use('/api/mutasi/qris', require('./api/mutasi/qris'));

// Tes root endpoint
app.get('/', (req, res) => {
  res.send('✅ Mutasi QRIS Server Aktif.');
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server Mutasi QRIS aktif di http://localhost:${port}`);
});
