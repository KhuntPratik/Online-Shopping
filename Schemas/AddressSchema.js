const mongoose = require('mongoose')

const schema = mongoose.Schema({
  AddressId: Number,
  Address: String,
  City:String,
  State:String,
  Country:String,
  Pincode:Number,
  UserId:Number
})

module.exports = mongoose.model('address', schema)



