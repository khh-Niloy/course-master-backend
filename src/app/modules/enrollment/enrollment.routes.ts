import { Router } from "express";
import { Role } from "../user/user.interface";
import { roleBasedProtection } from "../../middleware/roleBasedProtection";
import { enrollmentController } from "./enrollment.controller";

export const enrollmentRoutes = Router();

enrollmentRoutes.post(
  "/",
  roleBasedProtection(Role.ADMIN, Role.STUDENT),
  enrollmentController.createEnrollment
);

enrollmentRoutes.get(
  "/",
  roleBasedProtection(Role.ADMIN),
  enrollmentController.getAllEnrollments
);

enrollmentRoutes.get(
  "/student/:studentId",
  roleBasedProtection(...Object.values(Role)),
  enrollmentController.getEnrollmentsByStudent
);

enrollmentRoutes.get(
  "/course/:courseId",
  roleBasedProtection(Role.ADMIN),
  enrollmentController.getEnrollmentsByCourse
);

