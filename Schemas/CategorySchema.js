const mongoose = require('mongoose');

const schema = mongoose.Schema({
    CategoryID: Number,
    CategoryName: String,
})

module.exports = mongoose.model("categories",schema);