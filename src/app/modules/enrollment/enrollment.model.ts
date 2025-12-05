import { model, Schema } from "mongoose";
import { IEnrollment } from "./enrollment.interface";

const enrollmentSchema = new Schema<IEnrollment>(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    batchId: {
      type: Schema.Types.ObjectId,
      ref: "Batch",
      required: true,
    },
    enrollmentDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Enrollment = model<IEnrollment>("Enrollment", enrollmentSchema);


