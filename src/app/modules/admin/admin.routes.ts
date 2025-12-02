import { Router } from "express";
import { adminController } from "./admin.controller";

export const adminRoutes = Router();

adminRoutes.post("/", adminController.createAdmin);