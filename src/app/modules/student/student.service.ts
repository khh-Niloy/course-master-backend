import { envVars } from "../../config/env";
import { IStudent } from "./student.interface";
import { IauthProvider } from "../../utils/commonUserInterface";
import { Student } from "./student.model";
import bcryptjs from "bcryptjs";
import { logger } from "../../utils/logger";
import { jwtManagement } from "../../utils/jwtManagement";

const createStudentService = async (playLoad: Partial<IStudent>) => {
  const { email, password, ...rest } = playLoad;
  logger.log(playLoad, "playLoad in createStudentService"); 

  const isStudentExist = await Student.findOne({ email });
  if (isStudentExist) {
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

  const newCreatedStudent = await Student.create({
    email,
    password: hashedPassword,
    auths: [authProvider],
    ...rest,
  });

  const jwtPayload = {
    userId: newCreatedStudent._id,
    email: newCreatedStudent.email,
    role: newCreatedStudent.role,
  };

  const { accessToken, refreshToken } = jwtManagement.createAccessAndRefreshToken(jwtPayload);

  return { accessToken, refreshToken, student: newCreatedStudent };
};

export const studentService = {
  createStudentService,
};
