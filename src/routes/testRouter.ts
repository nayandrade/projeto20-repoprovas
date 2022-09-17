import { Router } from "express";
import { createtTest } from "../controllers/testControllers"
import { joiValidation } from "../middlewares/joiValidation";
import jwtMiddleware from "../middlewares/jwtMiddleware";
import { testSchema } from "../schemas/schemas";

const testRouter = Router();

testRouter.post("/tests", joiValidation(testSchema), jwtMiddleware, createtTest);

export default testRouter;