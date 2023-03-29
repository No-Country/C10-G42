import { validateResults } from "../../utils/handleValidator";
import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";

const validatorRegister = [
  body().custom((value, { req }) => {
    const allowedFields = ["email", "password", "firstname", "lastname", "birthdate", "phone", "gender", "dni"];
    const receivedFields = Object.keys(req.body);
    return receivedFields.every(field => allowedFields.includes(field));
  }).withMessage("El formulario contiene campos invalidos"),
  
  body("email")
    .notEmpty().withMessage("Email requerido")
    .isEmail().withMessage("Email no válido"),

  body("password")
    .notEmpty().withMessage("Password requerida")
    .isString().withMessage("Tipo de dato no valido")
    .isLength({ min: 5, max: 100 }).withMessage("Password debe tener entre 5 y 100 caracteres"),

  body("firstname")
    .notEmpty().withMessage("Nombre requerido")
    .isString().withMessage("Tipo de dato no valido")
    .isLength({ min: 5, max: 100 }).withMessage("Nombre debe tener entre 5 y 100 caracteres"),

  body("lastname")
    .notEmpty().withMessage("Apellido requerido")
    .isString().withMessage("Tipo de dato no valido")
    .isLength({ min: 5, max: 100 }).withMessage("Apellido debe tener entre 5 y 100 caracteres"),

  body("birthdate")
    .notEmpty().withMessage("Fecha de nacimiento requerida")
    .isDate().withMessage("Fecha de nacimiento debe tener un formato de fecha valido"),

  body("phone")
    .notEmpty().withMessage("Telefono requerido")
    .isString().withMessage("Tipo de dato no valido")
    .isLength({ min: 5, max: 100 }).withMessage("Telefono debe tener entre 5 y 100 caracteres"),

  body("gender")
    .notEmpty().withMessage("Genero requerido")
    .isString().withMessage("Tipo de dato no valido"),

  body("dni")
    .notEmpty().withMessage("Dni requerido")
    .isString().withMessage("Tipo de dato no valido")
    .isLength({ min: 5, max: 100 }).withMessage("Dni debe tener entre 5 y 100 caracteres"),

  (req: Request, res: Response, next: NextFunction) => {
    return validateResults(req, res, next);
  }
];

const validatorLogin = [
  body().custom((value, { req }) => {
    const allowedFields = ["email", "password"];
    const receivedFields = Object.keys(req.body);
    return receivedFields.every(field => allowedFields.includes(field));
  }).withMessage("El formulario contiene campos invalidos"),
  
  body("email")
    .notEmpty().withMessage("Email requerido")
    .isEmail().withMessage("Email no válido"),

  body("password")
    .notEmpty().withMessage("Password requerida")
    .isString().withMessage("Tipo de dato no valido")
    .isLength({ min: 5, max: 100 }).withMessage("Password debe tener entre 5 y 100 caracteres"),

  (req: Request, res: Response, next: NextFunction) => {
    return validateResults(req, res, next);
  }
];

export {
  validatorRegister,
  validatorLogin
}