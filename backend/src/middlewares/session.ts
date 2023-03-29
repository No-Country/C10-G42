import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/handleJwt";
import { httpErrorHandler } from "../utils/httpErrorHandler";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if(!req.headers.authorization){
      httpErrorHandler(res, "NOT_TOKEN", 401);
      return;
    }
    
    const token = req.headers.authorization.split(" ").pop() as string;
    const dataToken = await verifyToken(token);

    if(!dataToken){
      httpErrorHandler(res, "ERROR_ID_TOKEN");
      return;
    }
    
    next();
  } catch (error) {
    httpErrorHandler(res, "NOT_SESSION", 401);
  }
}

export {
  authMiddleware
}