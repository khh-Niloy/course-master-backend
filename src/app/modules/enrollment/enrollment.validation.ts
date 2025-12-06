import { z } from "zod";

export const createEnrollmentZodSchema = z.object({
  studentId: z.string({ message: "Student ID is required" }),
  courseId: z.string({ message: "Course ID is required" }),
  batchId: z.string({ message: "Batch ID is required" }),
  enrollmentDate: z.string().transform((str) => new Date(str)).optional(),
});

export const enrollmentParamsSchema = z.object({
  id: z.string({ message: "Enrollment ID is required" }),
});

