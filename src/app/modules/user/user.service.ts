import { envVars } from "../../config/env";
import { IauthProvider, IUser } from "./user.interface";
import { User } from "./user.model";
import bcryptjs from "bcryptjs";
import { logger } from "../../utils/logger";
import { sendEmail } from "../../utils/sendEmail";
import { jwtManagement } from "../../utils/jwtManagement";

const createUserService = async (playLoad: Partial<IUser>) => {
  const { email, password, ...rest } = playLoad;
  logger.log(playLoad, "playLoad in createStudentService"); 

  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    throw new Error("You already have an account, please login");
  }

  const hashedPassword = await bcryptjs.hash(
    password as string,
    parseInt(envVars.BCRYPT_SALT_ROUND)
  );

  const authProvider: IauthProvider = {
    provider: "credential",
    providerId: email as string,
  };

  const newCreatedUser = await User.create({
    email,
    password: hashedPassword,
    auths: [authProvider],
    ...rest,
  });

  const firstName = (rest?.name ?? "").split(" ")[0];
  try {
    await sendEmail({
      to: email as string,
      subject: "Welcome to Course Master",
      templateName: "greeting",
      templateData: {
        firstName: firstName || undefined,
        appName: "Course Master",
        ctaUrl: envVars.FRONTEND_URL,
        ctaLabel: "Go to dashboard",
        supportEmail: envVars.SMTP_FROM,
        year: new Date().getFullYear(),
      },
    });
  } catch (emailError) {
    logger.log(emailError as Error, "failed to send welcome email");
  }

  const jwtPayload = {
    userId: newCreatedUser._id,
    email: newCreatedUser.email,
    role: newCreatedUser.role,
  };

  const { accessToken, refreshToken } = jwtManagement.createAccessAndRefreshToken(jwtPayload);

  return { accessToken, refreshToken, user: newCreatedUser };
};

export const userService = {
  createUserService,
};
