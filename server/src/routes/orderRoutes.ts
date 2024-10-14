import { getOrderByIdController,createOrderController,deleteOrderController,getAllOrdersController,updateOrderController } from "../modules/orders/orderController";
import validation from "../middlewares/validation";
import express from "express";
import { createOrderSchema } from "../modules/orders/validator";

const router = express.Router();

//  orders routes
router.get("/", getAllOrdersController);
router.post("/", validation(createOrderSchema), createOrderController);
router.get("/:id", getOrderByIdController);
router.put("/:id", updateOrderController);
router.delete("/:id", deleteOrderController);

export default router;