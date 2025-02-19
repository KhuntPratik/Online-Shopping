import mongoose from 'mongoose'
import express from 'express'
import bodyParser from 'body-parser'


import { router as CartApi} from './Routers/CartApi.js'
import CategoryApi from './Routers/CategoryApi.js'
import ProductApir from './Routers/ProductApi.js'
import UserApi from './Routers/UserApi.js'
import WishlistApi from './Routers/WishlistsApi.js'

const app = express();
app.use(bodyParser.json())

mongoose.connect('mongodb+srv://kp104patel:kp123@cluster0.g52xn.mongodb.net/').then(() => {
    console.log("Database Connected");
    

    app.use("/cart",CartApi);
    app.use("/category",CategoryApi);
    app.use("/product",ProductApi);
    app.use("/user",UserApi);
    app.use("/wishlist",WishlistApi);

    app.listen(3000,()=>{
        console.log("Server Started at ",3000);
    })
})