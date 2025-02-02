const mongoose = require('mongoose');

const schema = mongoose.Schema({
    CartID: Number,
    ProductID:Number,
    ProductQuantity:Number,
    UserID: String,
})

module.exports = mongoose.model("carts",schema);