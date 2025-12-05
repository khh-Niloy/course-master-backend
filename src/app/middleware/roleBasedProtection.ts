import { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import { jwtManagement } from "../utils/jwtManagement";
import { isActive } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";

export const roleBasedProtection =
  (...roles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      throw new Error("Please log in to access this resource.");
    }

    console.log({ accessToken });

    const userInfoJWTAccessToken = jwtManagement.verifyToken(
      accessToken,
      envVars.JWT_ACCESS_SECRET
    ) as JwtPayload;

    const user = await User.findById(userInfoJWTAccessToken.userId);

    if (!user) {
      throw new Error("User account not found. Please contact support.");
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

    if (!Object.values(roles).includes(userInfoJWTAccessToken.role)) {
      throw new Error("You don't have permission to access this resource. Please contact an administrator if you believe this is an error.");
    }

    req.user = userInfoJWTAccessToken;

    next();
  };
