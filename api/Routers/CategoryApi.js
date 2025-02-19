const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
const Category = require("../Schemas/Category")



const router = express.Router();
router.use(bodyParser.json());




// Get All

router.get("/", async (req, res) => {
    const categories = await Category.find();
    res.send(categories);
});

// Get by id
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
        return res.send("Category not found");
    }
    res.send(category);
});

// insert

router.post("/", async (req, res) => {
    const { CategoryName } = req.body;

    const newCategory = new Category({ CategoryName });

    await newCategory.save();
    res.send({ message: "Category created successfully", category: newCategory });
});

//  update

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { CategoryName } = req.body;
    const category = await Category.findById(id);

    if (!category) {
        return res.send("Category not found");
    }
    
    category.CategoryName = CategoryName;

    await category.save();
    res.send("Category updated successfully");
});

// delete

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    
    if (!category) {
        return res.send("Category not found");
    }
    res.send("Category deleted successfully");
});


export default router;

