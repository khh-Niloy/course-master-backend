import { model, Schema } from "mongoose";
import { IProgress } from "./progress.interface";

const progressSchema = new Schema<IProgress>(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    enrollmentId: {
      type: Schema.Types.ObjectId,
      ref: "Enrollment",
      required: true,
    },
    lessonId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    completed: {
      type: Boolean,
      required: true,
      default: true,
    },
    completedAt: {
      type: Date,
      default: Date.now,
    },
    timeSpent: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Indexes for performance
progressSchema.index({ studentId: 1, enrollmentId: 1 });
progressSchema.index({ enrollmentId: 1 });
progressSchema.index({ lessonId: 1 });
progressSchema.index({ studentId: 1, lessonId: 1 }, { unique: true }); // Prevent duplicate progress per student per lesson

export const Progress = model<IProgress>("Progress", progressSchema);
