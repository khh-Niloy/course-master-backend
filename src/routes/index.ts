import { Router } from "express";
import { authRoutes } from "../app/modules/auth/auth.routes";
import { courseRoutes } from "../app/modules/course/course.routes";
import { userRoutes } from "../app/modules/user/user.routes";
import { quizRoutes } from "../app/modules/quiz/quiz.routes";
import { assignmentRoutes } from "../app/modules/assignment/assignment.routes";
import { batchRoutes } from "../app/modules/batch/batch.routes";
import { enrollmentRoutes } from "../app/modules/enrollment/enrollment.routes";
import { progressRoutes } from "../app/modules/progress/progress.routes";


export const routes = Router();

const allRoutes = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/courses",
    route: courseRoutes,
  },
  {
    path: "/quizzes",
    route: quizRoutes,
  },
  {
    path: "/assignments",
    route: assignmentRoutes,
  },
  {
    path: "/batches",
    route: batchRoutes,
  },
  {
    path: "/enrollments",
    route: enrollmentRoutes,
  },
  {
    path: "/progress",
    route: progressRoutes,
  },
];

allRoutes.forEach(({ path, route }) => routes.use(path, route));
