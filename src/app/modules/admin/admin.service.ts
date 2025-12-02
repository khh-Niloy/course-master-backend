import { envVars } from "../../config/env";
import { IAdmin } from "./admin.interface";
import { IauthProvider } from "../../utils/commonUserInterface";
import { Admin } from "./admin.model";
import bcryptjs from "bcryptjs";

const createAdminService = async (playLoad: Partial<IAdmin>) => {
  const { email, password, ...rest } = playLoad;

  const isAdminExist = await Admin.findOne({ email });
  if (isAdminExist) {
    throw new Error("Admin already exist");
  }

  const hashedPassword = await bcryptjs.hash(
    password as string,
    parseInt(envVars.BCRYPT_SALT_ROUND)
  );

  const authProvider: IauthProvider = {
    provider: "credential",
    providerId: email as string,
  };

  const newCreatedAdmin = await Admin.create({
    email,
    password: hashedPassword,
    auths: [authProvider],
    ...rest,
  });
  return newCreatedAdmin;
};

export const adminService = {
  createAdminService,
};
