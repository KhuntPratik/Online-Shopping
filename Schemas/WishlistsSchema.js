import mongoose from 'mongoose';

const schema = mongoose.Schema({
  ProductId: number,
  UserId:number
})

export default mongoose.model('wishlists', schema)



