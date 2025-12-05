import { Types, Document } from "mongoose";

export enum AssignmentType {
  DRIVE_LINK = "drive_link",
  TEXT = "text",
}

export enum AssignmentSubmissionStatus {
  PENDING = "PENDING",
  REVIEWED = "REVIEWED",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export interface IAssignment {
  _id?: Types.ObjectId;
  title: string;
  question?: string;
  instructions: string;
  type: AssignmentType;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAssignmentSubmission extends Document {
  _id: Types.ObjectId;
  assignmentId: Types.ObjectId;
  studentId: Types.ObjectId;
  submission: string;
  status: AssignmentSubmissionStatus;
  feedback?: string;
  reviewedBy?: Types.ObjectId;
  reviewedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

