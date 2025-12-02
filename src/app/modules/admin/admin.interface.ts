import { Types } from "mongoose";
import { IauthProvider, isActive, Role } from "../../utils/commonUserInterface";

export interface IAdmin {
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
  role: Role.ADMIN;
  auths: IauthProvider[];
}
