import { Types } from "mongoose";

export interface ILesson {
  _id?: Types.ObjectId;
  lessonNumber: number;
  title: string;
  videoUrl: string;
  duration?: number;
}

export interface ICourseModule {
  _id?: Types.ObjectId;
  title: string;
  lessons: ILesson[];
  quizIds?: Types.ObjectId[];
  assignmentId?: Types.ObjectId;
}

export enum CourseStatus {
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
}

// export interface ICourseBatch {
//   _id?: Types.ObjectId;
//   name?: string;
//   courseId: Types.ObjectId;
//   startDate: Date;
//   batchNumber: number;
// }

export interface ICourse {
  _id?: Types.ObjectId;
  slug: string;

  title: string;
  description: string;
  //   thumbnail?: string;

  category: string;
  tags?: string[];

  instructor: string[];

  price: number;
  //   discountPrice?: number;

  modules: ICourseModule[];
  // batches: ICourseBatch[];

  status: CourseStatus;

  createdAt?: Date;
  updatedAt?: Date;
}
