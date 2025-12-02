import { Router } from "express";
import { adminRoutes } from "../app/modules/admin/admin.routes";
import { authRoutes } from "../app/modules/auth/auth.routes";
import { studentRoutes } from "../app/modules/student/student.routes";


export const routes = Router();

const allRoutes = [
  {
    path: "/admins",
    route: adminRoutes,
  },
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/students",
    route: studentRoutes,
  },
];

allRoutes.forEach(({ path, route }) => routes.use(path, route));
