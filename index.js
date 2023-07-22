const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const { MONGO_URL, PORT } = require('./config/config');

const app = express();

mongoose.connect(MONGO_URL)
// eslint-disable-next-line no-console
  .then(() => console.log('DB connected')).catch((err) => console.log(err));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server is running on port', PORT);
});
