import mongoose from 'mongoose';

const schema = mongoose.Schema({
    CategoryName: String,
    CategoryImage:String,
})

export default mongoose.model("categories",schema);