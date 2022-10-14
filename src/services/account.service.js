/**
 * this is acccount service.
 * A file containing business logic for the account operations
 */
import Account from "../schemas/account";
import { createUser } from "./user.services";

const generateRandomPassword = (length = 6) => {
  let counter = 0;
  let chars = "123456ABCDEFGHghijklmnopIJKWXYX7890abcdefqrstuLMNOPQRSTUVvwxyz-";
  const charsLength = chars.length;
  let generatedPassword = "";

  while (counter <= length) {
    const char = chars[Math.floor(Math.random() * charsLength)];
    generatedPassword += char;
    counter++;
  }
  return generatedPassword;
};

/**
 *
 * @param {{name : string, bvn : string, accountType : string, phone: string, mail : string}} data
 */
export const createAccount = async (data = {}) => {
  try {
    const useAccount = new Account({
      accountName: data.name,
      accountType: data.accountType,
      bvn: data.bvn,
    });
    const createdAccount = await useAccount.save();
    const [fName, lName] = data.name.split(" ");
    const password = generateRandomPassword(6);
    const createdUser = await createUser({
      fName,
      lName,
      phone: data.phone,
      mail: data.mail,
      pword: password,
    });

    return {
      accountDetails: { ...createdAccount.toJSON() },
      userDetails: { ...createdUser.toJSON(), password },
    };
  } catch (err) {
    console.log(err);

    throw new Error("account creation unsuccessful");
  }
};
