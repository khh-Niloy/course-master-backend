import { envVars } from "../../config/env";
import { IStudent } from "./student.interface";
import { IauthProvider } from "../../utils/commonUserInterface";
import { Student } from "./student.model";
import bcryptjs from "bcryptjs";

const createStudentService = async (playLoad: Partial<IStudent>) => {
  const { email, password, ...rest } = playLoad;

  const isStudentExist = await Student.findOne({ email });
  if (isStudentExist) {
    throw new Error("Student already exist");
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
  return newCreatedStudent;
};

export const studentService = {
  createStudentService,
};
