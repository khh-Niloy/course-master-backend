import { Router } from "express";
import { studentController } from "./student.controller";
import { validateSchema } from "../../middleware/zodValidate";
import { studentCreateZodSchema } from "./student.validation";

export const studentRoutes = Router();

studentRoutes.post("/", validateSchema(studentCreateZodSchema), studentController.createStudent);