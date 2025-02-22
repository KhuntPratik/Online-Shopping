

import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    CategoryID: Number,
    CategoryName: String
});

export const categories = mongoose.model("categories", CategorySchema); // ✅ Named export
