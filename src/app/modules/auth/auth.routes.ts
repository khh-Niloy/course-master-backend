import { Router } from "express";
import { authController } from "./auth.controller";
import { Role } from "../../utils/commonUserInterface";
import { roleBasedProtection } from "../../middleware/roleBasedProtection";

export const authRoutes = Router();

authRoutes.post("/login", authController.studentLogin);

authRoutes.post("/admin-login", authController.adminLogin);

authRoutes.post("/refresh-token", authController.getNewAccessToken);

authRoutes.get("/logout", authController.userLogOut);

authRoutes.get("/me", roleBasedProtection(...Object.values(Role)), authController.getMe)

