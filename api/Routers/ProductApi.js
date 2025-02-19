const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
const Product = require("../Schemas/Product")


const router = express.Router();
router.use(bodyParser.json());



    // getall
    router.get("/", async (req, res) => {
        const products = await Product.find();
        res.send(products);
    });
    


    // Get by Id
 
    router.get("/:id", async (req, res) => {
        const product = await Product.findById(req.params.id);
    
        if (!product) {
            return res.send("Product not found");
        }
        res.send(product);
    });

     // insert
     router.post("/", upload.single('ProductImage'), async (req, res) => {
        const { ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductDiscount, CategoryID } = req.body;
        const ProductImage = req.file ? req.file.filename : null;
    
        const newProduct = new Product({
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


        // update
        router.put("/:id", upload.single('ProductImage'), async (req, res) => {
            const { ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductDiscount, CategoryID } = req.body;
            const ProductImage = req.file ? req.file.filename : null;
        
            const updatedProduct = await Product.findByIdAndUpdate(
                req.params.id,
                {
                    ProductName,
                    ProductDescription,
                    ProductPrice,
                    ProductQuantity,
                    ProductDiscount,
                    CategoryID,
                    ProductImage: ProductImage || undefined
                },
                { new: true }
            );
        
            if (!updatedProduct) {
                return res.send("Product not found");
            }
            res.send("Product updated successfully");
        });

        // delete

        router.delete("/:id", async (req, res) => {
            const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        
            if (!deletedProduct) {
                return res.send("Product not found");
            }
            res.send("Product deleted successfully");
        });



        export default router;
