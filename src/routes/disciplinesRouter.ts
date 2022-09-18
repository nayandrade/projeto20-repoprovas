import { Router } from "express";
import { findDisciplinesByTerm } from "../controllers/disciplinesControllers";
import jwtMiddleware from "../middlewares/jwtMiddleware";

const disciplinesRouter = Router();

disciplinesRouter.get("/disciplines/:term", jwtMiddleware, findDisciplinesByTerm);

export default disciplinesRouter;
