const { Order } = require('../models');

module.exports = {
  create: (orderObj) => Order.create(orderObj),
  updateById: (id, objectToUpdate) => Order.findByIdAndUpdate({ _id: id }, objectToUpdate, { new: true }),
  deleteById: (id) => Order.findOneAndDelete(id),
  getById: (id) => Order.findById(id),
  find: () => Order.find(),
  stats: () => {
    const date = new Date(); // current date
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1)); // return last month
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1)); // return previous month from last month

    return Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } }, // match users during last year from today
      { $project: { month: { $month: '$createdAt' }, sales: '$amount' } }, // return month from createdAt field
      { $group: { _id: '$month', total: { $sum: '$sales' } } }
    ]);
    // result
    //   [
    //    {
    //     "_id": 6,
    //     "total": 25
    //    }
    //   ]
  },
};
