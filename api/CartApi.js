const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
const Cart = require("../Schemas/CartSchema")
const app = express()


const atlsurl = "mongodb+srv://kp104patel:kp123@cluster0.g52xn.mongodb.net/"

app.use(bodyParser.json())

mongoose.connect(atlsurl).then(()=>{
    console.log("Atlas Connected");


// Get All
    app.get("/Cart" , async(req,res)=>{
        const data = await Cart.find();
        res.send(data);
    })

// Get By Id
    app.get("/Cart/:id" , async(req , res)=>{
        const data = await Cart.findOne({_id : {$eq : req.params.id}})
        res.send(data);
    })

// insert
    app.post("/Cart" , async(req,res)=>{
        const tempObj =  new Cart({
            ProductID : req.body.ProductID,
            ProductQuantity : req.body.ProductQuantity,
            UserID : req.body.UserID
        })

        const data = await tempObj.save();
        res.send(data);
    })


// update

    app.put("/Cart/:id" , async(req,res)=>{
        const Adddata = await Cart.findOne({_id : {$eq : req.params.id}})
        Adddata.ProductID = req.body.ProductID,
        Adddata.ProductQuantity = req.body.ProductQuantity,
        Adddata.UserID = req.body.ProductQuantity

        await Adddata.save();
        res.send("data update")
    })


//delete

    app.delete("/Cart/:id" , async(req,res)=>{
        await Cart.deleteOne({_id:{$eq:req.params.id}})
        res.send("data delete")
    })


        app.listen(3000, () => {
            console.log("Srever Strated");
        })
    })

    