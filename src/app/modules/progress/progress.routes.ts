import { Router } from "express";
import { Role } from "../user/user.interface";
import { roleBasedProtection } from "../../middleware/roleBasedProtection";
import { progressController } from "./progress.controller";

export const progressRoutes = Router();

// Mark lesson as complete (Students only)
progressRoutes.post(
  "/lesson/:lessonId/complete",
  roleBasedProtection(Role.STUDENT),
  progressController.markLessonComplete
);

// Mark lesson as incomplete (Students only)
progressRoutes.delete(
  "/lesson/:lessonId/complete",
  roleBasedProtection(Role.STUDENT),
  progressController.markLessonIncomplete
);

// Get lesson progress status (Students only)
progressRoutes.get(
  "/lesson/:lessonId",
  roleBasedProtection(Role.STUDENT),
  progressController.getLessonProgress
);

// Get all progress for an enrollment (Admin and Student)
progressRoutes.get(
  "/enrollment/:enrollmentId",
  roleBasedProtection(...Object.values(Role)),
  progressController.getProgressByEnrollment
);

// Get enrollment progress summary (Admin and Student)
progressRoutes.get(
  "/enrollment/:enrollmentId/summary",
  roleBasedProtection(...Object.values(Role)),
  progressController.getEnrollmentProgress
);

// Get student's overall progress (Students only)
progressRoutes.get(
  "/student/me",
  roleBasedProtection(Role.STUDENT),
  progressController.getStudentProgress
);
