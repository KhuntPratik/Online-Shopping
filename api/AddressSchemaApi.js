const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
const AddressSchema = require("../Schemas/AddressSchema")
const app = express()


const atlsurl = "mongodb+srv://kp104patel:kp123@cluster0.g52xn.mongodb.net/"


app.use(bodyParser.json())

mongoose.connect(atlsurl).then(()=>{
    console.log("Atlas Connected");


// Get All
    app.get("/Address" , async(req,res)=>{
        const data = await AddressSchema.find();
        res.send(data);
    })

// Get By Id

    app.get("/Address/:id" , async(req,res)=>{
        const data = await AddressSchema.findOne({_id:{$eq: req.params.id}})
        res.send(data)
    })


// insert

    app.post("/Address",async(req,res)=>{
        try{
        const tempObj = new AddressSchema({
            AddressId : req.body.AddressId,
            Address : req.body.Address,
            City : req.body.City,
            State : req.body.State,
            Country : req.body.Country,
            Pincode : req.body.Pincode,
            UserId : req.body.UserId    
        })
        const data = await tempObj.save();
        res.send(data);
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
    })

// update

    app.put("/Address/:id" , async(req,res)=>{
        const AddData = await AddressSchema.findOne({_id:{$eq: req.params.id}})
        AddData.AddressId = req.body.AddressId,
        AddData.Address = req.body.Address,
        AddData.City = req.body.City,
        AddData.State = req.body.State,
        AddData.Country = req.body.Country,
        AddData.Pincode = req.body.Pincode,
        AddData.UserId = req.body.UserId

        await AddData.save();
        res.send("Data Update")
    })


// delete

    app.delete("/Address/:id" , async(req,res)=>{
        await AddressSchema.deleteOne({_id: {$eq: req.params.id}})
        res.send("Delete Data")
    })



    app.listen(3000, () => {
        console.log("Srever Strated");
    })
})