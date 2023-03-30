import { Router } from "express";
import { loginCtrl, registerCtrl } from "../controllers/auth.controller";
import { validatorLogin, validatorRegister, validatorRegisterDoctor } from "../middlewares/validators/auth.valid";


const router = Router();

router.post("/login", validatorLogin,loginCtrl);
router.post("/register", validatorRegister, registerCtrl);

router.post("/login-doctor", validatorLogin,loginCtrl);
router.post("/register-doctor", validatorRegisterDoctor, registerCtrl);




export { router };