import { Request, Response } from "express";
import { batchService } from "./batch.service";
import { IBatch } from "./batch.interface";
import { errorResponse, successResponse } from "../../utils/successResponse";
import { logger } from "../../utils/logger";

const createBatch = async (req: Request, res: Response) => {
  try {
    const batch = await batchService.createBatchService(
      req.body as Partial<IBatch>
    );
    successResponse(res, {
      statusCode: 201,
      success: true,
      message: "Batch created successfully",
      data: batch,
    });
  } catch (error) {
    logger.log(error as Error, "error in createBatch");
    errorResponse(res, error as Error, 400);
  }
};

const getAllBatches = async (req: Request, res: Response) => {
  try {
    const batches = await batchService.getAllBatchesService();
    successResponse(res, {
      statusCode: 200,
      success: true,
      message: "Batches fetched successfully",
      data: batches,
    });
  } catch (error) {
    logger.log(error as Error, "error in getAllBatches");
    errorResponse(res, error as Error, 400);
  }
};

const getBatchesByCourse = async (req: Request, res: Response) => {
  try {
    const batches = await batchService.getBatchesByCourseService(req.params.courseId);
    successResponse(res, {
      statusCode: 200,
      success: true,
      message: "Course batches fetched successfully",
      data: batches,
    });
  } catch (error) {
    logger.log(error as Error, "error in getBatchesByCourse");
    errorResponse(res, error as Error, 400);
  }
};

const patchBatch = async (req: Request, res: Response) => {
  try {
    const batch = await batchService.patchBatchService(
      req.params.id,
      req.body as Partial<IBatch>
    );
    successResponse(res, {
      statusCode: 200,
      success: true,
      message: "Batch patched successfully",
      data: batch,
    });
  } catch (error) {
    logger.log(error as Error, "error in patchBatch");
    errorResponse(res, error as Error, 400);
  }
};

export const batchController = {
  createBatch,
  getAllBatches,
  getBatchesByCourse,
  patchBatch,
};