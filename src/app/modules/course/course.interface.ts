import { Types } from "mongoose";

export interface ILesson {
  _id?: Types.ObjectId;
  title: string;
  videoUrl: string;
  duration?: number;
  assignment?: IAssignment;
}

export interface IAssignment {
  _id?: Types.ObjectId;
  question: string;
  instructions?: string;
}

export interface IQuizOption {
  text: string;
  isCorrect: boolean;
}

export interface IQuizQuestion {
  _id?: Types.ObjectId;
  question: string;
  options: IQuizOption[];
}

export interface ICourseModule {
  _id?: Types.ObjectId;
  title: string;
  lessons: ILesson[];
  quiz?: IQuizQuestion[];
}

export interface ICourseBatch {
  _id?: Types.ObjectId;
  name: string;
  startDate: Date;
  endDate?: Date;
}

// export enum CourseStatus {
//   DRAFT = "DRAFT",
//   PUBLISHED = "PUBLISHED",
//   ARCHIVED = "ARCHIVED",
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
  batches: ICourseBatch[];

  //   status: CourseStatus;

  createdAt?: Date;
  updatedAt?: Date;
}
