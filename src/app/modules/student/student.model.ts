import { model, Schema } from "mongoose";
import { IauthProvider, isActive, Role } from "../../utils/commonUserInterface";
import {
  IStudent,
  ICourseEnrollment,
  EnrollmentStatus,
} from "./student.interface";

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

const courseEnrollmentSchema = new Schema<ICourseEnrollment>(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    enrolledAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: Object.values(EnrollmentStatus),
      default: EnrollmentStatus.ENROLLED,
    },
    progress: {
      type: Number,
      default: 0,
    },
    completedAt: {
      type: Date,
    },
    certificateIssued: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    _id: false,
  }
);

const studentSchema = new Schema<IStudent>(
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
      required: true,
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
      default: Role.STUDENT,
    },
    auths: {
      type: [authProviderSchema],
      required: true,
    },

    enrollments: {
      type: [courseEnrollmentSchema],
    },
    institution: {
      type: String,
    },
    major: {
      type: String,
    },
    graduationYear: {
      type: Number,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Student = model<IStudent>("Student", studentSchema);
