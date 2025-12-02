import { Request, Response } from "express";
import { studentService } from "./student.service";
import { IStudent } from "./student.interface";
import { errorResponse, successResponse } from "../../utils/successResponse";
import { logger } from "../../utils/logger";

const createStudent = async (req: Request, res: Response) => {
  try {
    const student = await studentService.createStudentService(
      req.body as Partial<IStudent>
    );
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
