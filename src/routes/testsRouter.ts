import { Router } from "express";
import { createtTest } from "../controllers/testsControllers"
import { joiValidation } from "../middlewares/joiValidation";
import jwtMiddleware from "../middlewares/jwtMiddleware";
import { testSchema } from "../schemas/schemas";

const testsRouter = Router();

testsRouter.post("/tests", joiValidation(testSchema), jwtMiddleware, createtTest);

export default testsRouter;