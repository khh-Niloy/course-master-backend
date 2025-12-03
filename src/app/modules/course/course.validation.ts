import { z } from "zod";

export const createCourseZodSchema = z.object({
  title: z.string({ message: "Title is required" }),
  description: z.string({ message: "Description is required" }),
  category: z.string({ message: "Category is required" }),
  tags: z.array(z.string({ message: "Tags are required" })),
  instructor: z.array(z.string({ message: "Instructor is required" })),
  price: z.number({ message: "Price is required" }),
  modules: z.array(
    z.object({
      title: z.string({ message: "Title is required" }),
      lessons: z.array(
        z.object({
          title: z.string({ message: "Title is required" }),
          videoUrl: z.string({ message: "Video URL is required" }),
          duration: z.number({ message: "Duration is required" }),
        })
      ),
      assignment: z.object({
        question: z.string({ message: "Question is required" }),
        instructions: z.string({ message: "Instructions are required" }),
      }),
      quiz: z.array(
        z.object({
          question: z.string({ message: "Question is required" }),
          options: z.array(
            z.object({
              text: z.string({ message: "Text is required" }),
              isCorrect: z.boolean({ message: "Is correct is required" }),
            })
          ),
        })
      ),
    })
  ),
  batches: z.array(
    z.object({
      name: z.string({ message: "Name is required" }),
      startDate: z.date({ message: "Start date is required" }),
      endDate: z.date({ message: "End date is required" }),
    })
  ),
});

export const updateCourseZodSchema = z
  .object({
    title: z.string({ message: "Title is required" }),
    description: z.string({ message: "Description is required" }),
    category: z.string({ message: "Category is required" }),
    tags: z.array(z.string({ message: "Tags are required" })),
    instructor: z.array(z.string({ message: "Instructor is required" })),
    price: z.number({ message: "Price is required" }),
    modules: z.array(
      z.object({
        title: z.string({ message: "Title is required" }),
        lessons: z.array(
          z.object({
            title: z.string({ message: "Title is required" }),
            videoUrl: z.string({ message: "Video URL is required" }),
            duration: z.number({ message: "Duration is required" }),
          })
        ),
        assignment: z.object({
          question: z.string({ message: "Question is required" }),
          instructions: z.string({ message: "Instructions are required" }),
        }),
        quiz: z.array(
          z.object({
            question: z.string({ message: "Question is required" }),
            options: z.array(
              z.object({
                text: z.string({ message: "Text is required" }),
                isCorrect: z.boolean({ message: "Is correct is required" }),
              })
            ),
          })
        ),
      })
    ),
    batches: z.array(
      z.object({
        name: z.string({ message: "Name is required" }),
        startDate: z.date({ message: "Start date is required" }),
        endDate: z.date({ message: "End date is required" }),
      })
    ),
  })
  .optional();
