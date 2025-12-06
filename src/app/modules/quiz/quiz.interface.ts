import { Types, Document } from "mongoose";

// Quiz Option Interface
export interface IQuizOption {
  text: string;
  isCorrect: boolean;
}

// Quiz Question Interface
export interface IQuizQuestion {
  _id?: Types.ObjectId;
  question: string;
  options: IQuizOption[];
}

// Quiz Interface (Template)
export interface IQuiz extends Document {
  _id: Types.ObjectId;
  title: string;
  questions: IQuizQuestion[];
  createdAt: Date;
  updatedAt: Date;
}

// Quiz Result Interface (Student Scores)
export interface IQuizResult extends Document {
  _id: Types.ObjectId;
  quizId: Types.ObjectId;
  studentId: Types.ObjectId;
  score: number;
  createdAt: Date;
  updatedAt: Date;
}
