const { User } = require('../db');

module.exports = {
  create: (userObj) => User.create(userObj),
  updateById: (id, objectToUpdate) => User.findByIdAndUpdate({ _id: id }, objectToUpdate, { new: true }),
  deleteById: (id) => User.findOneAndDelete(id),
  getById: (id) => User.findById(id),
  find: () => User.find(),
  stats: () => {
    // current date
    const date = new Date();
    // return last year from today
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    return User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } }, // match users during last year from today
      { $project: { month: { $month: '$createdAt' } } }, // return month from createdAt field
      { $group: { _id: '$month', total: { $sum: 1 } } }, // return id:9 -september, total:2 - qty users
    ]);
  }
};
