import { Router } from "express";
import authRouter from "./authRouter";
import testsRouter from "./testsRouter";
import disciplinesRouter from "./disciplinesRouter";
import teachersRouter from "./teachersRouter";

const router = Router();

router.use(authRouter);
router.use(testsRouter);
router.use(disciplinesRouter);
router.use(teachersRouter);

export default router;
