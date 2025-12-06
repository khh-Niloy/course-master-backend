import { Types } from "mongoose";

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

export enum Role {
  ADMIN = "ADMIN",
  STUDENT = "STUDENT",
}

export enum isActive {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
}

export interface IauthProvider {
  provider: "google" | "credential";
  providerId: string;
}

export interface IUser {
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

  role: Role;
  auths: IauthProvider[];

  enrollments: ICourseEnrollment[];
  
  institution?: string;
  major?: string;
  graduationYear?: number;

  createdAt?: Date;
  updatedAt?: Date;
}