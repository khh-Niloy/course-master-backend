import { Router } from "express";
import { Role } from "../user/user.interface";
import { roleBasedProtection } from "../../middleware/roleBasedProtection";
import { courseController } from "./course.controller";

export const courseRoutes = Router();

courseRoutes.post(
  "/",
  roleBasedProtection(Role.ADMIN),
  courseController.createCourse
);

courseRoutes.get(
  "/",
  roleBasedProtection(...Object.values(Role)),
  courseController.getAllCourses
);

courseRoutes.get(
  "/:slug",
  roleBasedProtection(...Object.values(Role)),
  courseController.getCourseBySlug
);

courseRoutes.put(
  "/:slug",
  roleBasedProtection(Role.ADMIN),
  courseController.updateCourse
);

courseRoutes.delete(
  "/:slug",
  roleBasedProtection(Role.ADMIN),
  courseController.deleteCourse
);