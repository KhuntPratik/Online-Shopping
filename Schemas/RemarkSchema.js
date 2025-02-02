const mongoose = require('mongoose')

const schema = mongoose.Schema({
  RemarkId: Number,
  RemarkDescription: String,
  Rating: Number,
  UpdatedAt: String,
  UserId: Number,
  ProductID: Number
})

module.exports = mongoose.model('remarks', schema)