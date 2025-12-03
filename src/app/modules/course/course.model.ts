import { model, Schema } from "mongoose";
import {
  ICourse,
  ICourseModule,
  ICourseBatch,
  ILesson,
  IAssignment,
  IQuizQuestion,
  IQuizOption,
} from "./course.interface";

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

const quizQuestionSchema = new Schema<IQuizQuestion>(
  {
    question: {
      type: String,
      required: true,
    },
    options: {
      type: [quizOptionSchema],
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const assignmentSchema = new Schema<IAssignment>(
  {
    question: {
      type: String,
      required: true,
    },
    instructions: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

const lessonSchema = new Schema<ILesson>(
  {
    title: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
    },
    assignment: {
      type: assignmentSchema,
    },
  },
  {
    versionKey: false,
  }
);

const courseModuleSchema = new Schema<ICourseModule>(
  {
    title: {
      type: String,
      required: true,
    },
    lessons: {
      type: [lessonSchema],
      required: true,
    },
    quiz: {
      type: [quizQuestionSchema],
    },
  },
  {
    versionKey: false,
  }
);

const courseBatchSchema = new Schema<ICourseBatch>(
  {
    name: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
  },
  {
    versionKey: false,
  }
);

const courseSchema = new Schema<ICourse>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
    },
    instructor: {
      type: [String],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    modules: {
      type: [courseModuleSchema],
      required: true,
    },
    batches: {
      type: [courseBatchSchema],
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Course = model<ICourse>("Course", courseSchema);