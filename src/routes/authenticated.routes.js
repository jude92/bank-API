import { authentication } from "../middlewares/auth.middleware";
import accountRouter from "./account.routes";
import express from "express";

const router = express.Router();

export default (app) => {
  app.use(authentication);

  router.use("/account", accountRouter);

  app.use(router);
  // return router;
};
