import { z } from "zod";

export const createCourseZodSchema = z.object({
  title: z.string({ message: "Title is required" }),
  description: z.string({ message: "Description is required" }),
  category: z.string({ message: "Category is required" }),
  tags: z.array(z.string()).optional(),
  instructor: z.array(z.string({ message: "Instructor is required" })),
  price: z.number({ message: "Price is required" }),
  modules: z.array(
    z.object({
      title: z.string({ message: "Module title is required" }),
      lessons: z.array(
        z.object({
          lessonNumber: z.number({ message: "Lesson number is required" }),
          title: z.string({ message: "Lesson title is required" }),
          videoUrl: z.string({ message: "Video URL is required" }).url("Invalid video URL"),
          duration: z.number().optional(),
        })
      ),
      quizIds: z.array(z.string()).optional(), // Array of quiz ObjectIds as strings
      assignmentIds: z.array(z.string()).optional(), // Array of assignment ObjectIds as strings
    })
  ),
  batches: z.array(
    z.object({
      name: z.string().optional(),
      courseId: z.string({ message: "Course ID is required" }),
      startDate: z.string().transform((str) => new Date(str)),
      batchNumber: z.number().default(1),
    })
  ),
  status: z.enum(["PUBLISHED", "ARCHIVED"]).optional(),
});

export const updateCourseZodSchema = createCourseZodSchema.partial();

export const courseParamsSchema = z.object({
  id: z.string({ message: "Course ID is required" }),
});

export const getCoursesQuerySchema = z.object({
  page: z.string().transform(Number).optional(),
  limit: z.string().transform(Number).optional(),
  search: z.string().optional(),
  category: z.string().optional(),
  instructor: z.string().optional(),
  status: z.enum(["PUBLISHED", "ARCHIVED"]).optional(),
  tags: z.string().optional(), // Comma-separated tags
});
