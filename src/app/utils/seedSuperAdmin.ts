import bcryptjs from "bcryptjs";
import { envVars } from "../config/env";
import { IauthProvider, Role } from "../modules/user/user.interface";
import { IUser } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";

export const seedSuperAdmin = async () => {
  const user = await User.findOne({ email: envVars.ADMIN_EMAIL });

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

  const playLoad: Partial<IUser> = {
    name: "niloy admin",
    email: envVars.ADMIN_EMAIL,
    password: hashedPassword,
    auths: [authsProvider],
    role: Role.ADMIN,
  };

  await User.create(playLoad);
};
