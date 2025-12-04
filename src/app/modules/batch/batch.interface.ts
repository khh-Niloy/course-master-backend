import { Types } from "mongoose";

export interface IBatch {
  _id?: Types.ObjectId;
  name?: string; // Optional batch name like "Winter 2024", "Batch 1"
  courseId: Types.ObjectId; // Reference to the course
  startDate: Date;
  batchNumber?: number; // Auto-generated batch number for the course
  createdAt?: Date;
  updatedAt?: Date;
}