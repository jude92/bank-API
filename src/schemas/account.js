import mongoose from "mongoose";
const { Schema } = mongoose;

const AccountSchema = Schema(
  {
    accountNo: { type: String, index: true },
    accountName: { type: String, required: true },
    bvn: { type: Number, required: true },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    accountType: {
      type: String,
      enum: ["current", "savings"],
      default: "saving",
    },
  },
  { timestamps: true }
);

const getAccountNumberValue = (number) => {
  if (number < 100) {
    return `0000${number}`;
  } else if (number < 1000) {
    return `000${number}`;
  } else if (number < 10000) {
    return `00${number}`;
  } else if (number < 100000) return `0${number}`;

  return number;
};
const generateAccountNumber = (lastAcccountSerialNumber = 0) => {
  const number = "00";
  const date = new Date();
  const year = `${date.getFullYear()}`.slice(2);
  const userNumber = getAccountNumberValue(lastAcccountSerialNumber);
  return `${number}${year}${userNumber}`;
};

AccountSchema.pre("save", async function (next) {
  const totalAccounts = await AccountModel.estimatedDocumentCount();
  const accountNo = generateAccountNumber(totalAccounts + 1);
  this.accountNo = accountNo;
  next();
});

const AccountModel = mongoose.model("account", AccountSchema);
export default AccountModel;
