import { model, Schema } from "mongoose";
import {
  ICourse,
  ICourseModule,
  ILesson,
  CourseStatus,
} from "./course.interface";

// Removed embedded quiz and assignment schemas - they are now separate collections

const lessonSchema = new Schema<ILesson>(
  {
    lessonNumber: {
      type: Number,
      required: true,
    },
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
    // Reference quiz and assignment IDs instead of embedding
    quizIds: {
      type: [Schema.Types.ObjectId],
      ref: "Quiz",
    },
    assignmentId: {
      type: Schema.Types.ObjectId,
      ref: "Assignment",
    },
  },
  {
    versionKey: false,
  }
);

// Batches are now handled by a separate Batch module

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
    status: {
      type: String,
      enum: Object.values(CourseStatus),
      default: CourseStatus.PUBLISHED,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Course = model<ICourse>("Course", courseSchema);