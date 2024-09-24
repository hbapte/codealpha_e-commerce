import { getOrderByIdController,createOrderController,deleteOrderController,getAllOrdersController,updateOrderController } from "../modules/orders/orderController";

import express from "express";

const router = express.Router();

//  orders routes
router.get("/", getAllOrdersController);
router.post("/", createOrderController);
router.get("/:id", getOrderByIdController);
router.put("/:id", updateOrderController);
router.delete("/:id", deleteOrderController);

export default router;