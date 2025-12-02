import { Request, Response } from "express";
import { adminService } from "./admin.service";
import { IAdmin } from "./admin.interface";
import { errorResponse, successResponse } from "../../utils/successResponse";
import { logger } from "../../utils/logger";

const createAdmin = async (req: Request, res: Response) => {
  try {
    const admin = await adminService.createAdminService(
      req.body as Partial<IAdmin>
    );
    successResponse(res, {
      statusCode: 201,
      success: true,
      message: "Admin created successfully",
      data: admin,
    });
  } catch (error) {
    logger.log(error as Error, "error in createAdmin");
    errorResponse(res, error as Error, 400);
  }
};

export const adminController = { createAdmin };
