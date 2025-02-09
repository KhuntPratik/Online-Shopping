const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
const User = require("../Schemas/UserSchema")
const app = express()


const atlsurl = "mongodb+srv://kp104patel:kp123@cluster0.g52xn.mongodb.net/"

app.use(bodyParser.json())

mongoose.connect(atlsurl).then(()=>{
    console.log("Atlas Connected");


// Get All
    app.get("/User" , async(req,res)=>{
        const data = await User.find();
        res.send(data);
    })

// Get By Id
    app.get("/User/:id" , async(req , res)=>{
        const data = await User.findOne({_id : {$eq : req.params.id}})
        res.send(data);
    })

// insert
    app.post("/User" , async(req,res)=>{
        const tempObj =  new User({
            UserName : req.body.UserName,
            UserEmail : req.body.UserEmail,
            UserPassword : req.body.UserPassword,
            UserContact : req.body.UserContact
        })

        const data = await tempObj.save();
        res.send(data);
    })


// update

    app.put("/User/:id" , async(req,res)=>{
        const Adddata = await User.findOne({_id : {$eq : req.params.id}})
        Adddata.UserName = req.body.UserName,
        Adddata.UserEmail = req.body.UserEmail,
        Adddata.UserPassword = req.body.UserPassword,
        Adddata.UserContact = req.body.UserContact


        await Adddata.save();
        res.send("data update")
    })


//delete

    app.delete("/User/:id" , async(req,res)=>{
        await User.deleteOne({_id:{$eq:req.params.id}})
        res.send("data delete")
    })


        app.listen(3000, () => {
            console.log("Srever Strated");
        })
    })

    