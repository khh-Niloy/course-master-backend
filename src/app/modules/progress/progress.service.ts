import { IProgress, IEnrollmentProgress } from "./progress.interface";
import { Progress } from "./progress.model";
import { Enrollment } from "../enrollment/enrollment.model";
import { Course } from "../course/course.model";
import { Types } from "mongoose";

const markLessonCompleteService = async (
  studentId: string,
  lessonId: string,
  timeSpent?: number
) => {
  // Find the enrollment for this student and lesson
  const enrollment = await Enrollment.findOne({ studentId })
    .populate({
      path: 'courseId',
      select: 'modules',
      populate: {
        path: 'modules.lessons'
      }
    });

  if (!enrollment) {
    throw new Error("Sorry, we couldn't find your enrollment. Please make sure you're enrolled in a course first.");
  }

  // Check if lesson exists in the course
  const course = enrollment.courseId as any;
  const lessonExists = course.modules.some((module: any) =>
    module.lessons.some((lesson: any) => lesson._id.toString() === lessonId)
  );

  if (!lessonExists) {
    throw new Error("Sorry, we couldn't find this lesson in your enrolled course.");
  }

  // Create or update progress
  const progressData: Partial<IProgress> = {
    studentId: enrollment.studentId,
    enrollmentId: enrollment._id,
    lessonId: new Types.ObjectId(lessonId),
    completed: true,
    completedAt: new Date(),
    timeSpent: timeSpent || 0,
  };

  const progress = await Progress.findOneAndUpdate(
    { studentId: enrollment.studentId, lessonId },
    progressData,
    { upsert: true, new: true }
  );

  return progress;
};

const markLessonIncompleteService = async (
  studentId: string,
  lessonId: string
) => {
  const result = await Progress.findOneAndDelete({
    studentId,
    lessonId,
  });

  return result;
};

const getProgressByEnrollmentService = async (enrollmentId: string) => {
  const progress = await Progress.find({ enrollmentId })
    .sort({ completedAt: -1 });

  return progress;
};

const calculateEnrollmentProgressService = async (
  enrollmentId: string
): Promise<IEnrollmentProgress> => {
  // Get enrollment with course data
  const enrollment = await Enrollment.findById(enrollmentId)
    .populate('courseId');

  if (!enrollment) {
    throw new Error("Sorry, we couldn't find the enrollment you're looking for.");
  }

  const course = enrollment.courseId as any;
  
  // Calculate total lessons
  const totalLessons = course.modules.reduce((acc: number, module: any) => 
    acc + (module.lessons?.length || 0), 0
  );

  // Get completed lessons count
  const completedLessons = await Progress.countDocuments({
    enrollmentId,
    completed: true,
  });

  // Get last activity
  const lastProgress = await Progress.findOne({ enrollmentId })
    .sort({ completedAt: -1 });

  const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  return {
    enrollmentId: enrollment._id!,
    totalLessons,
    completedLessons,
    progressPercentage: Math.round(progressPercentage),
    lastActivity: lastProgress?.completedAt,
  };
};

const getStudentProgressService = async (studentId: string) => {
  // Get all enrollments for student
  const enrollments = await Enrollment.find({ studentId });
  
  const progressData = [];
  
  for (const enrollment of enrollments) {
    const progress = await calculateEnrollmentProgressService(enrollment._id!.toString());
    progressData.push(progress);
  }

  return progressData;
};

const getLessonProgressService = async (studentId: string, lessonId: string) => {
  const progress = await Progress.findOne({
    studentId,
    lessonId,
  });

  return progress;
};

export const progressService = {
  markLessonCompleteService,
  markLessonIncompleteService,
  getProgressByEnrollmentService,
  calculateEnrollmentProgressService,
  getStudentProgressService,
  getLessonProgressService,
};
