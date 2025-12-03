/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { errorResponse } from "../utils/successResponse";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  errorResponse(res, new Error("route not found") as Error, 404);
};
