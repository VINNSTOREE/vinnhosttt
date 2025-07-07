const express = require('express');
const router = express.Router();
const db = {}; // dummy supaya gak error
const config = require('../../config.json'); // ← ini benar

router.get('/', (req, res) => {
  const apikey = req.query.apikey;
  if (apikey !== config.apikey)
    return res.status(401).json({ status: false, message: 'API Key salah' });

  const rows = db.prepare('SELECT * FROM transaksi ORDER BY created_at DESC LIMIT 100').all();
  res.json({ status: true, message: 'Berhasil ambil mutasi', data: rows });
});

module.exports = router;
