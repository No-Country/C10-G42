import { NextFunction, Request, Response } from "express";

export const testMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log("Pase por el middleware");
  next();
}