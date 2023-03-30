import { NextFunction, Request, Response } from "express";
import { Patient } from "../interfaces/Patient";
import PatientModel from "../models/Patient";
import { verifyToken } from "../utils/handleJwt";
import { httpErrorHandler } from "../utils/httpErrorHandler";

interface JwtPayload {
  _id: string
}

declare global {
  namespace Express {
    interface Request {
      user?: Patient; // TODO: Agregar modelo de Doctor -> user?: Patient | Doctor
    }
  }
}
const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if(!req.headers.authorization){
      httpErrorHandler(res, {message: "NOT_TOKEN"}, 401);
      return;
    }
    
    const token = req.headers.authorization.split(" ").pop() as string;
    const dataToken = await verifyToken(token) as JwtPayload;
    
    if(!dataToken){
      httpErrorHandler(res, {message: "ERROR_ID_TOKEN"}, 401);
      return;
    }
    
    const user = await PatientModel.findById(dataToken._id);
    if(!user){
      //user = await DoctorModel.findById(dataToken._id); // TODO: Agregar modelo de Doctor
      if(!user){
        httpErrorHandler(res, {message: "USER_LOGED_NOT_FOUND"}, 401);
        return;
      }
    }

    req.user = user;
    
    next();
  } catch (error) {
    httpErrorHandler(res, {message: "NOT_SESSION"}, 401);
  }
}

export {
  authMiddleware
}