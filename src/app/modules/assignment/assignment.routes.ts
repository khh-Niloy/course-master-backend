import { Router } from "express";
import { Role } from "../user/user.interface";
import { roleBasedProtection } from "../../middleware/roleBasedProtection";
import { assignmentController } from "./assignment.controller";

export const assignmentRoutes = Router();

assignmentRoutes.post(
  "/",
  roleBasedProtection(Role.ADMIN),
  assignmentController.createAssignment
);

assignmentRoutes.get(
  "/",
  roleBasedProtection(Role.ADMIN),
  assignmentController.getAllAssignments
);

// More specific routes first (before /:id)
assignmentRoutes.get(
  "/submissions/all",
  roleBasedProtection(Role.ADMIN),
  assignmentController.getAllSubmissions
);

assignmentRoutes.post(
  "/:id/submit",
  roleBasedProtection(Role.STUDENT),
  assignmentController.submitAssignment
);

assignmentRoutes.get(
  "/:assignmentId/submission",
  roleBasedProtection(Role.STUDENT),
  assignmentController.getAssignmentSubmission
);

assignmentRoutes.patch(
  "/submissions/:submissionId/review",
  roleBasedProtection(Role.ADMIN),
  assignmentController.reviewAssignment
);

// Generic routes last
assignmentRoutes.get(
  "/:id",
  roleBasedProtection(...Object.values(Role)),
  assignmentController.getAssignmentById
);

assignmentRoutes.patch(
  "/:id",
  roleBasedProtection(Role.ADMIN),
  assignmentController.patchAssignment
);