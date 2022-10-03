import express from "express";
import FileHelper from "../lib/fileHelper";
import accountSchema from "../schemas/account";
import { createAccount } from "../services/account.service";

const router = express.Router();
const accountFileHelper = new FileHelper("account");

router.get("/", async (req, res) => {
  const result = await accountFileHelper.findAll();
  res.status(200).send(result);
  r;
});

router.post("/", async (req, res) => {
  try {
    await createAccount(req.body);
    res.status(201).send("account creation successful");
  } catch (error) {
    return res.status(500).send(error);
  }
});
router.put("/", async (req, res) => {
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

export default router;
