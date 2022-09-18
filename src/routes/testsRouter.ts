import { Router } from "express";
import { createtTest, getTestsByTerms, getTestsByTeacher } from "../controllers/testsControllers"
import { joiValidation } from "../middlewares/joiValidation";
import jwtMiddleware from "../middlewares/jwtMiddleware";
import { testSchema } from "../schemas/schemas";

const testsRouter = Router();

testsRouter.post("/tests", joiValidation(testSchema), jwtMiddleware, createtTest);
testsRouter.get("/tests/termsview", jwtMiddleware, getTestsByTerms);
testsRouter.get("/tests/teachersview", jwtMiddleware, getTestsByTeacher);


export default testsRouter;