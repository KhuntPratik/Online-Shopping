import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    ProductName: { type: String, required: true },
    ProductDescription: { type: String },
    ProductPrice: { type: Number, required: true },
    ProductQuantity: { type: Number, required: true },
    ProductDiscount: { type: Number },
    CategoryID: { type: mongoose.Schema.Types.ObjectId, ref: 'categories', required: true },
    ProductImage: { type: String }
});


export default mongoose.model("products",schema);