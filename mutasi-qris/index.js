const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const db = require('./models');
const path = require('path');
const config = require(path.join(__dirname, 'config.json'));Bisa error kalau lokasi jalannya beda

// Middleware
app.use(express.json());

// Routes
app.use('/webhook/okeconnect', require('./webhook/okeconnect'));
app.use('/api/mutasi/qris', require('./api/mutasi/qris'));

// Tes root endpoint
app.get('/', (req, res) => {
  res.send('Mutasi QRIS Server Aktif.');
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server Mutasi QRIS aktif di http://localhost:${port}`);
});
