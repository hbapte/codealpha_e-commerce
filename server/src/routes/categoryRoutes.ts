import validation from "../middlewares/validation";
import { getAllCategoryController,
    createCategoryController,
    getCategoryByIdController,
    updateCategoryController,
    deleteCategoryController } from "../modules/category/categoryController";

import express from "express";
import { categorySchema, checkCategoryNameExists } from "../modules/category/validation";
import { categoryUpdateSchema } from "../modules/category/validation";

const router = express.Router();

//  category routes
router.get("/", getAllCategoryController);
router.post("/", validation(categorySchema), checkCategoryNameExists,  createCategoryController);
router.get("/:id", getCategoryByIdController);
router.put("/:id", validation(categoryUpdateSchema), checkCategoryNameExists, updateCategoryController);
router.delete("/:id", deleteCategoryController);

export default router;