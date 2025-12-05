import { model, Schema } from "mongoose";
import { IAssignmentSubmission, AssignmentSubmissionStatus } from "./assignment.interface";

const assignmentSubmissionSchema = new Schema<IAssignmentSubmission>(
  {
    assignmentId: {
      type: Schema.Types.ObjectId,
      ref: "Assignment",
      required: true,
    },
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    submission: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(AssignmentSubmissionStatus),
      default: AssignmentSubmissionStatus.PENDING,
    },
    feedback: {
      type: String,
    },
    reviewedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reviewedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Indexes for better performance
assignmentSubmissionSchema.index({ assignmentId: 1, studentId: 1 }, { unique: true }); // Prevent duplicate submissions
assignmentSubmissionSchema.index({ studentId: 1 }); // For student's submission history
assignmentSubmissionSchema.index({ assignmentId: 1 }); // For assignment reviews
assignmentSubmissionSchema.index({ status: 1 }); // For filtering by status

export const AssignmentSubmission = model<IAssignmentSubmission>("AssignmentSubmission", assignmentSubmissionSchema);

