import { IAssignment, IAssignmentSubmission } from "./assignment.interface";
import { Assignment } from "./assignment.model";
import { AssignmentSubmission } from "./assignment-submission.model";
import { Types } from "mongoose";

const createAssignmentService = async (playLoad: Partial<IAssignment>) => {
  const isAssignmentExist = await Assignment.findOne({ title: playLoad.title });
  if (isAssignmentExist) {
    throw new Error("An assignment with this title already exists. Please choose a different title.");
  }
  const newAssignment = await Assignment.create(playLoad);
  return newAssignment;
};

const getAllAssignmentsService = async () => {
  const assignments = await Assignment.find({}).sort({ createdAt: -1 });
  return assignments;
};

const getAssignmentByIdService = async (id: string) => {
  const assignment = await Assignment.findById(id);
  if (!assignment) {
    throw new Error("Sorry, we couldn't find the assignment you're looking for.");
  }
  return assignment;
};

const patchAssignmentService = async (
  id: string,
  playLoad: Partial<IAssignment>
) => {
  const assignment = await Assignment.findById(id);
  if (!assignment) {
    throw new Error("Sorry, we couldn't find the assignment you're looking for.");
  }
  if (playLoad.title && playLoad.title !== assignment.title) {
    const isTitleExist = await Assignment.findOne({ title: playLoad.title });
    if (isTitleExist) {
      throw new Error("An assignment with this title already exists. Please choose a different title.");
    }
  }
  const updatedAssignment = await Assignment.findByIdAndUpdate(
    id,
    { $set: playLoad },
    { new: true }
  );
  return updatedAssignment;
};

const submitAssignmentService = async (payload: {
  assignmentId: string;
  studentId: string;
  submission: string;
}) => {
  // Validate and use the assignmentId directly - Mongoose handles string to ObjectId conversion
  if (!Types.ObjectId.isValid(payload.assignmentId)) {
    throw new Error(`Invalid assignment ID format: ${payload.assignmentId}`);
  }
  
  const assignment = await Assignment.findById(payload.assignmentId);
  if (!assignment) {
    throw new Error(`Assignment not found with ID: ${payload.assignmentId}`);
  }

  // Check if submission already exists
  const existingSubmission = await AssignmentSubmission.findOne({
    assignmentId: payload.assignmentId,
    studentId: payload.studentId,
  });

  let submission;
  if (existingSubmission) {
    // Update existing submission
    submission = await AssignmentSubmission.findByIdAndUpdate(
      existingSubmission._id,
      {
        submission: payload.submission,
        status: "PENDING",
        feedback: undefined,
        reviewedBy: undefined,
        reviewedAt: undefined,
      },
      { new: true }
    ).populate("assignmentId").populate("studentId", "name email");
  } else {
    // Create new submission
    submission = await AssignmentSubmission.create({
      assignmentId: payload.assignmentId,
      studentId: payload.studentId,
      submission: payload.submission,
      status: "PENDING",
    });
    await submission.populate("assignmentId");
    await submission.populate("studentId", "name email");
  }

  return submission;
};

const getAssignmentSubmissionService = async (
  assignmentId: string,
  studentId: string
) => {
  const submission = await AssignmentSubmission.findOne({
    assignmentId,
    studentId,
  })
    .populate("assignmentId")
    .populate("studentId", "name email")
    .populate("reviewedBy", "name email");
  return submission;
};

const getAllSubmissionsService = async (assignmentId?: string) => {
  const query = assignmentId ? { assignmentId } : {};
  const submissions = await AssignmentSubmission.find(query)
    .populate("assignmentId")
    .populate("studentId", "name email")
    .populate("reviewedBy", "name email")
    .sort({ createdAt: -1 });
  return submissions;
};

const reviewAssignmentService = async (payload: {
  submissionId: string;
  status: string;
  feedback?: string;
  reviewedBy: string;
}) => {
  const submission = await AssignmentSubmission.findById(payload.submissionId);
  if (!submission) {
    throw new Error("Submission not found.");
  }

  const updatedSubmission = await AssignmentSubmission.findByIdAndUpdate(
    payload.submissionId,
    {
      status: payload.status,
      feedback: payload.feedback,
      reviewedBy: payload.reviewedBy,
      reviewedAt: new Date(),
    },
    { new: true }
  )
    .populate("assignmentId")
    .populate("studentId", "name email")
    .populate("reviewedBy", "name email");

  return updatedSubmission;
};

export const assignmentService = {
  createAssignmentService,
  getAllAssignmentsService,
  getAssignmentByIdService,
  patchAssignmentService,
  submitAssignmentService,
  getAssignmentSubmissionService,
  getAllSubmissionsService,
  reviewAssignmentService,
};