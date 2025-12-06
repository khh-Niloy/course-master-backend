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

// Indexes for better query performance
enrollmentSchema.index({ studentId: 1 }); // For student enrollment queries
enrollmentSchema.index({ courseId: 1 }); // For course enrollment queries
enrollmentSchema.index({ batchId: 1 }); // For batch enrollment queries
enrollmentSchema.index({ studentId: 1, batchId: 1 }); // For duplicate enrollment checks
enrollmentSchema.index({ createdAt: -1 }); // For sorting by creation date

export const Enrollment = model<IEnrollment>("Enrollment", enrollmentSchema);


