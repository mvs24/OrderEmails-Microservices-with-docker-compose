import { NextFunction, Request, Response } from "express";
import { AppError } from "../../utils/AppError";
import { asyncWrapper } from "../../utils/asyncWrapper";
import { OrderCreatedPublisher } from "../events/publishers/OrderCreatedPublisher";
import OrderEmail from "../models/orderEmailModel";
import Order from "../models/orderModel";
import { natsWrapper } from "../natsWrapper";

const isEmailValid = (input: string) => input.match(/^\S+@\S+$/);

export const createOrder = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId, userEmail, address } = req.body;
    const products = req.body.products;

    if (!isEmailValid(userEmail))
      return next(new AppError("Email is invalid", 400));
    if (!userId || !address)
      return next(new AppError("UserId and address must be defined", 400));

    if (products.length === 0) {
      return next(new AppError("There are no products for this order", 400));
    }

    const order = Order.build({
      userEmail,
      userId,
      products,
      address,
    });
    await order.save();
    const orderEmail = OrderEmail.build({
      orderId: order._id,
    });
    await orderEmail.save();

    new OrderCreatedPublisher(natsWrapper.stan).publish({
      orderId: order._id,
    });

    return res.status(201).json({
      status: "success",
      data: order,
    });
  }
);
