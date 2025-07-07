const makeWASocket = require('@adiwajshing/baileys').default;
const db = require('./models');

async function main() {
  const sock = makeWASocket();

  setInterval(async () => {
    const rows = db.prepare('SELECT * FROM transaksi WHERE status = ? AND processed = 0').all('success');

    for (const trx of rows) {
      // Contoh proses pesanan: update saldo user
      if (!trx.userId) continue;

      let user = db.prepare('SELECT * FROM users WHERE id = ?').get(trx.userId);
      if (!user) {
        db.prepare('INSERT INTO users (id, saldo) VALUES (?, ?)').run(trx.userId, trx.amount);
      } else {
        db.prepare('UPDATE users SET saldo = saldo + ? WHERE id = ?').run(trx.amount, trx.userId);
      }

      // Tandai transaksi sudah diproses
      db.prepare('UPDATE transaksi SET processed = 1 WHERE transactionId = ?').run(trx.transactionId);

      // Kirim pesan WA ke user
      await sock.sendMessage(trx.userId + '@s.whatsapp.net', { text: `Pembayaran diterima: Rp${trx.amount.toLocaleString('id-ID')}. Saldo sudah ditambahkan.` });
    }
  }, 10000);
}

main();