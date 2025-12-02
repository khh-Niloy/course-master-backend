import { model, Schema } from "mongoose";
import { IauthProvider, isActive, Role } from "../../utils/commonUserInterface";
import { IAdmin } from "./admin.interface";

const authProviderSchema = new Schema<IauthProvider>(
  {
    provider: {
      type: String,
      enum: ["google", "credential"],
      required: true,
    },
    providerId: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    _id: false,
  }
);

const adminSchema = new Schema<IAdmin>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    phone: {
      type: String,
    },
    picture: {
      type: String,
    },
    address: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: String,
      enum: Object.values(isActive),
      default: isActive.ACTIVE,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.ADMIN,
    },
    auths: {
      type: [authProviderSchema],
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Admin = model<IAdmin>("Admin", adminSchema);