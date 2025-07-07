const express = require('express');
const router = express.Router();
const Database = require('better-sqlite3');
const path = require('path');
const config = require(path.resolve(__dirname, '../../config.json'));

// Koneksi DB, pastikan file transaksi.db ada di folder mutasi-qris
const db = new Database(path.resolve(__dirname, '../../transaksi.db'));

router.get('/', (req, res) => {
  const apikey = req.query.apikey;
  if (apikey !== config.apikey) {
    return res.status(401).json({ status: false, message: 'API Key salah' });
  }

  try {
    const rows = db.prepare('SELECT * FROM transaksi ORDER BY tanggal DESC LIMIT 100').all();
    res.json({ status: true, message: 'Berhasil ambil mutasi', data: rows });
  } catch (e) {
    res.status(500).json({ status: false, message: 'Gagal ambil data', error: e.message });
  }
});

module.exports = router;