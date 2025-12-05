import { IQuiz, IQuizResult } from "./quiz.interface";
import { Quiz } from "./quiz.model";
import { QuizResult } from "./quiz-result.model";
import { Types } from "mongoose";

const createQuizService = async (playLoad: Partial<IQuiz>) => {
  const isQuizExist = await Quiz.findOne({ title: playLoad.title });
  if (isQuizExist) {
    throw new Error("A quiz with this title already exists. Please choose a different title.");
  }
  const newQuiz = await Quiz.create(playLoad);
  return newQuiz;
};

const getAllQuizzesService = async () => {
  const quizzes = await Quiz.find({}).sort({ createdAt: -1 });
  return quizzes;
};

const getQuizByIdService = async (id: string) => {
  const quiz = await Quiz.findById(id);
  if (!quiz) {
    throw new Error("Sorry, we couldn't find the quiz you're looking for.");
  }
  return quiz;
};

const patchQuizService = async (
  id: string,
  playLoad: Partial<IQuiz>
) => {
  const quiz = await Quiz.findById(id);
  if (!quiz) {
    throw new Error("Sorry, we couldn't find the quiz you're looking for.");
  }
  if (playLoad.title && playLoad.title !== quiz.title) {
    const isTitleExist = await Quiz.findOne({ title: playLoad.title });
    if (isTitleExist) {
      throw new Error("A quiz with this title already exists. Please choose a different title.");
    }
  }
  const updatedQuiz = await Quiz.findByIdAndUpdate(
    id,
    { $set: playLoad },
    { new: true }
  );
  return updatedQuiz;
};

const submitQuizResultService = async (payload: {
  quizId: string;
  studentId: string;
  answers: { questionId: string; selectedOptions: number[] }[];
}) => {
  // Validate and use the quizId directly - Mongoose handles string to ObjectId conversion
  if (!Types.ObjectId.isValid(payload.quizId)) {
    throw new Error(`Invalid quiz ID format: ${payload.quizId}`);
  }
  
  const quiz = await Quiz.findById(payload.quizId);
  if (!quiz) {
    throw new Error(`Quiz not found with ID: ${payload.quizId}`);
  }

  // Calculate score
  let correctAnswers = 0;
  const totalQuestions = quiz.questions.length;

  payload.answers.forEach((answer) => {
    const question = quiz.questions.find(
      (q) => q._id?.toString() === answer.questionId
    );
    if (question) {
      const correctOptions = question.options
        .map((opt, index) => (opt.isCorrect ? index : -1))
        .filter((idx) => idx !== -1)
        .sort();
      const selectedOptions = [...answer.selectedOptions].sort();
      
      if (
        correctOptions.length === selectedOptions.length &&
        correctOptions.every((val, idx) => val === selectedOptions[idx])
      ) {
        correctAnswers++;
      }
    }
  });

  const score = Math.round((correctAnswers / totalQuestions) * 100);

  // Check if result already exists
  const existingResult = await QuizResult.findOne({
    quizId: payload.quizId,
    studentId: payload.studentId,
  });

  let result;
  if (existingResult) {
    // Update existing result
    result = await QuizResult.findByIdAndUpdate(
      existingResult._id,
      { score },
      { new: true }
    );
  } else {
    // Create new result
    result = await QuizResult.create({
      quizId: payload.quizId,
      studentId: payload.studentId,
      score,
    });
  }

  return { result, correctAnswers, totalQuestions, score };
};

const getQuizResultService = async (quizId: string, studentId: string) => {
  const result = await QuizResult.findOne({ quizId, studentId })
    .populate("quizId", "title")
    .populate("studentId", "name email");
  return result;
};

export const quizService = {
  createQuizService,
  getAllQuizzesService,
  getQuizByIdService,
  patchQuizService,
  submitQuizResultService,
  getQuizResultService,
};