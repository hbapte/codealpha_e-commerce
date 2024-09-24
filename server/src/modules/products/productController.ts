// src\modules\products\productController.ts
import { Request, Response } from "express";
import { getAllProducts, createProduct, getProductById , updateProduct, deleteProduct } from "./productRepository";


const getAllProductsController = async (req: Request, res: Response) => await getAllProducts(req, res);

const createProductController = async (req:Request, res: Response) =>  await createProduct(req, res);

const getProductByIdController = async (req: Request, res: Response) => await getProductById(req, res);

const updateProductController = async (req: Request, res: Response) => await updateProduct(req, res);

const deleteProductController = async (req: Request, res: Response) => await deleteProduct(req, res);

export {
    getAllProductsController,
    createProductController,
    getProductByIdController,
    updateProductController,
    deleteProductController,
};


