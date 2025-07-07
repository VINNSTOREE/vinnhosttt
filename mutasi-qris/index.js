const express = require('express');
const app = express();

const mutasiRouter = require('./api/mutasi');

app.use('/mutasi', mutasiRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Server mutasi berjalan di http://localhost:${port}`);
});
