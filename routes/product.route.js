const { Router } = require("express");
const CryptoJS = require("crypto-js");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const { PAS_SEC } = require("../config/config");
const { Product } = require("../models");

const productRouter = Router();

// CREATE
productRouter.post("/", verifyTokenAndAuthorization, async (req, res) => {
const newProduct = new Product(req.body)

 try{ 
    const savedProduct = await newProduct.save()

    res.json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE
productRouter.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const upadatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json(upadatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE
productRouter.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findOneAndDelete(req.params.id);

    res.send("Product has been deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET PRODUCT BY ID
productRouter.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.send(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL
productRouter.get("/", async (req, res) => {
  try {
    let product
    const qNew = req.query.new;
    const qCategory = req.query.category;
    
    if(qNew){
     product =  await Product.find().sort({createdAt:-1}).limit(1)
    } else if(qCategory){
      // find from query in DB in field categories and return object with this categories
      product =  await Product.find({categories:{$in:[qCategory]}})
    } else {
      product = await Product.find()
    }

    res.json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

// // GET USER STATS

// productRouter.get("/stats", async (req, res) => {
//   const date = new Date(); // current date
//   const lastYear = new Date(date.setFullYear(date.getFullYear() - 1)); // return last year from today

//   try {
//     const data = await User.aggregate([
//       { $match: { createdAt: { $gte: lastYear } } }, // match users during last year from today
//       { $project: { month: { $month: "$createdAt" } } }, // return month from createdAt field
//       { $group: { _id: "$month", total: { $sum: 1 } } }, // return id:9 -september, total:2 - qty users
//     ]);

//     res.json(data);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = productRouter;