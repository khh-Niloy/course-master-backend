import { IEnrollment } from "./enrollment.interface";
import { Enrollment } from "./enrollment.model";
import { progressService } from "../progress/progress.service";

const createEnrollmentService = async (playLoad: Partial<IEnrollment>) => {
  // Check if student is already enrolled in this batch
  const existingEnrollment = await Enrollment.findOne({
    studentId: playLoad.studentId,
    batchId: playLoad.batchId,
  });

  if (existingEnrollment) {
    throw new Error("Student is already enrolled in this batch");
  }

  const newEnrollment = await Enrollment.create(playLoad);
  return newEnrollment;
};

const getAllEnrollmentsService = async () => {
  const enrollments = await Enrollment.find({})
    .populate('studentId', 'name email')
    .populate('courseId', 'title slug')
    .populate('batchId', 'name batchNumber startDate')
    .sort({ createdAt: -1 });
  return enrollments;
};

const getEnrollmentsByStudentService = async (studentId: string) => {
  const enrollments = await Enrollment.find({ studentId })
    .populate('courseId', 'title slug description category')
    .populate('batchId', 'name batchNumber startDate')
    .sort({ createdAt: -1 });
  
  // Add progress data to each enrollment
  const enrollmentsWithProgress = await Promise.all(
    enrollments.map(async (enrollment) => {
      try {
        const progressData = await progressService.calculateEnrollmentProgressService(
          enrollment._id!.toString()
        );
        return {
          ...enrollment.toObject(),
          progress: progressData,
        };
      } catch (error) {
        // If progress calculation fails, return enrollment without progress
        return {
          ...enrollment.toObject(),
          progress: {
            enrollmentId: enrollment._id,
            totalLessons: 0,
            completedLessons: 0,
            progressPercentage: 0,
            lastActivity: null,
          },
        };
      }
    })
  );
  
  return enrollmentsWithProgress;
};

const getEnrollmentsByCourseService = async (courseId: string) => {
  const enrollments = await Enrollment.find({ courseId })
    .populate('studentId', 'name email')
    .populate('batchId', 'name batchNumber startDate')
    .sort({ createdAt: -1 });
  return enrollments;
};

export const enrollmentService = {
  createEnrollmentService,
  getAllEnrollmentsService,
  getEnrollmentsByStudentService,
  getEnrollmentsByCourseService,
};

