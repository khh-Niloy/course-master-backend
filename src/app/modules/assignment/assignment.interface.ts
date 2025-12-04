import { Types } from "mongoose";

export enum AssignmentType {
  DRIVE_LINK = "drive_link",
  TEXT = "text",
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

