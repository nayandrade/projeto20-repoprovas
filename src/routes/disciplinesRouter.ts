import { Router } from "express";
import { findAllDisciplines } from "../controllers/disciplinesControllers";
import jwtMiddleware from "../middlewares/jwtMiddleware";

const disciplinesRouter = Router();

disciplinesRouter.get("/disciplines", jwtMiddleware, findAllDisciplines);

export default disciplinesRouter;
