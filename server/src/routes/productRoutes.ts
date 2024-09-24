// src\routes\productRoutes.ts
import { getAllProductsController, createProductController, getProductByIdController, updateProductController, deleteProductController} from "../modules/products/productController";
import express from "express";
import { adminAuthorization, authorization } from "../middlewares/authorization";
import validation from "../middlewares/validation"; // Import the validation middleware
import { productSchema, productUpdateSchema,checkProductNameExists } from "../modules/products/validations"; // Import validation schemas
import multerConfig from "../utils/multer";

const router = express.Router();

//  Products routes
router.get("/", getAllProductsController);
router.post(
    "/", 
    validation(productSchema),
    checkProductNameExists,
    createProductController as any
  );

  

// Get a single product by ID
router.get("/:id", getProductByIdController);

// Validate updated product data before updating a product
router.put("/:id", validation(productUpdateSchema), checkProductNameExists, updateProductController);

// Delete a product by ID
router.delete("/:id",  deleteProductController);

export default router;
