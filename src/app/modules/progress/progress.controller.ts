import { Request, Response } from "express";
import { progressService } from "./progress.service";
import { errorResponse, successResponse } from "../../utils/successResponse";
import { logger } from "../../utils/logger";
import { JwtPayload } from "jsonwebtoken";

interface AuthenticatedRequest extends Omit<Request, 'user'> {
  user?: JwtPayload;
}

const markLessonComplete = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { lessonId } = req.params;
    const { timeSpent } = req.body;
    const studentId = req.user?.userId;

    if (!studentId) {
      return errorResponse(res, new Error("Please log in to access this feature."), 401);
    }

    const progress = await progressService.markLessonCompleteService(
      studentId,
      lessonId,
      timeSpent
    );

    successResponse(res, {
      statusCode: 200,
      success: true,
      message: "Great job! Lesson marked as complete.",
      data: progress,
    });
  } catch (error) {
    logger.log(error as Error, "error in markLessonComplete");
    errorResponse(res, error as Error, 400);
  }
};

const markLessonIncomplete = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { lessonId } = req.params;
    const studentId = req.user?.userId;

    if (!studentId) {
      return errorResponse(res, new Error("Please log in to access this feature."), 401);
    }

    const result = await progressService.markLessonIncompleteService(
      studentId,
      lessonId
    );

    successResponse(res, {
      statusCode: 200,
      success: true,
      message: "Lesson has been marked as incomplete.",
      data: result,
    });
  } catch (error) {
    logger.log(error as Error, "error in markLessonIncomplete");
    errorResponse(res, error as Error, 400);
  }
};

const getProgressByEnrollment = async (req: Request, res: Response) => {
  try {
    const { enrollmentId } = req.params;
    const progress = await progressService.getProgressByEnrollmentService(enrollmentId);

    successResponse(res, {
      statusCode: 200,
      success: true,
      message: "Progress information retrieved successfully.",
      data: progress,
    });
  } catch (error) {
    logger.log(error as Error, "error in getProgressByEnrollment");
    errorResponse(res, error as Error, 400);
  }
};

const getEnrollmentProgress = async (req: Request, res: Response) => {
  try {
    const { enrollmentId } = req.params;
    const progress = await progressService.calculateEnrollmentProgressService(enrollmentId);

    successResponse(res, {
      statusCode: 200,
      success: true,
      message: "Your enrollment progress has been calculated successfully.",
      data: progress,
    });
  } catch (error) {
    logger.log(error as Error, "error in getEnrollmentProgress");
    errorResponse(res, error as Error, 400);
  }
};

const getStudentProgress = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const studentId = req.user?.userId;

    if (!studentId) {
      return errorResponse(res, new Error("Please log in to access this feature."), 401);
    }

    const progress = await progressService.getStudentProgressService(studentId);

    successResponse(res, {
      statusCode: 200,
      success: true,
      message: "Your progress has been retrieved successfully.",
      data: progress,
    });
  } catch (error) {
    logger.log(error as Error, "error in getStudentProgress");
    errorResponse(res, error as Error, 400);
  }
};

const getLessonProgress = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { lessonId } = req.params;
    const studentId = req.user?.userId;

    if (!studentId) {
      return errorResponse(res, new Error("Please log in to access this feature."), 401);
    }

    const progress = await progressService.getLessonProgressService(studentId, lessonId);

    successResponse(res, {
      statusCode: 200,
      success: true,
      message: "Lesson progress retrieved successfully.",
      data: progress,
    });
  } catch (error) {
    logger.log(error as Error, "error in getLessonProgress");
    errorResponse(res, error as Error, 400);
  }
};

export const progressController = {
  markLessonComplete,
  markLessonIncomplete,
  getProgressByEnrollment,
  getEnrollmentProgress,
  getStudentProgress,
  getLessonProgress,
};
