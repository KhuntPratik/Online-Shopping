const mongoose = require('mongoose')

const schema = mongoose.Schema({
  WhislistId: Number,
  ProductID: Number,
  UserId:Number
})

module.exports = mongoose.model('whislists', schema)