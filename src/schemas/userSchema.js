import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNo: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const userModel = mongoose.model("user", userSchema);
export default userModel;
