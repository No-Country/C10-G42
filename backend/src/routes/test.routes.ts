import { Router } from "express";
import testController from "../controllers/test.controller";
import { checkRol } from "../middlewares/role";
import { authMiddleware } from "../middlewares/session";
import { testMiddleware } from "../middlewares/test";

const router = Router();

router.get("/", authMiddleware, checkRol(["patient"]), testController.test1);


export { router };