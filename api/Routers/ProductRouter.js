import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import ProductSchema from '../../Schemas/ProductSchema.js';

const router = express.Router();
router.use(bodyParser.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../../Images/ProductImage'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Add Product API (POST)
router.post("/", upload.single('ProductImage'), async (req, res) => {
    try {
        const { ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductDiscount, CategoryID } = req.body;
        const ProductImage = req.file ? req.file.filename : null;

        const newProduct = new ProductSchema({
            ProductImage,
            ProductName,
            ProductDescription,
            ProductPrice,
            ProductQuantity,
            ProductDiscount,
            CategoryID
        });

        await newProduct.save();
        res.status(201).json({ message: "Product created successfully", product: newProduct });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Update Product API (PUT)
router.put("/:id", upload.single('ProductImage'), async (req, res) => {
    try {
        const { id } = req.params;
        const { ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductDiscount, CategoryID } = req.body;
        const ProductImage = req.file ? req.file.filename : null;

        const updateFields = { ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductDiscount, CategoryID };
        if (ProductImage) updateFields.ProductImage = ProductImage;

        const updatedProduct = await ProductSchema.findByIdAndUpdate(id, updateFields, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Get Product By ID (GET)
router.get("/:id", async (req, res) => {
    try {
        const product = await ProductSchema.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Get Product By CategoryID (GET)
import mongoose from 'mongoose';

router.get("/category/:id", async (req, res) => {
    try {
        const categoryId = req.params.id;
        const products = await ProductSchema.find({ CategoryID: new mongoose.Types.ObjectId(categoryId) });

        if (products.length === 0) {
            return res.status(404).json({ error: "No products found for this category" });
        }
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// Get All Products (GET)
router.get("/", async (req, res) => {
    try {
        const products = await ProductSchema.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Delete Product By ID (DELETE)
router.delete("/:id", async (req, res) => {
    try {
        const deletedProduct = await ProductSchema.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
