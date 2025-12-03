
import { User } from "../user/user.model";
import { isActive } from "../user/user.interface";
import bcryptjs from "bcryptjs";
import { jwtManagement } from "../../utils/jwtManagement";
import { JwtPayload } from "jsonwebtoken";

const userLoginService = async (playLoad: {
  email: string;
  password: string;
}) => {
  const { email, password } = playLoad;

  const user = await User.findOne({ email });

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

  const { accessToken, refreshToken } =
    jwtManagement.createAccessAndRefreshToken(jwtPayload);

  return { accessToken, refreshToken, user: user };
};



const getNewAccessTokenService = async (refreshToken: string) => {
  const newAccessstoken =
    jwtManagement.getNewAccessTokenFromRefreshToken(refreshToken);
  return newAccessstoken;
};

const getMeService = async (userInfo: JwtPayload) => {
  const meUser = await User.findById(userInfo.userId).select("-password")
  return meUser
};

export const authService = {
  userLoginService,
  getNewAccessTokenService,
  getMeService,
};
