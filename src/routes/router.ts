import { Router } from "express";
import authRouter from "./authRouter";
import testsRouter from "./testsRouter";
import disciplinesRouter from "./disciplinesRouter";

const router = Router();

router.use(authRouter);
router.use(testsRouter)
router.use(disciplinesRouter)

export default router;
