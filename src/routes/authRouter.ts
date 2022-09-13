import { Router } from "express";
import { signup, signin } from "../controllers/authControllers";
import { joiValidation } from "../middlewares/joiValidation";
import { signupSchema, signinSchema } from "../schemas/schemas"

const authRouter = Router();

authRouter.post("/signup", joiValidation(signupSchema), signup);
authRouter.post("/signin", joiValidation(signinSchema), signin);

export default authRouter;
