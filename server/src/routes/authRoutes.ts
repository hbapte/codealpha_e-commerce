import express from "express";
import { registerController } from "../modules/user/controllers/registerController";
import loginController from "../modules/user/controllers/loginController";
import { requestNewVerificationLinkController } from "../modules/user/controllers/requestNewVerificationLinkController";
import resetPasswordController from "../modules/user/controllers/resetPasswordController";
import forgotPasswordController from "../modules/user/controllers/forgotPasswordController";
import verifyResetTokenController  from "../modules/user/controllers/verifyResetTokenController";
import verifyEmailController from "../modules/user/controllers/verifyEmailController";
import { loginSchema, userSchema } from "../modules/user/validations/userValidations";
import validation from "../middlewares/validation";

const authRouter = express.Router();

authRouter.post("/register", validation(userSchema), registerController, );
authRouter.post("/login", validation(loginSchema), loginController);
authRouter.get("/verify", verifyEmailController);
authRouter.post("/request-new-verification-link", requestNewVerificationLinkController);
authRouter.post("/forgot-password", forgotPasswordController);
authRouter.get("/verify-reset-token", verifyResetTokenController);
authRouter.post("/reset-password", resetPasswordController);

export default authRouter;

