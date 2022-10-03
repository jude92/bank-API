import express from "express";
import accountRouter from "./account.route";
import homeRouter from "./home.route";
import userRouter from "./user.route";
const router = express.Router();

router.use("/account", accountRouter);
router.use("/user", userRouter);
router.use("/", homeRouter);

export default router;
