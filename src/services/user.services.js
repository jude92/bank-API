import user from "../schemas/userSchema";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const jwt_secrete_key = "my key";

/**
 *
 * @param {{fName : string, lName : string, mail :
 * string,pword:string,phone:string}} datas
 */
export const createUser = async (datas = {}) => {
  try {
    const useUser = new user({
      firstName: datas.fName,
      lastName: datas.lName,
      email: datas.mail,
      password: datas.pword,
      phoneNo: datas.phone,
    });
    return await useUser.save();
  } catch (err) {
    throw new Error("user creation unsuccessful");
  }
};

export const login = async ({ email, password }, res) => {
  let existingUser;
  try {
    existingUser = await user.findOne({ email: email });
  } catch (err) {
    console.log(err);
  }
  if (!existingUser) {
    res.status(400).json({ message: "user not found,pls sign up" });
  }
  const isCorrectPassword = bcrypt.compareSync(password, existingUser.password);
  if (!isCorrectPassword) {
    res.status(400).json({ message: "invalid email / password" });
  }
  const token = jwt.decode({ id: existingUser.id }, jwt_secrete_key, {
    expiresIn: "3hr",
  });
  const userToReturn = existingUser.toJSON();
  delete userToReturn.password;
  return { user: userToReturn, token };
};
