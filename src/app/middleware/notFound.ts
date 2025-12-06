/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { errorResponse } from "../utils/successResponse";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  errorResponse(res, new Error("Sorry, the page you're looking for doesn't exist.") as Error, 404);
};
