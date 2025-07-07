const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/webhook/okeconnect', require('./webhook/okeconnect'));
app.use('/api/mutasi/qris', require('./api/mutasi/qris'));

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});