import mongoose from "mongoose";
import keys from "../keys";

export default async () => {
  try {
    await mongoose.connect(keys.db.uri, { autoCreate: true });
    console.log("connection successful");
  } catch (error) {
    console.log("failed to connect to the db");
  }
};
