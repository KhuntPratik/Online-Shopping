const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
const Cart = require("../../Schemas/CartSchema")



const router = express.Router();



router.use(bodyParser.json());


// Get All
router.get("/Cart", async (req, res) => {
    const data = await Cart.find();
    res.send(data);
})

// Get By Id
router.get("/Cart/:id", async (req, res) => {
    const data = await Cart.findOne({ _id: { $eq: req.params.id } })
    res.send(data);
})

// insert
router.post("/Cart", async (req, res) => {
    const { ProductID, ProductQuantity, UserID } = req.body;

    const newCartItem = new CartSchema({
        ProductID,
        ProductQuantity,
        UserID
    });

    await newCartItem.save();
    res.send("Product added to cart");
});


// update

router.put("/item/:_id", async (req, res) => {
    const { _id } = req.params;
    const { ProductQuantity } = req.body;
    const cartItem = await CartSchema.findById(_id);

    if (!cartItem) {
        return res.send("Cart item not found");
    }

    cartItem.ProductQuantity = ProductQuantity;
    
    await cartItem.save();
    res.send("Product quantity updated");
});



//delete

router.delete("/item/:cartId", async (req, res) => {
    const deletedItem = await CartSchema.findByIdAndDelete(req.params.cartId);

    if (!deletedItem) {
        return res.send("Cart item not found");
    }
    res.send("Cart item removed");
});

export {router};
