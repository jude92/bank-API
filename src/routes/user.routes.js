import express from "express";
import { createUser } from "../services/user.services";

const router = express.Router();

router.get("/", (req, res) => {
  console.log("welcome to user dashboard");
});

router.post("/", async (req, res) => {
  try {
    await createUser(req.body);
    res.status(201).send("successfully posted");
  } catch (error) {
    return res.status(500).send(error);
  }
});
export default router;
