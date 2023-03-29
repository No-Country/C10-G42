import { Router } from "express";
import testController from "../controllers/test.controller";
import { createAppointment } from "../controllers/turno.controller";
import { testMiddleware } from "../middlewares/test";

const router = Router();

router.get("/", testMiddleware, testController.test1);
router.post("/sacar-turno", createAppointment)

export { router };