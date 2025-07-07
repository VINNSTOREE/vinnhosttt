const express = require('express');
const router = express.Router();
const db = require('../models');
const config = require('../config.json');

router.post('/', (req, res) => {
  const { invoice_id, amount, status, merchant_code } = req.body;

  // Validasi data wajib
  if (!invoice_id || !amount || !status || !merchant_code)
    return res.status(400).json({ error: 'Data tidak lengkap' });

  // Validasi merchant_code sesuai config
  if (merchant_code !== config.merchant_code)
    return res.status(403).json({ error: 'Merchant code tidak valid' });

  // Cek transaksi sudah ada
  const exists = db.prepare('SELECT * FROM transaksi WHERE transactionId = ?').get(invoice_id);
  if (exists) return res.json({ message: 'Transaksi sudah ada' });

  // Simpan transaksi
  db.prepare(`INSERT INTO transaksi (transactionId, userId, amount, status, product_code) VALUES (?, ?, ?, ?, ?)`)
    .run(invoice_id, null, amount, status, null);

  res.json({ success: true });
});

module.exports = router;
