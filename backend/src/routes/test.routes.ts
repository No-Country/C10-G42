import { Router } from "express";
import testController from "../controllers/test.controller";
import { testMiddleware } from "../middlewares/test";

const router = Router();

router.get("/", testMiddleware, testController.test1);
router.post("/", testController.test2)

export { router };