import { Response } from "express";

export const httpErrorHandler = (res: Response, error: any, status: number = 404) => {
  res.status(status);
  res.send(error);
}