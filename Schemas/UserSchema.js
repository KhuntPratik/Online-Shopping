// const mongoose = require('mongoose');

import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
    UserId: String,
    UserName: String,
    UserEmail: String,
    UserPassword:String,
    UserContact: Number,
})
export const User = mongoose.model("User", UserSchema); 

