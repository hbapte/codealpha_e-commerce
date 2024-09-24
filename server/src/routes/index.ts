import express from 'express';
import authRouter from './authRoutes';
import productRoutes from "./productRoutes";
import categoryRoutes from "./categoryRoutes";
// import userRoutes from "./userRoutes";
// import orderRoutes from "./orderRoutes";
// import cartRoutes from "./cartRoutes";
// import addressRoutes from "./addressRoutes";
// import paymentRoutes from "./paymentRoutes";



const router = express.Router();

router.use("/products", productRoutes, );
router.use('/auth', authRouter);
router.use('/category', categoryRoutes);
// router.use('/users', userRoutes);
// router.use('/orders', orderRoutes);
// router.use('/cart', cartRoutes);
// router.use('/address', addressRoutes);
// router.use('/payment', paymentRoutes);


export default router;

