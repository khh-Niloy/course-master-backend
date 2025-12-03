import { Request, Response } from "express";
import { studentService } from "./student.service";
import { IStudent } from "./student.interface";
import { errorResponse, successResponse } from "../../utils/successResponse";
import { logger } from "../../utils/logger";
import { cookiesManagement } from "../../utils/cookiesManagement";

const createStudent = async (req: Request, res: Response) => {
  try {
    logger.log(req.body, "req.body in createStudent");
    const { accessToken, refreshToken, student } = await studentService.createStudentService(
      req.body as Partial<IStudent>
    );
    cookiesManagement.setCookie(res, accessToken, refreshToken);
    
    successResponse(res, {
      statusCode: 201,
      success: true,
      message: "Student created successfully",
      data: student,
    });
  } catch (error) {
    logger.log(error as Error, "error in createStudent");
    errorResponse(res, error as Error, 400);
  }
};

export const studentController = { createStudent };
