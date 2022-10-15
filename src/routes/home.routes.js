import express from "express";
const router = express.Router();

router.get("/", (req, res, next) => {
  res.setHeader("content-type", "application/json");
  res.setHeader("x-custom-type", "bank api");
  res.status(200).send({
    accounts: "/accounts",
  });
});

export default router;
