import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import multer from "multer";

// Ensure correct import of the schema model
import { products } from "../../Schemas/ProductSchema.js";

const router = express.Router();
router.use(bodyParser.json());

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Ensure this folder exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Get all products
router.get("/", async (req, res) => {
    const allProducts = await products.find();
    res.send(allProducts);
});

// Get product by ID
router.get("/:id", async (req, res) => {
    const product = await products.findById(req.params.id);

    if (!product) {
        return res.status(404).send("Product not found");
    }
    res.send(product);
});

// Insert new product
router.post("/", upload.single("ProductImage"), async (req, res) => {
    const { ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductDiscount, CategoryID } = req.body;
    const ProductImage = req.file ? req.file.filename : null;

    const newProduct = new products({
        ProductImage,
        ProductName,
        ProductDescription,
        ProductPrice,
        ProductQuantity,
        ProductDiscount,
        CategoryID
    });

    await newProduct.save();
    res.send("Product created successfully");
});

// Update product
router.put("/:id", upload.single("ProductImage"), async (req, res) => {
    const { ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductDiscount, CategoryID } = req.body;
    const ProductImage = req.file ? req.file.filename : undefined;

    const updatedProduct = await products.findByIdAndUpdate(
        req.params.id,
        {
            ProductName,
            ProductDescription,
            ProductPrice,
            ProductQuantity,
            ProductDiscount,
            CategoryID,
            ProductImage
        },
        { new: true }
    );

    if (!updatedProduct) {
        return res.status(404).send("Product not found");
    }
    res.send("Product updated successfully");
});

// Delete product
router.delete("/:id", async (req, res) => {
    const deletedProduct = await products.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
        return res.status(404).send("Product not found");
    }
    res.send("Product deleted successfully");
});

export default router;
