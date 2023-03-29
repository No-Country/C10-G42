import { Request, Response } from "express";
import { login, register } from "../services/auth.service";
import { httpErrorHandler } from "../utils/httpErrorHandler";

const loginCtrl = async ({ body }: Request, res: Response) => {
  try {
    const { email, password } = body;
    const user = await login({ email, password });
    res.send(user);
  } catch (error) {
    httpErrorHandler(res, error, 500);
  }
};


const registerCtrl = async ({ body }: Request, res: Response) => {
  try {
    const { email, password, firstname, lastname, birthdate, phone, gender, dni } = body;
    const user = {
      email,
      password,
      firstname,
      lastname,
      role: "patient",
      birthdate,
      phone,
      gender,
      dni
    }
    const response = await register(user);
    res.send(response);
  } catch (error) {
    httpErrorHandler(res, error, 500);
  }
}

export {
  loginCtrl,
  registerCtrl
}