import { getAllCategory, createCategory, getCategoryById, updateCategory, deleteCategory  } from "./categoryRepository";
import { Request, Response } from "express";

const getAllCategoryController = async (req: Request, res: Response) => {
    await getAllCategory(req, res);
};

const createCategoryController = async (req: Request, res: Response) => {
    await createCategory(req, res);
};

const getCategoryByIdController = async (req: Request, res: Response) => {
    await getCategoryById(req, res);
};

const updateCategoryController = async (req: Request, res: Response) => {
    await updateCategory(req, res);
};

const deleteCategoryController = async (req: Request, res: Response) => {
    await deleteCategory(req, res);
};

export {
    getAllCategoryController,
    createCategoryController,
    getCategoryByIdController,
    updateCategoryController,
    deleteCategoryController
}