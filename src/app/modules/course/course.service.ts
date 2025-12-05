import { ICourse } from "./course.interface";
import { Course } from "./course.model";

const createCourseService = async (playLoad: Partial<ICourse>) => {
  const isCourseExist = await Course.findOne({ title: playLoad.title });
  if (isCourseExist) {
    throw new Error("Course already exists");
  }
  playLoad.slug = playLoad.title?.toLowerCase().replace(/ /g, "-") || "";
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
    throw new Error("Course not found");
  }
  return course;
};

const deleteCourseService = async (slug: string) => {
  const course = await Course.findOneAndDelete({ slug });
  if (!course) {
    throw new Error("Course not found");
  }
  return course;
};

const updateCourseService = async (
  slug: string,
  playLoad: Partial<ICourse>
) => {
  const isCourseExist = await Course.findOne({ slug });
  if (!isCourseExist) {
    throw new Error("Course not found");
  }
  if (playLoad.title) {
    const isTitleExist = await Course.findOne({ title: playLoad.title });
    if (isTitleExist) {
      throw new Error("Title already exists");
    }
    playLoad.slug = playLoad.title?.toLowerCase().replace(/ /g, "-") || "";
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
    throw new Error("Course not found");
  }
  if (playLoad.title && playLoad.title !== isCourseExist.title) {
    const isTitleExist = await Course.findOne({ title: playLoad.title });
    if (isTitleExist) {
      throw new Error("Title already exists");
    }
    playLoad.slug = playLoad.title?.toLowerCase().replace(/ /g, "-") || "";
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
