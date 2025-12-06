import { z } from "zod";

export const createBatchZodSchema = z.object({
  name: z.string().optional(),
  courseId: z.string({ message: "Course ID is required" }),
  startDate: z.string().transform((str) => new Date(str)),
  batchNumber: z.number().min(1).optional(),
});

export const updateBatchZodSchema = createBatchZodSchema.partial();

export const batchParamsSchema = z.object({
  id: z.string({ message: "Batch ID is required" }),
});

export const courseBatchParamsSchema = z.object({
  courseId: z.string({ message: "Course ID is required" }),
});