const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
const Category = require("../Schemas/CategorySchema")
const app = express()


const atlsurl = "mongodb+srv://kp104patel:kp123@cluster0.g52xn.mongodb.net/"

app.use(bodyParser.json())

mongoose.connect(atlsurl).then(()=>{
    console.log("Atlas Connected");


// Get All

    app.get("/Category", async(req,res)=>{
        const data = await Category.find()
        res.send(data)
    })

// Get by id
    app.get("/Category/:id" , async(req,res)=>{
        const data = await Category.findOne({_id:{_$eq : req.params.id}})
        res.send(data)
    })

// insert

        app.post("/Category" , async(req,res)=>{
            const tempObj =  new Category({
                CategoryName : req.body.CategoryName
            })
    
            const data = await tempObj.save();
            res.send(data);
        })

//  update

            app.put("/Category/:id" , async(req,res)=>{
                const Adddata = await Category.findByIdAndUpdate(req.params.id,req.body)
        
               
                res.send(Adddata)
            })

// delete

              app.delete("/Category/:id" , async(req,res)=>{
                    await Category.deleteOne({_id:{$eq:req.params.id}})
                    res.send("data delete")
                })

    app.listen(3000,()=>{
        console.log("server Start");
        
    })
    
})