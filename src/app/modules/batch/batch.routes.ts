import { Router } from "express";
import { Role } from "../user/user.interface";
import { roleBasedProtection } from "../../middleware/roleBasedProtection";
import { batchController } from "./batch.controller";

export const batchRoutes = Router();

batchRoutes.post(
  "/",
  roleBasedProtection(Role.ADMIN),
  batchController.createBatch
);

batchRoutes.get(
  "/",
  roleBasedProtection(Role.ADMIN),
  batchController.getAllBatches
);

batchRoutes.get(
  "/course/:courseId",
  roleBasedProtection(Role.ADMIN),
  batchController.getBatchesByCourse
);