import mongoose from 'mongoose';

const schema = mongoose.Schema({
    CategoryName: String,
})

export default mongoose.model("categories",schema);