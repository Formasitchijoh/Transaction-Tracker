import express from "express";
import { validate } from "../middleware/validate";
import {
  createTransactionController,
  deleteTransactionController,
  findAllTransactionsController,
  findTransactionController,
  updateTransactionController,
} from "../controllers/transaction";
import { createTransactionSchema, updateTransactionSchema } from "../utils/transaction.schema";

const router = express.Router();

router
  .route("/")
  .get(findAllTransactionsController)
  .post(validate(createTransactionSchema), createTransactionController);
router
  .route("/:transactionId")
  .get(findTransactionController)
  .patch(validate(updateTransactionSchema), updateTransactionController)
  .delete(deleteTransactionController);

export default router;
