const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const { MONGO_URL, PORT } = require('./config/config');
const {
  userRoute, authRoute, productRoute, orderRoute, cartRoute, stripeRoute
} = require('./routes');
const { mainErrorHandler } = require('./errors');

const app = express();

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
app.use('/api/carts', cartRoute);
app.use('/api/checkout', stripeRoute);
app.use('*', (req, res, next) => {
  next(new Error('Route not found'));
});
app.use(mainErrorHandler);

app.listen(PORT, () => {
  console.log('Server is running. Port:', PORT);

  mongoose.set('strictQuery', false);
  mongoose.connect(MONGO_URL)
    .then(() => console.log('DB connected'))
    .catch((err) => console.log(err));
});
