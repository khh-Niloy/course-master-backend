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
  roleBasedProtection(...Object.values(Role)),
  batchController.getAllBatches
);

batchRoutes.get(
  "/course/:courseId",
  roleBasedProtection(...Object.values(Role)),
  batchController.getBatchesByCourse
);

batchRoutes.patch(
  "/:id",
  roleBasedProtection(Role.ADMIN),
  batchController.patchBatch
);