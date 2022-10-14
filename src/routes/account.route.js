import express from "express";
import FileHelper from "../lib/fileHelper";
import accountSchema from "../schemas/account";
import { createAccount } from "../services/account.service";
import { login } from "../services/user.services";

const router = express.Router();
const accountFileHelper = new FileHelper("account");

router.get("/", async (req, res) => {
  const result = await accountFileHelper.findAll();
  res.status(200).send(result);
});

router.post("/", async (req, res) => {
  try {
    const result = await createAccount(req.body);
    res
      .status(201)
      .send({ message: "account creation successful", data: result });
  } catch (error) {
    return res.status(500).send(error);
  }
});
router.put("/", async (req, res) => {
  4;
  try {
    const result3 = await accountSchema.findByIdAndUpdate(req.body.id, {
      ...req.body,
    });

    res.status(200).send(result3);
  } catch (err) {
    res
      .status(500)
      .send({ message: "sorry this account is either blocked or inactive" });
  }
});

router.get("/:id", async (req, res) => {
  const result = await accountFileHelper.findById(req.params.id);
  res.send(result);
});

router.delete("/", async (req, res) => {
  try {
    const result4 = await accountSchema.findByIdAndDelete(req.body.id);
    res.status(200).send(result4);
  } catch (err) {
    res.status(500).send({ message: "could not delete account" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const result = await login(req.body, res);
    return res
      .status(200)
      .json({ message: "logged in successfully", ...result });
  } catch (err) {
    console.log(err);
  }
});

export default router;
