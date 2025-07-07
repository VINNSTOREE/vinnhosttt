const Database = require('better-sqlite3');
const db = new Database('database.sqlite');

// Buat table user
db.prepare(`CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  saldo INTEGER DEFAULT 0
)`).run();

// Buat table transaksi
db.prepare(`CREATE TABLE IF NOT EXISTS transaksi (
  transactionId TEXT PRIMARY KEY,
  userId TEXT,
  product_code TEXT,
  amount INTEGER,
  status TEXT,
  processed INTEGER DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
)`).run();

module.exports = db;