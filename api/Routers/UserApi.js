const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
const User = require("../../Schemas/UserSchema")
const app = express()

const router = express.Router();
router.use(bodyParser.json());





// Get All
router.get("/User", async (req, res) => {
    const data = await User.find();
    res.send(data);
});


// Get By Id
router.get("/User/:id", async (req, res) => {
    const data = await User.findOne({ _id: req.params.id });
    res.send(data);
});
// insert
router.post("/User", async (req, res) => {
    const { UserName, UserEmail, UserPassword, UserContact, UserAddress, UserCity, UserState, UserCountry, UserPincode } = req.body;

    const newUser = new User({
        UserName,
        UserEmail,
        UserPassword,
        UserContact,
        UserAddress,
        UserCity,
        UserState,
        UserCountry,
        UserPincode,
        UserProfileImage
    });

    await newUser.save();
    res.send("User created successfully");
});


// update

router.put("/User/:id",  async (req, res) => {
    const { UserName, UserEmail, UserPassword, UserContact, UserAddress, UserCity, UserState, UserCountry, UserPincode } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
            UserName,
            UserEmail,
            UserPassword,
            UserContact,
            UserAddress,
            UserCity,
            UserState,
            UserCountry,
            UserPincode,
            UserProfileImage: UserProfileImage || undefined
        },
        { new: true }
    );

    if (!updatedUser) {
        return res.send("User not found");
    }
    res.send("User updated successfully");
});

//delete

router.delete("/User/:id", async (req, res) => {
    const data = await User.deleteOne({ _id: req.params.id });
    res.send(data);
});


export default router;

