import { Request, Response } from "express";
import { authService } from "./auth.service";
import { errorResponse, successResponse } from "../../utils/successResponse";
import { logger } from "../../utils/logger";
import { cookiesManagement } from "../../utils/cookiesManagement";

const studentLogin = async (req: Request, res: Response) => {
  try {
    const loggedInUser = await authService.studentLoginService(req.body as {email: string, password: string});

    cookiesManagement.setCookie(
      res,
      loggedInUser.accessToken,
      loggedInUser.refreshToken
    );
    successResponse(res, {
      statusCode: 200,
      success: true,
      message: "log in successful",
      data: loggedInUser,
    });
  } catch (error) {
    logger.log(error as Error, "error in studentLogin");
    errorResponse(res, error as Error, 400);
  }
};

const adminLogin = async (req: Request, res: Response) => {
  try {
    const loggedInUser = await authService.adminLoginService(req.body as {email: string, password: string});

    cookiesManagement.setCookie(
      res,
      loggedInUser.accessToken,
      loggedInUser.refreshToken
    );
    successResponse(res, {
      statusCode: 200,
      success: true,
      message: "admin log in successful",
      data: loggedInUser,
    });
  } catch (error) {
    logger.log(error as Error, "error in adminLogin");
    errorResponse(res, error as Error, 400);
  }
};

const getNewAccessToken = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const newAccessToken = await authService.getNewAccessTokenService(
      refreshToken as string
    );
    cookiesManagement.setCookie(res, newAccessToken.newAccessToken);

    successResponse(res, {
      statusCode: 201,
      success: true,
      message: "new accees token created",
      data: newAccessToken,
    });
  } catch (error) {
    logger.log(error as Error, "error in getNewAccessToken");
    errorResponse(res, error as Error, 400);
  }
};

const userLogOut = async (req: Request, res: Response) => {
  try {
    cookiesManagement.clearCookie(res);

    successResponse(res, {
      statusCode: 201,
      success: true,
      message: "user log out",
      data: null,
    });
  } catch (error) {
    logger.log(error as Error, "error in userLogOut");
    errorResponse(res, error as Error, 400);
  }
};

export const authController = {
  studentLogin,
  adminLogin,
  getNewAccessToken,
  userLogOut,
};
