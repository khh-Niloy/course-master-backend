import { model, Schema } from "mongoose";
import { IBatch } from "./batch.interface";

const batchSchema = new Schema<IBatch>(
  {
    name: {
      type: String,
      trim: true,
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    batchNumber: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Index for better query performance
batchSchema.index({ courseId: 1 });
batchSchema.index({ startDate: 1 });
batchSchema.index({ courseId: 1, batchNumber: 1 }, { unique: true }); // Ensure unique batch numbers per course

export const Batch = model<IBatch>("Batch", batchSchema);