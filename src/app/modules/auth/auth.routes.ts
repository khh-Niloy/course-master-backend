import { Router } from "express";
import { authController } from "./auth.controller";

export const authRoutes = Router();

authRoutes.post("/login", authController.studentLogin);

authRoutes.post("/admin-login", authController.adminLogin);

authRoutes.post("/refresh-token", authController.getNewAccessToken);

authRoutes.get("/logout", authController.userLogOut);

