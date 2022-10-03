import * as dotenv from "dotenv";
import express from "express";
import router from "./routes";

dotenv.config();
const app = express();
app.use(express.json());
app.use(router);

/**
 * @Todo handle error logging properly later
 */
app.use((err, req, res, next) => {
  res
    .status(500)
    .send("something went wrong, this isn't your fault we're on it");
});
export default app;
