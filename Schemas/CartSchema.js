import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    ProductID: String,
    ProductQuantity: Number,
    UserID: String
});

export const Carts = mongoose.model("Carts", CartSchema); 
