import { Router } from "express";
import { Role } from "../user/user.interface";
import { roleBasedProtection } from "../../middleware/roleBasedProtection";
import { quizController } from "./quiz.controller";

export const quizRoutes = Router();

quizRoutes.post(
  "/",
  roleBasedProtection(Role.ADMIN),
  quizController.createQuiz
);

quizRoutes.get(
  "/",
  roleBasedProtection(Role.ADMIN),
  quizController.getAllQuizzes
);

quizRoutes.patch(
  "/:id",
  roleBasedProtection(Role.ADMIN),
  quizController.patchQuiz
);