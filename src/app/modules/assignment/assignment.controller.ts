import { Request, Response } from "express";
import { assignmentService } from "./assignment.service";
import { IAssignment } from "./assignment.interface";
import { errorResponse, successResponse } from "../../utils/successResponse";
import { logger } from "../../utils/logger";
import { JwtPayload } from "jsonwebtoken";

interface AuthenticatedRequest extends Omit<Request, 'user'> {
  user?: JwtPayload;
}

const createAssignment = async (req: Request, res: Response) => {
  try {
    const assignment = await assignmentService.createAssignmentService(
      req.body as Partial<IAssignment>
    );
    successResponse(res, {
      statusCode: 201,
      success: true,
      message: "Assignment created successfully!",
      data: assignment,
    });
  } catch (error) {
    logger.log(error as Error, "error in createAssignment");
    errorResponse(res, error as Error, 400);
  }
};

const getAllAssignments = async (req: Request, res: Response) => {
  try {
    const assignments = await assignmentService.getAllAssignmentsService();
    successResponse(res, {
      statusCode: 200,
      success: true,
      message: "Assignments retrieved successfully.",
      data: assignments,
    });
  } catch (error) {
    logger.log(error as Error, "error in getAllAssignments");
    errorResponse(res, error as Error, 400);
  }
};

const getAssignmentById = async (req: Request, res: Response) => {
  try {
    const assignment = await assignmentService.getAssignmentByIdService(req.params.id);
    successResponse(res, {
      statusCode: 200,
      success: true,
      message: "Assignment retrieved successfully.",
      data: assignment,
    });
  } catch (error) {
    logger.log(error as Error, "error in getAssignmentById");
    errorResponse(res, error as Error, 400);
  }
};

const patchAssignment = async (req: Request, res: Response) => {
  try {
    const assignment = await assignmentService.patchAssignmentService(
      req.params.id,
      req.body as Partial<IAssignment>
    );
    successResponse(res, {
      statusCode: 200,
      success: true,
      message: "Assignment has been updated successfully.",
      data: assignment,
    });
  } catch (error) {
    logger.log(error as Error, "error in patchAssignment");
    errorResponse(res, error as Error, 400);
  }
};

const submitAssignment = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const studentId = req.user?.userId;
    if (!studentId) {
      return errorResponse(res, new Error("Please log in to access this feature."), 401);
    }
    
    const assignmentId = req.params.id;
    logger.log({ assignmentId, studentId, submissionLength: req.body.submission?.length }, "info in submitAssignment");
    
    const submission = await assignmentService.submitAssignmentService({
      assignmentId, // Get assignmentId from URL params
      studentId,
      submission: req.body.submission,
    });
    
    successResponse(res, {
      statusCode: 200,
      success: true,
      message: "Assignment submitted successfully.",
      data: submission,
    });
  } catch (error) {
    logger.log(error as Error, "error in submitAssignment");
    errorResponse(res, error as Error, 400);
  }
};

const getAssignmentSubmission = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const studentId = req.user?.userId;
    if (!studentId) {
      return errorResponse(res, new Error("Please log in to access this feature."), 401);
    }
    
    const submission = await assignmentService.getAssignmentSubmissionService(
      req.params.assignmentId,
      studentId
    );
    
    successResponse(res, {
      statusCode: 200,
      success: true,
      message: "Assignment submission retrieved successfully.",
      data: submission,
    });
  } catch (error) {
    logger.log(error as Error, "error in getAssignmentSubmission");
    errorResponse(res, error as Error, 400);
  }
};

const getAllSubmissions = async (req: Request, res: Response) => {
  try {
    const assignmentId = req.query.assignmentId as string | undefined;
    const submissions = await assignmentService.getAllSubmissionsService(assignmentId);
    
    successResponse(res, {
      statusCode: 200,
      success: true,
      message: "Submissions retrieved successfully.",
      data: submissions,
    });
  } catch (error) {
    logger.log(error as Error, "error in getAllSubmissions");
    errorResponse(res, error as Error, 400);
  }
};

const reviewAssignment = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const adminId = req.user?.userId;
    if (!adminId) {
      return errorResponse(res, new Error("Please log in to access this feature."), 401);
    }
    
    const submission = await assignmentService.reviewAssignmentService({
      submissionId: req.params.submissionId,
      status: req.body.status,
      feedback: req.body.feedback,
      reviewedBy: adminId,
    });
    
    successResponse(res, {
      statusCode: 200,
      success: true,
      message: "Assignment reviewed successfully.",
      data: submission,
    });
  } catch (error) {
    logger.log(error as Error, "error in reviewAssignment");
    errorResponse(res, error as Error, 400);
  }
};

export const assignmentController = {
  createAssignment,
  getAllAssignments,
  getAssignmentById,
  patchAssignment,
  submitAssignment,
  getAssignmentSubmission,
  getAllSubmissions,
  reviewAssignment,
};