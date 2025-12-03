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
      throw new Error("access token not found!");
    }

    console.log({ accessToken });

    const userInfoJWTAccessToken = jwtManagement.verifyToken(
      accessToken,
      envVars.JWT_ACCESS_SECRET
    ) as JwtPayload;

    const user = await User.findById(userInfoJWTAccessToken.userId);

    if (!user) {
      throw new Error("user found!");
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

    if (!Object.values(roles).includes(userInfoJWTAccessToken.role)) {
      throw new Error("You are not permitted to view this route!!!");
    }

    req.user = userInfoJWTAccessToken;

    next();
  };
