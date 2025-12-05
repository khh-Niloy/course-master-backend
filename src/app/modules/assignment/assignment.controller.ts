import { Request, Response } from "express";
import { assignmentService } from "./assignment.service";
import { IAssignment } from "./assignment.interface";
import { errorResponse, successResponse } from "../../utils/successResponse";
import { logger } from "../../utils/logger";

const createAssignment = async (req: Request, res: Response) => {
  try {
    const assignment = await assignmentService.createAssignmentService(
      req.body as Partial<IAssignment>
    );
    successResponse(res, {
      statusCode: 201,
      success: true,
      message: "Assignment created successfully",
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
      message: "Assignments fetched successfully",
      data: assignments,
    });
  } catch (error) {
    logger.log(error as Error, "error in getAllAssignments");
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
      message: "Assignment patched successfully",
      data: assignment,
    });
  } catch (error) {
    logger.log(error as Error, "error in patchAssignment");
    errorResponse(res, error as Error, 400);
  }
};

export const assignmentController = {
  createAssignment,
  getAllAssignments,
  patchAssignment,
};