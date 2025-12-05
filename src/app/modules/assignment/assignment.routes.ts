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

assignmentRoutes.patch(
  "/:id",
  roleBasedProtection(Role.ADMIN),
  assignmentController.patchAssignment
);