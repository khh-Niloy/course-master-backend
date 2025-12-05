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
  const quizzes = await Quiz.find({}).sort({ createdAt: -1 });
  return quizzes;
};

const patchQuizService = async (
  id: string,
  playLoad: Partial<IQuiz>
) => {
  const quiz = await Quiz.findById(id);
  if (!quiz) {
    throw new Error("Quiz not found");
  }
  if (playLoad.title && playLoad.title !== quiz.title) {
    const isTitleExist = await Quiz.findOne({ title: playLoad.title });
    if (isTitleExist) {
      throw new Error("Quiz with this title already exists");
    }
  }
  const updatedQuiz = await Quiz.findByIdAndUpdate(
    id,
    { $set: playLoad },
    { new: true }
  );
  return updatedQuiz;
};

export const quizService = {
  createQuizService,
  getAllQuizzesService,
  patchQuizService,
};