import { Types } from "mongoose";
import { IauthProvider, isActive, Role } from "../../utils/commonUserInterface";

export enum EnrollmentStatus {
  ENROLLED = "ENROLLED",
  COMPLETED = "COMPLETED",
  SUSPENDED = "SUSPENDED",
}

export interface ICourseEnrollment {
  courseId: Types.ObjectId;
  enrolledAt: Date;
  status: EnrollmentStatus;
  progress: number;
  completedAt?: Date;
  certificateIssued?: boolean;
}

export interface IStudent {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  picture?: string;
  address?: string;

  isDeleted?: boolean;
  isActive?: isActive;
  isVerified?: boolean;

  role: Role.STUDENT;
  auths: IauthProvider[];

  enrollments: ICourseEnrollment[];
  
  institution?: string;
  major?: string;
  graduationYear?: number;

  createdAt?: Date;
  updatedAt?: Date;
}
