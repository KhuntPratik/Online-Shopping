// import mongoose from 'mongoose';


import mongoose from 'mongoose'

const schema = mongoose.Schema({
  ProductId: Number,
  UserId:Number
})

export default mongoose.model('WishlistSchema', schema)



