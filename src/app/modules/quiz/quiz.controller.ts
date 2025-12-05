import { Request, Response } from "express";
import { quizService } from "./quiz.service";
import { errorResponse, successResponse } from "../../utils/successResponse";
import { logger } from "../../utils/logger";
import { JwtPayload } from "jsonwebtoken";

interface AuthenticatedRequest extends Omit<Request, 'user'> {
  user?: JwtPayload;
}

const createQuiz = async (req: Request, res: Response) => {
  try {
    console.log(req.body, "req.body in createQuiz");
    const quiz = await quizService.createQuizService(
      req.body
    );
    successResponse(res, {
      statusCode: 201,
      success: true,
      message: "Quiz created successfully!",
      data: quiz,
    });
  } catch (error) {
    logger.log(error as Error, "error in createQuiz");
    errorResponse(res, error as Error, 400);
  }
};

const getAllQuizzes = async (req: Request, res: Response) => {
  try {
    const quizzes = await quizService.getAllQuizzesService();
    successResponse(res, {
      statusCode: 200,
      success: true,
      message: "Quizzes retrieved successfully.",
      data: quizzes,
    });
  } catch (error) {
    logger.log(error as Error, "error in getAllQuizzes");
    errorResponse(res, error as Error, 400);
  }
};

const getQuizById = async (req: Request, res: Response) => {
  try {
    const quiz = await quizService.getQuizByIdService(req.params.id);
    successResponse(res, {
      statusCode: 200,
      success: true,
      message: "Quiz retrieved successfully.",
      data: quiz,
    });
  } catch (error) {
    logger.log(error as Error, "error in getQuizById");
    errorResponse(res, error as Error, 400);
  }
};

const patchQuiz = async (req: Request, res: Response) => {
  try {
    const quiz = await quizService.patchQuizService(
      req.params.id,
      req.body
    );
    successResponse(res, {
      statusCode: 200,
      success: true,
      message: "Quiz has been updated successfully.",
      data: quiz,
    });
  } catch (error) {
    logger.log(error as Error, "error in patchQuiz");
    errorResponse(res, error as Error, 400);
  }
};

const submitQuizResult = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const studentId = req.user?.userId;
    if (!studentId) {
      return errorResponse(res, new Error("Please log in to access this feature."), 401);
    }
    
    const quizId = req.params.id;
    logger.log({ quizId, studentId, answersCount: req.body.answers?.length }, "info in submitQuizResult");
    
    const result = await quizService.submitQuizResultService({
      quizId, // Get quizId from URL params
      studentId,
      answers: req.body.answers,
    });
    
    successResponse(res, {
      statusCode: 200,
      success: true,
      message: "Quiz submitted successfully.",
      data: result,
    });
  } catch (error) {
    logger.log(error as Error, "error in submitQuizResult");
    errorResponse(res, error as Error, 400);
  }
};

const getQuizResult = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const studentId = req.user?.userId;
    if (!studentId) {
      return errorResponse(res, new Error("Please log in to access this feature."), 401);
    }
    
    const result = await quizService.getQuizResultService(
      req.params.quizId,
      studentId
    );
    
    successResponse(res, {
      statusCode: 200,
      success: true,
      message: "Quiz result retrieved successfully.",
      data: result,
    });
  } catch (error) {
    logger.log(error as Error, "error in getQuizResult");
    errorResponse(res, error as Error, 400);
  }
};

export const quizController = {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  patchQuiz,
  submitQuizResult,
  getQuizResult,
};