// src\middlewares\validation.ts
import { z, ZodSchema } from "zod";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const validation = (schema: ZodSchema<any>) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse(req.body); 
        return next(); 
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errorMessage = error.errors.map((err) => `${err.path[0]}: ${err.message}`).join(", "); 
            res.status(httpStatus.BAD_REQUEST).json({ status: httpStatus.BAD_REQUEST, message: errorMessage });
        } else {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: httpStatus.INTERNAL_SERVER_ERROR, message: "Internal Server Error" });
        }
    }
};

export default validation;
