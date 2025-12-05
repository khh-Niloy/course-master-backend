import { Request, Response } from "express";
import { courseService } from "./course.service";
import { ICourse } from "./course.interface";
import { errorResponse, successResponse } from "../../utils/successResponse";
import { logger } from "../../utils/logger";

const createCourse = async (req: Request, res: Response) => {
  try {
    const course = await courseService.createCourseService(
      req.body as Partial<ICourse>
    );
    successResponse(res, {
      statusCode: 201,
      success: true,
      message: "Course created successfully",
      data: course,
    });
  } catch (error) {
    logger.log(error as Error, "error in createCourse");
    errorResponse(res, error as Error, 400);
  }
};

const getAllCourses = async (req: Request, res: Response) => {
  try {
    const courses = await courseService.getAllCoursesService();
    successResponse(res, {
      statusCode: 200,
      success: true,
      message: "Courses fetched successfully",
      data: courses,
    });
  } catch (error) {
    logger.log(error as Error, "error in getAllCourses");
    errorResponse(res, error as Error, 400);
  }
};

const getCourseBySlug = async (req: Request, res: Response) => {
  try {
    const course = await courseService.getCourseBySlugService(req.params.slug);
    successResponse(res, {
      statusCode: 200,
      success: true,
      message: "Course fetched successfully",
      data: course,
    });
  } catch (error) {
    logger.log(error as Error, "error in getCourseBySlug");
    errorResponse(res, error as Error, 400);
  }
};

const deleteCourse = async (req: Request, res: Response) => {
  try {
    const course = await courseService.deleteCourseService(req.params.slug);
    successResponse(res, {
      statusCode: 200,
      success: true,
      message: "Course deleted successfully",
      data: course,
    });
  } catch (error) {
    logger.log(error as Error, "error in deleteCourse");
    errorResponse(res, error as Error, 400);
  }
};

const updateCourse = async (req: Request, res: Response) => {
  try {
    const course = await courseService.updateCourseService(
      req.params.slug,
      req.body as Partial<ICourse>
    );
    successResponse(res, {
      statusCode: 200,
      success: true,
      message: "Course updated successfully",
      data: course,
    });
  } catch (error) {
    logger.log(error as Error, "error in updateCourse");
    errorResponse(res, error as Error, 400);
  }
};

const patchCourse = async (req: Request, res: Response) => {
  try {
    const course = await courseService.patchCourseService(
      req.params.slug,
      req.body as Partial<ICourse>
    );
    successResponse(res, {
      statusCode: 200,
      success: true,
      message: "Course patched successfully",
      data: course,
    });
  } catch (error) {
    logger.log(error as Error, "error in patchCourse");
    errorResponse(res, error as Error, 400);
  }
};

export const courseController = {
  createCourse,
  getAllCourses,
  getCourseBySlug,
  updateCourse,
  patchCourse,
  deleteCourse,
};
