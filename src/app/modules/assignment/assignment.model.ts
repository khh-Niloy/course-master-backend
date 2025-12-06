import { model, Schema } from "mongoose";
import { IAssignment, AssignmentType } from "./assignment.interface";

const assignmentSchema = new Schema<IAssignment>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    question: {
      type: String,
    },
    instructions: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(AssignmentType),
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

assignmentSchema.index({ title: 1 });

export const Assignment = model<IAssignment>("Assignment", assignmentSchema);

