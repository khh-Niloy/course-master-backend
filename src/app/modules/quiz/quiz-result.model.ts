import { model, Schema } from "mongoose";
import { IQuizResult } from "./quiz.interface";

// Quiz Result Schema (Student Scores)
const quizResultSchema = new Schema<IQuizResult>(
  {
    quizId: {
      type: Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    score: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Indexes for better performance
quizResultSchema.index({ quizId: 1, studentId: 1 }, { unique: true }); // Prevent duplicate results
quizResultSchema.index({ studentId: 1 }); // For student's quiz history
quizResultSchema.index({ quizId: 1 }); // For quiz analytics

// Export QuizResult Model
export const QuizResult = model<IQuizResult>("QuizResult", quizResultSchema);

