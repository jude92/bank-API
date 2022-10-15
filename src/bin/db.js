import mongoose from "mongoose";
import keys from "../keys";
export default async () => {
  console.log("keys ", keys);
  try {
    await mongoose.connect(process.env.DB_URI, { autoCreate: true });
    console.log("connection successful");
  } catch (error) {
    console.log("failed to connect to the db", error);
  }
};
