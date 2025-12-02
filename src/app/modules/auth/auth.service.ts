import { Model } from "mongoose";
import { Student } from "../student/student.model";
import { isActive } from "../../utils/commonUserInterface";
import bcryptjs from "bcryptjs";
import { IStudent } from "../student/student.interface";
import { IAdmin } from "../admin/admin.interface";
import { Admin } from "../admin/admin.model";
import { jwtManagement } from "../../utils/jwtManagement";

const studentLoginService = async (playLoad: {
  email: string;
  password: string;
}) => {
  return commonLoginService("student", playLoad);
};

const adminLoginService = async (playLoad: {
  email: string;
  password: string;
}) => {
  return commonLoginService("admin", playLoad);
};

const getNewAccessTokenService = async (refreshToken: string) => {
  const newAccessstoken = jwtManagement.getNewAccessTokenFromRefreshToken(refreshToken);
  return newAccessstoken;
};

export const authService = {
  studentLoginService,
  getNewAccessTokenService,
  adminLoginService,
};


const commonLoginService = async (modelName: string, playLoad: {email: string, password: string}) => {
  const { email, password } = playLoad;

  const model = modelName === "student" ? Student : Admin;

  const user = await (model as Model<IStudent | IAdmin>).findOne({ email });

  if (!user) {
    throw new Error("You Dont have any account, please register first");
  }

  if (
    user?.isActive === isActive.BLOCKED ||
    user?.isActive === isActive.INACTIVE
  ) {
    throw new Error(`user is ${user?.isActive}!`);
  }

  if (user?.isDeleted) {
    throw new Error("user is deleted!");
  }

  // if (!user?.isVerified) {
  //   throw new Error("user is not verified!");
  // }

  const checkPassword = await bcryptjs.compare(
    password as string,
    user.password as string
  );

  if (!checkPassword) {
    throw new Error("password did not match!");
  }

  const jwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  const { accessToken, refreshToken } = jwtManagement.createAccessAndRefreshToken(jwtPayload);

  return { accessToken, refreshToken, user: user };
}