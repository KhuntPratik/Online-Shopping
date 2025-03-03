import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import CategorySchema from '../../Schemas/CategorySchema.js';

const router = express.Router();
router.use(bodyParser.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../../uploads'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// 1. Get All Categories
router.get("/", async (req, res) => {
    try {
        const categories = await CategorySchema.find();
        res.json(categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// 2. Get Category by ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ error: "Invalid Category ID" });
        }

        const category = await CategorySchema.findById(id);

        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.json(category);
    } catch (error) {
        console.error("Error in GET /:id:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// 3. Insert a New Category
router.post("/", upload.single('CategoryImage'), async (req, res) => {
    try {
        const { CategoryName } = req.body;
        const CategoryImage = req.file ? req.file.filename : null;

        const newCategory = new CategorySchema({ CategoryName, CategoryImage });
        await newCategory.save();
        res.status(201).json({ message: "Category created successfully", category: newCategory });
    } catch (error) {
        console.error("Error creating category:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// 4. Update Category by ID
router.put("/:id", upload.single('CategoryImage'), async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ error: "Invalid Category ID" });
        }

        const { CategoryName } = req.body;
        const CategoryImage = req.file ? req.file.filename : null;

        const updateFields = { CategoryName };
        if (CategoryImage) updateFields.CategoryImage = CategoryImage;

        const updatedCategory = await CategorySchema.findByIdAndUpdate(id, updateFields, { new: true });

        if (!updatedCategory) {
            return res.status(404).json({ error: "Category not found" });
        }

        res.json({ message: "Category updated successfully", category: updatedCategory });
    } catch (error) {
        console.error("Error updating category:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// 5. Delete Category by ID
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ error: "Invalid Category ID" });
        }

        const category = await CategorySchema.findByIdAndDelete(id);

        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }

        res.json({ message: "Category deleted successfully" });
    } catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
