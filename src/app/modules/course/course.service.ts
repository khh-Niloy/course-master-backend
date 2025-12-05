import { ICourse } from "./course.interface";
import { Course } from "./course.model";
import { Types } from "mongoose";

// Helper function to convert string IDs to ObjectIds in modules
const convertModuleIds = (modules: any[]) => {
  if (!modules || !Array.isArray(modules)) return modules;
  
  return modules.map((module: any) => {
    const convertedModule: any = { ...module };
    
    // Convert quizIds array from strings to ObjectIds
    if (module.quizIds && Array.isArray(module.quizIds)) {
      convertedModule.quizIds = module.quizIds.map((id: any) => {
        if (typeof id === 'string' && Types.ObjectId.isValid(id)) {
          return new Types.ObjectId(id);
        }
        return id;
      });
    }
    
    // Convert assignmentId from string to ObjectId
    if (module.assignmentId) {
      if (typeof module.assignmentId === 'string' && Types.ObjectId.isValid(module.assignmentId)) {
        convertedModule.assignmentId = new Types.ObjectId(module.assignmentId);
      }
    }
    
    return convertedModule;
  });
};

const createCourseService = async (playLoad: Partial<ICourse>) => {
  const isCourseExist = await Course.findOne({ title: playLoad.title });
  if (isCourseExist) {
    throw new Error("A course with this title already exists. Please choose a different title.");
  }
  playLoad.slug = playLoad.title?.toLowerCase().replace(/ /g, "-") || "";
  
  // Convert module IDs before creating
  if (playLoad.modules) {
    playLoad.modules = convertModuleIds(playLoad.modules);
  }
  
  const newCourse = await Course.create(playLoad);
  return newCourse;
};

const getAllCoursesService = async () => {
  const courses = await Course.find();
  return courses;
};

const getCourseBySlugService = async (slug: string) => {
  const course = await Course.findOne({ slug });
  if (!course) {
    throw new Error("Sorry, we couldn't find the course you're looking for.");
  }
  return course;
};

const deleteCourseService = async (slug: string) => {
  const course = await Course.findOneAndDelete({ slug });
  if (!course) {
    throw new Error("Sorry, we couldn't find the course you're trying to delete.");
  }
  return course;
};

const updateCourseService = async (
  slug: string,
  playLoad: Partial<ICourse>
) => {
  const isCourseExist = await Course.findOne({ slug });
  if (!isCourseExist) {
    throw new Error("Sorry, we couldn't find the course you're trying to update.");
  }
  if (playLoad.title) {
    const isTitleExist = await Course.findOne({ title: playLoad.title });
    if (isTitleExist) {
      throw new Error("A course with this title already exists. Please choose a different title.");
    }
    playLoad.slug = playLoad.title?.toLowerCase().replace(/ /g, "-") || "";
  }
  
  // Convert module IDs before updating
  if (playLoad.modules) {
    playLoad.modules = convertModuleIds(playLoad.modules);
  }
  
  const updatedCourse = await Course.findOneAndUpdate({ slug }, playLoad, {
    new: true,
  });
  return updatedCourse;
};

const patchCourseService = async (
  slug: string,
  playLoad: Partial<ICourse>
) => {
  const isCourseExist = await Course.findOne({ slug });
  if (!isCourseExist) {
    throw new Error("Sorry, we couldn't find the course you're trying to update.");
  }
  if (playLoad.title && playLoad.title !== isCourseExist.title) {
    const isTitleExist = await Course.findOne({ title: playLoad.title });
    if (isTitleExist) {
      throw new Error("A course with this title already exists. Please choose a different title.");
    }
    playLoad.slug = playLoad.title?.toLowerCase().replace(/ /g, "-") || "";
  }
  
  // Convert module IDs before patching
  if (playLoad.modules) {
    playLoad.modules = convertModuleIds(playLoad.modules);
  }
  
  const updatedCourse = await Course.findOneAndUpdate(
    { slug },
    { $set: playLoad },
    { new: true }
  );
  return updatedCourse;
};

export const courseService = {
  createCourseService,
  getAllCoursesService,
  getCourseBySlugService,
  updateCourseService,
  patchCourseService,
  deleteCourseService,
};
