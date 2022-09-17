import { Router } from "express";
import { findAllTeachers } from "../controllers/teachersControllers";
import jwtMiddleware from "../middlewares/jwtMiddleware";

const teachersRouter = Router();

teachersRouter.get("/teachers", jwtMiddleware, findAllTeachers);

export default teachersRouter;