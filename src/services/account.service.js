/**
 * this is acccount service.
 * A file containing business logic for the account operations
 */
import Account from "../schemas/account";

/**
 *
 * @param {{name : string, bvn : string, accountType : string}} data
 */
export const createAccount = async (data = {}) => {
  try {
    const useAccount = new Account({
      accountName: data.name,
      accountType: data.accountType,
      bvn: data.bvn,
    });
    await useAccount.save();
    return true;
  } catch (err) {
    console.log(err);

    throw new Error("account creation unsuccessful");
  }
};
