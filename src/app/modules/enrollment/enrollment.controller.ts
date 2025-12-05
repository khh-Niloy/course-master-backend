import { Request, Response } from "express";
import { enrollmentService } from "./enrollment.service";
import { IEnrollment } from "./enrollment.interface";
import { errorResponse, successResponse } from "../../utils/successResponse";
import { logger } from "../../utils/logger";

const createEnrollment = async (req: Request, res: Response) => {
  try {
    const enrollment = await enrollmentService.createEnrollmentService(
      req.body as Partial<IEnrollment>
    );
    successResponse(res, {
      statusCode: 201,
      success: true,
      message: "Enrollment created successfully",
      data: enrollment,
    });
  } catch (error) {
    logger.log(error as Error, "error in createEnrollment");
    errorResponse(res, error as Error, 400);
  }
};

const getAllEnrollments = async (req: Request, res: Response) => {
  try {
    const enrollments = await enrollmentService.getAllEnrollmentsService();
    successResponse(res, {
      statusCode: 200,
      success: true,
      message: "Enrollments fetched successfully",
      data: enrollments,
    });
  } catch (error) {
    logger.log(error as Error, "error in getAllEnrollments");
    errorResponse(res, error as Error, 400);
  }
};

const getEnrollmentsByStudent = async (req: Request, res: Response) => {
  try {
    const enrollments = await enrollmentService.getEnrollmentsByStudentService(req.params.studentId);
    successResponse(res, {
      statusCode: 200,
      success: true,
      message: "Student enrollments fetched successfully",
      data: enrollments,
    });
  } catch (error) {
    logger.log(error as Error, "error in getEnrollmentsByStudent");
    errorResponse(res, error as Error, 400);
  }
};

const getEnrollmentsByCourse = async (req: Request, res: Response) => {
  try {
    const enrollments = await enrollmentService.getEnrollmentsByCourseService(req.params.courseId);
    successResponse(res, {
      statusCode: 200,
      success: true,
      message: "Course enrollments fetched successfully",
      data: enrollments,
    });
  } catch (error) {
    logger.log(error as Error, "error in getEnrollmentsByCourse");
    errorResponse(res, error as Error, 400);
  }
};

export const enrollmentController = {
  createEnrollment,
  getAllEnrollments,
  getEnrollmentsByStudent,
  getEnrollmentsByCourse,
};

