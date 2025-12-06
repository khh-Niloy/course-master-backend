import { Request, Response } from "express";
import { userService } from "./user.service";
import { IUser } from "./user.interface";
import { errorResponse, successResponse } from "../../utils/successResponse";
import { logger } from "../../utils/logger";
import { cookiesManagement } from "../../utils/cookiesManagement";

const createUser = async (req: Request, res: Response) => {
  try {
    logger.log(req.body, "req.body in createUser");
    const { accessToken, refreshToken, user } = await userService.createUserService(
      req.body as Partial<IUser>
    );
    cookiesManagement.setCookie(res, accessToken, refreshToken);
    
    successResponse(res, {
      statusCode: 201,
      success: true,
      message: "Welcome! Your account has been created successfully.",
      data: user,
    });
  } catch (error) {
    logger.log(error as Error, "error in createUser");
    errorResponse(res, error as Error, 400);
  }
};

export const userController = { createUser };
