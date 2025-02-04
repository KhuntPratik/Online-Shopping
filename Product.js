const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
const Product = require("./Schemas/ProductSchema")
const app = express()


const atlsurl = "mongodb+srv://kp104patel:kp123@cluster0.g52xn.mongodb.net/"


app.use(bodyParser.json())

mongoose.connect(atlsurl).then(() => {
    console.log("Atlas Connected");

    // getall
    app.get("/Product", async (req, res) => {
        const data = await Product.find()
        res.send(data)
    })


    // Get by Id
 
    app.get("/Product/:id", async (req, res) => {
        const data = await Product.findOne({ _id: { $eq: req.params.id } })
        res.send(data)
    })

     // insert
     app.post("/Product", async (req, res) => {
        const tempObj = new Product({
            ProductName: req.body.ProductName,
            ProductDescripiton: req.body.ProductDescripiton,
            ProductImage: req.body.ProductImage,
            ProductPrice: req.body.ProductPrice,
            ProductQuantity: req.body.ProductQuantity,
            ProductDiscount: req.body.ProductDiscount,
            CategoryID: req.body.CategoryID
        })
        const data = await tempObj.save();
        res.send(data)
    })


        // update
        app.put("/product/:id", async (req, res) => {
            const proData = await Product.findOne({ _id: { $eq: req.params.id } })
            proData.ProductName= req.body.ProductName,
            proData.ProductDescripiton= req.body.ProductDescripiton,
            proData.ProductImage= req.body.ProductImage,
            proData.ProductPrice= req.body.ProductPrice,
            proData.ProductQuantity= req.body.ProductQuantity,
            proData.ProductDiscount= req.body.ProductDiscount,
            proData.CategoryID= req.body.CategoryID
    
            await proData.save();
            res.send("Data updated")
        })





    app.listen(3000, () => {
        console.log("Srever Strated");
    })
})


