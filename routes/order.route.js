const { Router } = require("express");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyToken,
} = require("./verifyToken");
const { Order } = require("../models");

const orderRouter = Router();

// CREATE
orderRouter.post("/", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();

    res.json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE
orderRouter.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const upadatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json(upadatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE
orderRouter.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findOneAndDelete(req.params.id);

    res.send("Order has been deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
});

// // GET USER Orders
orderRouter.get(
  "/find/:userId",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      const orders = await Order.findOne({ userId: req.params.userId });

      res.send(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// GET ALL
orderRouter.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get monthly income
orderRouter.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date(); // current date
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1)); // return last month
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1)); // return previous month from last month

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } }, // match users during last year from today
      { $project: { month: { $month: "$createdAt" }, sales: "$amount" } }, // return month from createdAt field
      { $group: { _id: "$month" }, total: { $sum: "$sales" } },
    ]);

    res.json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = orderRouter;
