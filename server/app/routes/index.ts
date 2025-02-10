
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

/**
 * @openapi
 * /api/transactions:
 *   get:
 *     summary: Retrieve all transactions
 *     responses:
 *       200:
 *         description: A list of transactions
 */
router
  .route("/")
  .get(findAllTransactionsController)
  /**
   * @openapi
   * /api/transactions:
   *   post:
   *     summary: Create a new transaction
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               value:
   *                 type: integer
   *               timestamp:
   *                 type: integer
   *               receiver:
   *                 type: string
   *               sender:
   *                 type: string
   *     responses:
   *       201:
   *         description: Transaction created successfully
   */
  .post(validate(createTransactionSchema), createTransactionController);

/**
 * @openapi
 * /api/transactions/{transactionId}:
 *   get:
 *     summary: Retrieve a single transaction by ID
 *     parameters:
 *       - in: path
 *         name: transactionId
 *         required: true
 *         schema:
 *           type: string
 *         description: The transaction id
 *     responses:
 *       200:
 *         description: A single transaction
 *       404:
 *         description: Transaction not found
 */
router
  .route("/:transactionId")
  .get(findTransactionController)
  /**
   * @openapi
   * /api/transactions/{transactionId}:
   *   patch:
   *     summary: Update a transaction
   *     parameters:
   *       - in: path
   *         name: transactionId
   *         required: true
   *         schema:
   *           type: string
   *         description: The transaction id
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               value:
   *                 type: integer
   *               timestamp:
   *                 type: integer
   *               receiver:
   *                 type: string
   *               sender:
   *                 type: string
   *     responses:
   *       200:
   *         description: Transaction updated successfully
   */
  .patch(validate(updateTransactionSchema), updateTransactionController)
  /**
   * @openapi
   * /api/transactions/{transactionId}:
   *   delete:
   *     summary: Delete a transaction
   *     parameters:
   *       - in: path
   *         name: transactionId
   *         required: true
   *         schema:
   *           type: string
   *         description: The transaction id
   *     responses:
   *       200:
   *         description: Transaction deleted successfully
   */
  .delete(deleteTransactionController);

export default router;
