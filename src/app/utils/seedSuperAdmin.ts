import bcryptjs from "bcryptjs";
import { envVars } from "../config/env";
import { Admin } from "../modules/admin/admin.model";
import { IauthProvider, Role } from "./commonUserInterface";
import { IAdmin } from "../modules/admin/admin.interface";

export const seedSuperAdmin = async () => {
  const user = await Admin.findOne({ email: envVars.ADMIN_EMAIL });

  if (user) {
    return;
  }

  const hashedPassword = await bcryptjs.hash(
    envVars.ADMIN_PASSWORD as string,
    parseInt(envVars.BCRYPT_SALT_ROUND)
  );

  const authsProvider: IauthProvider = {
    provider: "credential",
    providerId: envVars.ADMIN_EMAIL,
  };

  const playLoad: Partial<IAdmin> = {
    name: "niloy admin",
    email: envVars.ADMIN_EMAIL,
    password: hashedPassword,
    auths: [authsProvider],
    role: Role.ADMIN,
  };

  await Admin.create(playLoad);
};
