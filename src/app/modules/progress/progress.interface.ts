import { Types } from "mongoose";

export interface IProgress {
  _id?: Types.ObjectId;
  studentId: Types.ObjectId;
  enrollmentId: Types.ObjectId;
  lessonId: Types.ObjectId;
  completed: boolean;
  completedAt?: Date;
  timeSpent?: number; // in seconds
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IEnrollmentProgress {
  enrollmentId: Types.ObjectId;
  totalLessons: number;
  completedLessons: number;
  progressPercentage: number;
  lastActivity?: Date;
}
