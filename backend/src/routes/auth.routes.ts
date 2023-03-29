import { Router } from "express";
import { registerCtrl } from "../controllers/auth.controller";
import { validatorRegister } from "../middlewares/validators/auth.valid";

const router = Router();

router.post("/register", registerCtrl);

export { router };