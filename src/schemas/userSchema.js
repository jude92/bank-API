import mongoose from "mongoose";
import * as bcrypt from "bcryptjs";

const { Schema } = mongoose;

const userSchema = Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNo: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

function createPasswordHash(password) {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);
  return hash;
}

userSchema.pre("save", function (next) {
  const password = createPasswordHash(this.password);
  this.password = password;
  next();
});

const userModel = mongoose.model("user", userSchema);
export default userModel;
