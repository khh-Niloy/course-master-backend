import { IAssignment } from "./assignment.interface";
import { Assignment } from "./assignment.model";

const createAssignmentService = async (playLoad: Partial<IAssignment>) => {
  const isAssignmentExist = await Assignment.findOne({ title: playLoad.title });
  if (isAssignmentExist) {
    throw new Error("Assignment with this title already exists");
  }
  const newAssignment = await Assignment.create(playLoad);
  return newAssignment;
};

const getAllAssignmentsService = async () => {
  const assignments = await Assignment.find({}, { title: 1, _id: 1, type: 1, createdAt: 1 }).sort({ createdAt: -1 });
  return assignments;
};

export const assignmentService = {
  createAssignmentService,
  getAllAssignmentsService,
};