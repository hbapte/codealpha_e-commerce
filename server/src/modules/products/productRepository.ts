// src\modules\products\productRepository.ts
import Product from "../../database/models/product";
import { Request, Response } from "express";


  // POST a new product
  export const createProduct = async (req:Request , res: Response) => {
    try {
        const newProduct = await Product.create(req.body);       
        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};


// GET all products
export const getAllProducts = async (req: Request, res: Response) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  };
  

  
  // GET a single product by ID
  export const getProductById = async (req: Request, res: Response) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  };
  
  // PUT update a product by ID
  export const updateProduct = async (req: Request, res: Response) => {
    try {
      const { name, category, featured, price, description, images } = req.body;
      const updatedFields: { name?: string; category?:string, featured?: boolean, price?:number, description?: string, images?: string[] } = {};
  
      if (name) updatedFields.name = name;
      if (category) updatedFields.category = category;
      if (featured) updatedFields.featured = featured;
      if (price) updatedFields.price = price;
      if (description) updatedFields.description = description;
      if (images) updatedFields.images = images;     

  
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        updatedFields,
        { new: true }
      );
  
      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      res.json(updatedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  };
  
  // DELETE a product by ID
  export const deleteProduct = async (req: Request, res: Response) => {
    try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
      if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  };
  