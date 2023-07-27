const { Router } = require('express');

const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyToken,
} = require('./verifyToken');

const { Cart } = require('../models');

const cartRouter = Router();

// CREATE
cartRouter.post('/', verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();

    res.json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE
cartRouter.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
  try {
    const upadatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json(upadatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE
cartRouter.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.findOneAndDelete(req.params.id);

    res.send('Cart has been deleted!');
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET USER CART
cartRouter.get(
  '/find/:userId',
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.params.userId });

      res.send(cart);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// GET ALL
cartRouter.get('/', verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = cartRouter;
