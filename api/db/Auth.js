const { Schema, model } = require('mongoose');

const authSchema = new Schema({
  access_token: { type: String, required: true },
  refresh_token: { type: String, required: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = model('Auth', authSchema);
