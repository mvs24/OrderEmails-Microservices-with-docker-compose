import { NextFunction, Request, Response } from "express";
import { AppError } from "../../utils/AppError";
import { asyncWrapper } from "../../utils/asyncWrapper";
import Order from "../models/orderModel";
import { natsWrapper } from "../natsWrapper";

const isEmailValid = (input: string) => input.match(/^\S+@\S+$/);

export const createPost = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId, userEmail, address, products } = req.body;
    if(!isEmailValid) return next(new AppError('Email is invalid', 400))
    if(!userId||!address) return next(new AppError('UserId and address must be defined', 400))
    
    if (JSON.parse(products).length ===0 ) {
      return next(new AppError("There are no products for this order", 400));
    }

    const order = Order.build({
     userEmail,
     userId,
     products,
     address
    });
    await order.save();

    new OrderCreatedPublisher(natsWrapper.stan).publish({
      id: post._id,
      postType: post.postType,
      content: post.content,
      user: req.user._id,
      version: post.version,
      createdAt: post.createdAt,
    });

    return res.status(201).json({
      status: "success",
      data: post,
    });
  }
);

