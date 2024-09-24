import { getOrderById, createOrder, deleteOrder, getAllOrders, updateOrder } from "./orderRepository";
import { Request, Response } from "express";

const getAllOrdersController = async (req: Request, res: Response) => {
    await getAllOrders(req, res);
    }

const createOrderController = async (req: Request, res: Response) => {
    await createOrder(req, res);
    }

const getOrderByIdController = async (req: Request, res: Response) => {
    await getOrderById(req, res);
    }

const updateOrderController = async (req: Request, res: Response) => {
    await updateOrder(req, res);
    }

const deleteOrderController = async (req: Request, res: Response) => {
    await deleteOrder(req, res);
    }

export {
    getAllOrdersController,
    createOrderController,
    getOrderByIdController,
    updateOrderController,
    deleteOrderController
}