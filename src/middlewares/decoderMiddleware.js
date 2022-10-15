import user from "../schemas/userSchema";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const jwt_secrete_key = "my key";

export const decoder = async (req, res, next) => {
  const { email, password } = req.body;
  let regUser;
  try {
    regUser = await user.findOne({ email: email });
  } catch (err) {
    console.log(err);
  }
  if (!regUser) {
    res.status(400).json({ message: "user not found,pls sign up" });
  }
  const CorrectPassword = bcrypt.compareSync(password, regUser.password);
  if (!CorrectPassword) {
    res.status(400).json({ message: "invalid email / password" });
  }
  const decode = jwt.decode({ id: regUser.id }, jwt_secrete_key, {
    expiresIn: "3hr",
  });

  res
    .status(200)
    .json({ message: "logged in successfully", user: regUser, decode });
};

export const verifyToken = (req, res, next) => {
  const headers = req.headers[`authorization`];
  // console.log(headers);
  const token = headers.split(" ")[1];
  if (!token) {
    res.status(404).json({ message: "token not found" });
  }

  jwt.verify(String(token), jwt_secrete_key, (err, user) => {
    if (err) {
      return res.status(404).json({ message: "invalid token" });
    }

    next(user);
  });
};

export const getDecodedId = async (authUser, req, res, next) => {
  try {
    const userx = await user.findById(authUser.id, "-password");
    if (!userx) {
      res.status(404).json({ message: "user  does not exist" });
    }
    return res.status(200).json({ user: userx });
  } catch (err) {
    console.log(err);
  }
};
