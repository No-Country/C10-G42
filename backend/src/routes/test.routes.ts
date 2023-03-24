import { Router } from "express";
import shiftController from "../controllers/test.controller";

const router = Router();

router.get("/", shiftController.test);

export { router };