import { Router } from "express";
import { authController } from "./auth.controller";
import { roleBasedProtection } from "../../middleware/roleBasedProtection";
import { Role } from "../user/user.interface";

export const authRoutes = Router();

authRoutes.post("/login", authController.userLogin);

authRoutes.get("/logout", authController.userLogOut);

authRoutes.get("/me", roleBasedProtection(...Object.values(Role)), authController.getMe)

