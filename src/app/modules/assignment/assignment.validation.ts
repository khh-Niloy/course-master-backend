import { z } from "zod";
import { AssignmentType } from "./assignment.interface";

export const createAssignmentZodSchema = z.object({
  title: z.string({ message: "Title is required" }).min(1, "Title cannot be empty"),
  question: z.string().optional(),
  instructions: z.string({ message: "Instructions are required" }).min(1, "Instructions cannot be empty"),
  type: z.nativeEnum(AssignmentType, { message: "Invalid assignment type" }),
});

export const updateAssignmentZodSchema = createAssignmentZodSchema.partial();

export const assignmentParamsSchema = z.object({
  id: z.string({ message: "Assignment ID is required" }),
});

export const getAssignmentsQuerySchema = z.object({
  page: z.string().transform(Number).optional(),
  limit: z.string().transform(Number).optional(),
  search: z.string().optional(),
  type: z.nativeEnum(AssignmentType).optional(),
});

