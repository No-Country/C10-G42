import { Router } from "express";
import { loginCtrl, registerCtrl } from "../controllers/auth.controller";
import { validatorLogin, validatorRegister } from "../middlewares/validators/auth.valid";


const router = Router();

router.post("/login", validatorLogin,loginCtrl);
router.post("/register", validatorRegister, registerCtrl);


export { router };