import { model, Schema } from "mongoose";
import { IQuiz, IQuizQuestion, IQuizOption } from "./quiz.interface";

// Quiz Option Schema
const quizOptionSchema = new Schema<IQuizOption>(
  {
    text: {
      type: String,
      required: true,
    },
    isCorrect: {
      type: Boolean,
      required: true,
    },
  },
  {
    versionKey: false,
    _id: false,
  }
);

// Quiz Question Schema
const quizQuestionSchema = new Schema<IQuizQuestion>(
  {
    question: {
      type: String,
      required: true,
    },
    options: {
      type: [quizOptionSchema],
      required: true,
      validate: {
        validator: function(options: IQuizOption[]) {
          return options.some(option => option.isCorrect);
        },
        message: "At least one option must be correct"
      }
    },
  },
  {
    versionKey: false,
  }
);

// Quiz Schema (Template)
const quizSchema = new Schema<IQuiz>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    questions: {
      type: [quizQuestionSchema],
      required: true,
      validate: {
        validator: function(questions: IQuizQuestion[]) {
          return questions.length > 0;
        },
        message: "Quiz must have at least one question"
      }
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Index for better performance
quizSchema.index({ title: 1 });

// Export Quiz Model
export const Quiz = model<IQuiz>("Quiz", quizSchema);

