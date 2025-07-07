const express = require('express');
const router = express.Router();
const db = require('../models');

router.post('/', (req, res) => {
  const { invoice_id, amount, status } = req.body;
  if (!invoice_id || !amount || !status) return res.status(400).json({ error: 'Data tidak lengkap' });

  // Cek transaksi sudah ada
  const exists = db.prepare('SELECT * FROM transaksi WHERE transactionId = ?').get(invoice_id);
  if (exists) return res.json({ message: 'Transaksi sudah ada' });

  // Insert transaksi baru dengan status pending
  db.prepare(`INSERT INTO transaksi (transactionId, userId, amount, status, product_code) VALUES (?, ?, ?, ?, ?)`)
    .run(invoice_id, null, amount, status, null);

  res.json({ success: true });
});

module.exports = router;