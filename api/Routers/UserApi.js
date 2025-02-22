import express from "express";
import bodyParser from 'body-parser'
import mongoose from 'mongoose'



import { User } from "../../Schemas/UserSchema.js"; // ✅ Correct


// const User = require("../../Schemas/UserSchema")


// const app = express().Router()

const router = express.Router();
router.use(bodyParser.json());





// Get All
router.get("/", async (req, res) => {
    const data = await User.find();
    res.send(data);
});


// Get By Id
router.get("/:id", async (req, res) => {
    const data = await User.findOne({ _id: req.params.id });
    res.send(data);
});
// insert
router.post("/", async (req, res) => {
    const { UserId, UserName, UserEmail, UserPassword, UserContact } = req.body;

    const newUser = new User({
        UserId,
        UserName,
        UserEmail,
        UserPassword,
        UserContact
    });

    await newUser.save();
    res.send("User created successfully");
});


// update

router.put("/:id",  async (req, res) => {
    const { UserId, UserName, UserEmail, UserPassword, UserContact } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
            UserId,
            UserName,
            UserEmail,
            UserPassword,
            UserContact
        },
        { new: true }
    );

    if (!updatedUser) {
        return res.send("User not found");
    }
    res.send("User updated successfully");
});

//delete

router.delete("/:id", async (req, res) => {
    const data = await User.deleteOne({ _id: req.params.id });
    res.send(data);
});


export default router;

