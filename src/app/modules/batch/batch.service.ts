import { IBatch } from "./batch.interface";
import { Batch } from "./batch.model";

const createBatchService = async (playLoad: Partial<IBatch>) => {
  // Auto-generate batch number if not provided
  if (!playLoad.batchNumber) {
    const lastBatch = await Batch.findOne({ courseId: playLoad.courseId })
      .sort({ batchNumber: -1 });
    playLoad.batchNumber = lastBatch ? lastBatch.batchNumber! + 1 : 1;
  }

  const newBatch = await Batch.create(playLoad);
  return newBatch;
};

const getAllBatchesService = async () => {
  const batches = await Batch.find({})
    .populate('courseId', 'title slug')
    .sort({ createdAt: -1 });
  return batches;
};

const getBatchesByCourseService = async (courseId: string) => {
  const batches = await Batch.find({ courseId })
    .populate('courseId', 'title slug')
    .sort({ batchNumber: 1 });
  return batches;
};

export const batchService = {
  createBatchService,
  getAllBatchesService,
  getBatchesByCourseService,
};