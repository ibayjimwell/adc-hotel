import { success } from "zod";
import { NODE_ENV } from "../config/env";

export const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    res.status(statusCode).json({
        success: false,
        message: err.message,
        stack: NODE_ENV === "production" ? null : err.stack
    });
}