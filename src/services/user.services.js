import user from "../schemas/userSchema";

/**
 *
 * @param {{fName : string, lName : string, mail : string,pword:string,phone:string}} datas
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
    await useUser.save();
    return true;
  } catch (err) {
    console.log(err);

    throw new Error("user creation unsuccessful");
  }
};
