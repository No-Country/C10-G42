import { validateResults } from "../../utils/handleValidator";
import { NextFunction, Request, Response } from "express";
import { check } from "express-validator";

const validatorRegister = [
  check("email")
    .exists()
    .notEmpty()
    .isEmail(),
  check("password")
    .exists()
    .notEmpty()
    .isString()
    .isLength({min: 8, max: 100}),
  check("firstname")
    .exists()
    .notEmpty()
    .isString()
    .isLength({min: 4, max: 100}),
  check("lastname")
    .exists()
    .notEmpty()
    .isString()
    .isLength({min: 4, max: 100}),
  check("role")
    .exists()
    .notEmpty(),
  check("birthdate")
    .exists()
    .notEmpty(),
  check("phone")
    .exists()
    .notEmpty()
    .isString()
    .isLength({min: 4, max: 100}),
  check("gender")
    .exists()
    .notEmpty()
    .isString(),
  check("dni")
    .exists()
    .notEmpty()
    .isString()
    .isLength({min: 4, max: 100}),

    (req: Request, res: Response, next: NextFunction) => {
      return validateResults(req, res, next);
    }
];

const validatorLogin = [
  check("email")
    .exists()
    .notEmpty()
    .isEmail(),

  check("password")
    .exists()
    .notEmpty()
    .isString()
    .isLength({min: 8, max: 100}),

    (req: Request, res: Response, next: NextFunction) => {
      return validateResults(req, res, next);
    }
];

export {
  validatorRegister,
  validatorLogin
}