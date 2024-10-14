import order from "../../database/models/order";

import { Request, Response } from "express";

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await order.find();
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

const createOrder = async (req: Request, res: Response) => {
  try {
    const { total, buyerInfo, products } = req.body;
    const newOrder = new order({ total, buyerInfo, products });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

const getOrderById = async (req: Request, res: Response) => {
  try {
    const foundOrder = await order.findById(req.params.id);
    if (!foundOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(foundOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

const updateOrder = async (req: Request, res: Response) => {
  try {
    const { orderName } = req.body;
    const updatedFields: { name?: string } = {};

    if (orderName) updatedFields.name = orderName;

    const updatedOrder = await order.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
} catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
    }
}

const deleteOrder = async (req: Request, res: Response) => {
  try {
    const deletedOrder = await order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

export {
  getAllOrders,
  createOrder,
  getOrderById,
  updateOrder,
  deleteOrder
}