// const express = require("express")
// const mongoose = require("mongoose")
// const bodyParser = require('body-parser')


import express from "express";
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

import { Carts } from "../../Schemas/CartSchema.js";


// const Carts = require("../../Schemas/CartsSchema")
 


const router = express.Router();



router.use(bodyParser.json());


// Get All
router.get("/", async (req, res) => {
    const data = await Carts.find();
    res.send(data);
})

// Get By Id
router.get("/:id", async (req, res) => {
    const data = await Carts.findOne({ _id: { $eq: req.params.id } })
    res.send(data);
})

// insert
router.post("/", async (req, res) => {
    const { ProductID, ProductQuantity, UserID } = req.body;

    const newCartsItem = new CartsSchema({
        ProductID,
        ProductQuantity,
        UserID
    });

    await newCartsItem.save();
    res.send("Product added to Carts");
});


// update

router.put("/:_id", async (req, res) => {
    const { _id } = req.params;
    const { ProductQuantity } = req.body;
    const CartsItem = await CartsSchema.findById(_id);

    if (!CartsItem) {
        return res.send("Carts item not found");
    }

    CartsItem.ProductQuantity = ProductQuantity;
    
    await CartsItem.save();
    res.send("Product quantity updated");
});



//delete

router.delete("/:CartsId", async (req, res) => {
    const deletedItem = await CartsSchema.findByIdAndDelete(req.params.CartsId);

    if (!deletedItem) {
        return res.send("Carts item not found");
    }
    res.send("Carts item removed");
});

export {router};
