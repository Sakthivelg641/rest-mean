import mongoose from "mongoose";

let userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  department: {
    type: String,
    required: true
  }
});

let User = module.exports = mongoose.model('user', userSchema);

module.exports.get = function (callback, limit) {
  User.find(callback).limit(limit);
}
