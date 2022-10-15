import express from "express";
import homeRouter from "./home.routes";

const router = express.Router();

export default (app) => {
  router.use("/", homeRouter);
  app.use(router);
};

// export default router;
