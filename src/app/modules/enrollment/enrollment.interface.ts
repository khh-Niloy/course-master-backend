import { Types } from "mongoose";

export interface IEnrollment {
  _id?: Types.ObjectId;
  studentId: Types.ObjectId; // Reference to User (student)
  courseId: Types.ObjectId; // Reference to Course
  batchId: Types.ObjectId; // Reference to Batch
  enrollmentDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

