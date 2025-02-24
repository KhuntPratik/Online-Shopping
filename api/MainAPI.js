import mongoose from 'mongoose'
import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv';
dotenv.config();

import { router as CartRouter} from '../api/Routers/CartRouter.js'

import CategoryRouter from '../api/Routers/CategoryRouter.js'
import OrderRouter from '../api/Routers/OrderRouter.js'
import ProductRouter from '../api/Routers/ProductRouter.js'

import UserRouter from '../api/Routers/UserRouter.js'
import WishlistRouter from '../api/Routers/WishlistRouter.js'

const app = express();
app.use(bodyParser.json())

mongoose.connect('mongodb+srv://kp104patel:kp123@cluster0.g52xn.mongodb.net/').then(() => {
    console.log("Database Connected");
    

    app.use("/cart",CartRouter);
    app.use("/category",CategoryRouter);
    app.use("/order",OrderRouter);
    app.use("/product",ProductRouter);
  
    app.use("/user",UserRouter);
    app.use("/wishlist",WishlistRouter);

    app.listen(3000,()=>{
        console.log("Server Started at ",3000);
    })
})