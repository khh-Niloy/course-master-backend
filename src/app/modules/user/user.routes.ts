import { Router } from "express";
import { validateSchema } from "../../middleware/zodValidate";
import { userCreateZodSchema } from "./user.validation";
import { userController } from "./user.controller";

export const userRoutes = Router();

userRoutes.post("/", validateSchema(userCreateZodSchema), userController.createUser);