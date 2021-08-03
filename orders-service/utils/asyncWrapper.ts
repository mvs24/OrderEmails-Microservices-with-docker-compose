import { NextFunction, Request, Response } from "express";

export const asyncWrapper: (
  fn: Function
) => (req: Request, res: Response, next: NextFunction) => void = (
  fn: Function
) => (req: Request, res: Response, next: NextFunction) => {
  fn(req, res, next).catch(next);
};
