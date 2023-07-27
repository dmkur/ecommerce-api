const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const { MONGO_URL, PORT } = require('./config/config');
const {
  userRoute, authRoute, productRoute, orderRoute
} = require('./routes');

const app = express();

mongoose
  .connect(MONGO_URL)
  // eslint-disable-next-line no-console
  .then(() => console.log('DB connected'))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/ping', (req, res) => {
  res.json('pong');
});

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server is running on port', PORT);
});
