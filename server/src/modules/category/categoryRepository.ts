import Category from "../../database/models/category";
import { Request, Response } from "express";

const getAllCategory = async (req: Request, res: Response) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  }

    // POST a new category
    const createCategory = async (req: Request, res: Response) => {
      try {
        const { name, description } = req.body;
        const newCategory = new Category({ name: name, description: description });
        await newCategory.save();
        res.status(201).json(newCategory);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
      }
    }

      // GET a single category by ID

  const getCategoryById = async (req: Request, res: Response) => {
    try {
      const category = await Category.findById(req.params.id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
}

    // PUT update a category by ID

    const updateCategory = async (req: Request, res: Response) => {
        try {
            const { name, description } = req.body;
            const updatedFields: { name?: string, description?:string } = {};
        
            if (name) updatedFields.name = name;
            if (description) updatedFields.description = description;
        
            const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            updatedFields,
            { new: true }
            );
        
            if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found" });
            }
        
            res.json(updatedCategory);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server Error" });
        }
        };

    // DELETE a category by ID

    const deleteCategory = async (req: Request, res: Response) => {
        try {
            const category = await Category.findByIdAndDelete(req.params.id);
            if (!category) {
            return res.status(404).json({ message: "Category not found" });
            }
            res.json({ message: "Category deleted" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server Error" });
        }
        };

export {
    getAllCategory,
    createCategory,
    getCategoryById,
    updateCategory,
    deleteCategory
};


