import { Request, Response } from "express";
import { quizService } from "./quiz.service";
import { errorResponse, successResponse } from "../../utils/successResponse";
import { logger } from "../../utils/logger";

const createQuiz = async (req: Request, res: Response) => {
  try {
    console.log(req.body, "req.body in createQuiz");
    const quiz = await quizService.createQuizService(
      req.body
    );
    successResponse(res, {
      statusCode: 201,
      success: true,
      message: "Quiz created successfully",
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
      message: "Quizzes fetched successfully",
      data: quizzes,
    });
  } catch (error) {
    logger.log(error as Error, "error in getAllQuizzes");
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
      message: "Quiz patched successfully",
      data: quiz,
    });
  } catch (error) {
    logger.log(error as Error, "error in patchQuiz");
    errorResponse(res, error as Error, 400);
  }
};

export const quizController = {
  createQuiz,
  getAllQuizzes,
  patchQuiz,
};