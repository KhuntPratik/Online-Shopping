const mongoose = require('mongoose');

const schema = mongoose.Schema({
    ProductID: Number,
    ProductImage:String,
    ProductName: String,
    ProductDescripiton:String,
    ProductPrice:Number,
    ProductQuantity:Number,
    ProductDiscount:Number,
    CategoryID:Number 
})

module.exports = mongoose.model("products",schema);