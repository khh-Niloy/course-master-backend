import { z } from "zod";

const quizOptionSchema = z.object({
  text: z.string({ message: "Option text is required" }).min(1, "Option text cannot be empty"),
  isCorrect: z.boolean({ message: "isCorrect is required" }),
});

const quizQuestionSchema = z.object({
  question: z.string({ message: "Question is required" }).min(1, "Question cannot be empty"),
  options: z
    .array(quizOptionSchema)
    .min(2, "At least 2 options are required")
    .max(6, "Maximum 6 options allowed")
    .refine(
      (options) => options.some((option) => option.isCorrect),
      { message: "At least one option must be correct" }
    ),
  explanation: z.string().optional(),
});

export const createQuizZodSchema = z.object({
  title: z.string({ message: "Title is required" }).min(1, "Title cannot be empty"),
  description: z.string().optional(),
  questions: z
    .array(quizQuestionSchema)
    .min(1, "At least one question is required")
    .max(50, "Maximum 50 questions allowed"),
  timeLimit: z.number().min(1, "Time limit must be at least 1 minute").optional(),
  passingScore: z
    .number()
    .min(0, "Passing score cannot be negative")
    .max(100, "Passing score cannot exceed 100")
    .optional(),
  difficulty: z.enum(["easy", "medium", "hard"]).optional(),
  tags: z.array(z.string()).optional(),
  createdBy: z.string().optional(),
  isActive: z.boolean().optional(),
});

export const updateQuizZodSchema = createQuizZodSchema.partial();

export const quizParamsSchema = z.object({
  id: z.string({ message: "Quiz ID is required" }),
});

export const getQuizzesQuerySchema = z.object({
  page: z.string().transform(Number).optional(),
  limit: z.string().transform(Number).optional(),
  search: z.string().optional(),
  difficulty: z.enum(["easy", "medium", "hard"]).optional(),
  tags: z.string().optional(), // Comma-separated tags
  createdBy: z.string().optional(),
  isActive: z.string().transform((val) => val === "true").optional(),
});

