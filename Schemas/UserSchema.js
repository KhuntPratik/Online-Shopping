const mongoose = require('mongoose');

const schema = mongoose.Schema({
    UserProfileImage: String,
    UserName: String,
    UserEmail: String,
    UserPassword:String,
    UserContact: Number,
})

module.exports = mongoose.model("users",schema);