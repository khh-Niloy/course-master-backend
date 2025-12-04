import { IQuiz } from "./quiz.interface";
import { Quiz } from "./quiz.model";

const createQuizService = async (playLoad: Partial<IQuiz>) => {
  const isQuizExist = await Quiz.findOne({ title: playLoad.title });
  if (isQuizExist) {
    throw new Error("Quiz with this title already exists");
  }
  const newQuiz = await Quiz.create(playLoad);
  return newQuiz;
};

const getAllQuizzesService = async () => {
  const quizzes = await Quiz.find({}, { title: 1, _id: 1, createdAt: 1 }).sort({ createdAt: -1 });
  return quizzes;
};

export const quizService = {
  createQuizService,
  getAllQuizzesService,
};