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
  const assignments = await Assignment.find({}).sort({ createdAt: -1 });
  return assignments;
};

const patchAssignmentService = async (
  id: string,
  playLoad: Partial<IAssignment>
) => {
  const assignment = await Assignment.findById(id);
  if (!assignment) {
    throw new Error("Assignment not found");
  }
  if (playLoad.title && playLoad.title !== assignment.title) {
    const isTitleExist = await Assignment.findOne({ title: playLoad.title });
    if (isTitleExist) {
      throw new Error("Assignment with this title already exists");
    }
  }
  const updatedAssignment = await Assignment.findByIdAndUpdate(
    id,
    { $set: playLoad },
    { new: true }
  );
  return updatedAssignment;
};

export const assignmentService = {
  createAssignmentService,
  getAllAssignmentsService,
  patchAssignmentService,
};