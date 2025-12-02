import { Types } from "mongoose";

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