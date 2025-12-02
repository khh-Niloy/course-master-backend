import { Router } from "express";
import { studentController } from "./student.controller";

export const studentRoutes = Router();

studentRoutes.post("/", studentController.createStudent);