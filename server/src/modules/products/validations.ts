// src\modules\products\validations.ts
import {z} from 'zod';
import { Request, Response, NextFunction } from "express";
import Product from "../../database/models/product";
import httpStatus from "http-status";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const productSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Product name must be at least 3 characters long' })
    .refine((val) => val.trim().length > 0, { message: 'Product name is required' }), 
  
  price: z
    .number({ invalid_type_error: 'Price must be a number' }) 
    .positive({ message: 'Price must be a positive number' }),


  images: z.array(z.string().url()),  
    

  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters long' })
    .refine((val) => val.trim().length > 0, { message: 'Description is required' }), 

  category: z
    .string()
    .min(3, { message: 'Category must be at least 3 characters long' })
    // .refine((val) => objectIdRegex.test(val), { message: 'Invalid category. Must be a valid ObjectId' })
    .refine((val) => val.trim().length > 0, { message: 'Category is required' }),

  featured: z.boolean().optional(),
});


export const productUpdateSchema = z.object({
    name: z
      .string()
      .min(3, { message: 'Product name must be at least 3 characters long' })
      .optional(),
      
  
    price: z
      .number({ invalid_type_error: 'Price must be a number' })
      .positive({ message: 'Price must be a positive number' })
      .optional(),
  
    description: z
      .string()
      .min(10, { message: 'Description must be at least 10 characters long' })
      .optional(),
  
    category: z
      .string()
      .min(3, { message: 'Category must be at least 3 characters long' })
      .optional(),
  
    featured: z.boolean().optional(),
  });

  export const checkProductNameExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name } = req.body;
      const productId = req.params.id; 

      const productExists = await Product.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
      if (productExists && productExists._id.toString() !== productId) {
        return res.status(httpStatus.CONFLICT).json({
          status: httpStatus.CONFLICT,
          message: `Product with name "${name}" already exists`,
        });
      }
  
      next(); 
    } catch (error) {
      console.error("Error checking product name:", error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: "Internal Server Error",
      });
    }
  };
  