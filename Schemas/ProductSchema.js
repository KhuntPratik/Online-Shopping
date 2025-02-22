// const mongoose = require('mongoose');
import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
    ProductID: Number,
    ProductImage:String,
    ProductName: String,
    ProductDescripiton:String,
    ProductPrice:Number,
    ProductQuantity:Number,
    ProductDiscount:Number,
    CategoryID:Number 
})


export const products = mongoose.model("products", ProductSchema); 

