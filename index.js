const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const { MONGO_URL, PORT } = require('./config/config');
const {
  userRoute, authRoute, productRoute, orderRoute,
  stripeRoute
} = require('./routes');

const app = express();

mongoose
  .connect(MONGO_URL)
  // eslint-disable-next-line no-console
  .then(() => console.log('DB connected'))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/ping', (req, res) => {
  res.json('pong');
});

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute);
app.use('/api/checkout', stripeRoute);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server is running on port', PORT);
});
