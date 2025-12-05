import { Request, Response } from "express";
import { authService } from "./auth.service";
import { errorResponse, successResponse } from "../../utils/successResponse";
import { logger } from "../../utils/logger";
import { cookiesManagement } from "../../utils/cookiesManagement";
import { JwtPayload } from "jsonwebtoken";

const userLogin = async (req: Request, res: Response) => {
  try {
    const loggedInUser = await authService.userLoginService(
      req.body as { email: string; password: string }
    );

    cookiesManagement.setCookie(
      res,
      loggedInUser.accessToken,
      loggedInUser.refreshToken
    );
    successResponse(res, {
      statusCode: 200,
      success: true,
      message: "Welcome back! You've successfully logged in.",
      data: loggedInUser,
    });
  } catch (error) {
    logger.log(error as Error, "error in userLogin");
    errorResponse(res, error as Error, 400);
  }
};

const userLogOut = async (req: Request, res: Response) => {
  try {
    cookiesManagement.clearCookie(res);

    successResponse(res, {
      statusCode: 201,
      success: true,
      message: "You've been logged out successfully. See you soon!",
      data: null,
    });
  } catch (error) {
    logger.log(error as Error, "error in userLogOut");
    errorResponse(res, error as Error, 400);
  }
};

const getMe = async (req: Request, res: Response) => {
  try {
    const userInfo = req.user;
    const me = await authService.getMeService(userInfo as JwtPayload);
    successResponse(res, {
      statusCode: 200,
      success: true,
      message: "Your profile information retrieved successfully.",
      data: me,
    });
  } catch (error) {
    logger.log(error as Error, "error in getMe");
    errorResponse(res, error as Error, 400);
  }
};

export const authController = {
  userLogin,
  userLogOut,
  getMe,
};
