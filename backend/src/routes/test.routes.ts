import { Router } from "express";
import testController from "../controllers/test.controller";
import { authMiddleware } from "../middlewares/session";
import { testMiddleware } from "../middlewares/test";

const router = Router();

router.get("/", authMiddleware, testController.test1);

export { router };