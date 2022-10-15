import jwt from "jsonwebtoken";
import keys from "../keys";
import user from "../schemas/userSchema";

export const authentication = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];

    //verify the token
    const { id } = jwt.verify(token.replace("Bearer ", ""), keys.auth.JWT_KEY);
    const currentUser = await user.findById(id);
    if (!currentUser) {
      res.status(401).send("invalid authentication credentials");
    }
    console.log("in the middleware", req.app.locals);
    res.app.locals = {
      user: currentUser.toObject(),
    };
    next();
  } catch (err) {
    console.log("err chc ", err);
    res.status(401).send("invalid authentication credentials");
  }
};
