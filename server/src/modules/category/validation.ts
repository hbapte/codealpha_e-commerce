import { z } from "zod";
import { Request, Response, NextFunction } from "express";
import Category from "../../database/models/category";
import httpStatus from "http-status";


export const categorySchema = z.object({
    name: z
    .string()
    .min(3, { message: 'Category name must be at least 3 characters long' })
    .refine((val) => val.trim().length > 0, { message: 'Category name is required' }), 
  
    description: z
    .string()
    .min(1, { message: 'Description must be at least 1 characters long' })
    .refine((val) => val.trim().length > 0, { message: 'Description is required' }), 
});


export const categoryUpdateSchema = z.object({
    name: z.string().min(3).optional(),
    description: z.string().min(10).optional(),
});


export const checkCategoryNameExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name } = req.body;
      const categoryId = req.params.id; 

      const categoryExists = await Category.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
      if (categoryExists && categoryExists._id.toString() !== categoryId) {
        return res.status(httpStatus.CONFLICT).json({
          status: httpStatus.CONFLICT,
          message: `Category with name "${name}" already exists`,
        });
      }
  
      next(); 
    } catch (error) {
      console.error("Error checking category name:", error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: "Internal Server Error",
      });
    }
  };