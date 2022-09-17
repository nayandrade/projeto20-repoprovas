import { Router } from "express";
import authRouter from "./authRouter";
import testRouter from "./testRouter";
import disciplinesRouter from "./disciplinesRouter";

const router = Router();

router.use(authRouter);
router.use(testRouter)
router.use(disciplinesRouter)

export default router;
