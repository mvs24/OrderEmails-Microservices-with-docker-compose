import { NextFunction, Request, Response } from "express";
import { AppError } from "../../utils/AppError";

export const globalErrorHandler = (
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log("error", err);

  if (err instanceof AppError) {
    if (process.env.NODE_ENV === "development") {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        isOperational: err.isOperational,
      });
    } else {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
  } else {
    res.status(500).json({
      status: "error",
      message: "Something went wrong!",
    });
  }
};
