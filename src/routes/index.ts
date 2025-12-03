import { Router } from "express";
// import { adminRoutes } from "../app/modules/admin/admin.routes";
import { authRoutes } from "../app/modules/auth/auth.routes";
import { courseRoutes } from "../app/modules/course/course.routes";
import { userRoutes } from "../app/modules/user/user.routes";


export const routes = Router();

const allRoutes = [
  // {
  //   path: "/admins",
  //   route: adminRoutes,
  // },
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
];

allRoutes.forEach(({ path, route }) => routes.use(path, route));
