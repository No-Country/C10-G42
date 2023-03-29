import { Request, Response } from "express";
import { login, register } from "../services/auth.service";
import { httpErrorHandler } from "../utils/httpErrorHandler";

const loginCtrl = async (req: Request, res: Response) => {
  try {
    const user = await login(req);
    res.send(user);
  } catch (error) {
    httpErrorHandler(res, error, 500);
  }
};


const registerCtrl = async (req: Request, res:Response) => {
  try {
    const response = await register(req);
    res.send(response);
  } catch (error) {
    httpErrorHandler(res, error, 500);
  }
}

export {
  loginCtrl,
  registerCtrl
}