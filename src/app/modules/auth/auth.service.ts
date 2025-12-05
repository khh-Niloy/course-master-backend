
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
    throw new Error("No account found with this email. Please register first or check your email address.");
  }

  if (
    user?.isActive === isActive.BLOCKED ||
    user?.isActive === isActive.INACTIVE
  ) {
    throw new Error(`Your account is currently ${user?.isActive === isActive.BLOCKED ? "blocked" : "inactive"}. Please contact support for assistance.`);
  }

  if (user?.isDeleted) {
    throw new Error("Your account has been deleted. Please contact support if you believe this is an error.");
  }

  // if (!user?.isVerified) {
  //   throw new Error("user is not verified!");
  // }

  const checkPassword = await bcryptjs.compare(
    password as string,
    user.password as string
  );

  if (!checkPassword) {
    throw new Error("Invalid password. Please check your password and try again.");
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
