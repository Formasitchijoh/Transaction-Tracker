import { NextFunction, Request, Response } from "express";
import TransactionModel from "../models/transaction";
import { CreateTransactionInput, UpdateTransactionInput, ParamsInput, FilterQueryInput } from "../utils/transaction.schema";

export const createTransactionController = async (
  req: Request<{}, {}, CreateTransactionInput>,
  res: Response
): Promise<void> => {
  try {
    const { value, timestamp, receiver, sender, confirmed } = req.body;
    
    const transaction = await TransactionModel.create({
      value,
      timestamp,
      receiver,
      sender,
      confirmed,
    });

    res.status(201).json({
      status: "success",
      data: {
        transaction,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const updateTransactionController = async (
  req: Request<UpdateTransactionInput["params"], {}, UpdateTransactionInput["body"]>,
  res: Response
): Promise<any> => {
  try {
    const { transactionId } = req.params;
    
    if (!transactionId) {
      return res.status(400).json({ status: "fail", message: "Transaction ID is required" });
    }

    const result = await TransactionModel.update(
      { ...req.body, updatedAt: new Date() }, // ✅ Use new Date() instead of Date.now()
      { where: { id: transactionId } }
    );

    if (result[0] === 0) {
      return res.status(404).json({
        status: "fail",
        message: "Transaction with that ID not found",
      });
    }

    const transaction = await TransactionModel.findByPk(transactionId);

    res.status(200).json({
      status: "success",
      data: { transaction },
    });
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
  export const findTransactionController = async (
    req: Request<ParamsInput>,
    res: Response
  ): Promise<any> => {
    try {
      const transaction = await TransactionModel.findByPk(req.params.transactionId);
  
      if (!transaction) {
        res.status(404).json({
          status: "fail",
          message: "Transaction with that ID not found",
        });
      }
  
      res.status(200).json({
        status: "success",
        data: {
          transaction,
        },
      });
    } catch (error: any) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  };


  export const findAllTransactionsController = async (
    req: Request<{}, {}, {}, FilterQueryInput>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const page = req.query.page || 1;
      const limit = req.query.limit || 10;
      const offset = (page - 1) * limit;
  
      const transactions = await TransactionModel.findAll({
        limit,
        offset,
        order: [['createdAt', 'DESC']], // Order by the 'createdAt' field in descending order
      });
  
      res.status(200).json({
        status: "success",
        results: transactions.length,
        transactions,
      });
    } catch (error: any) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  };
  
  export const deleteTransactionController = async (
    req: Request<ParamsInput>,
    res: Response
  ): Promise<any> => {
    try {
      const result = await TransactionModel.destroy({
        where: { id: req.params.transactionId },
        force: true, // Permanently delete from the database
      });
  
      if (result === 0) {
        res.status(404).json({
          status: "fail",
          message: "Transaction with that ID not found",
        });
      }
  
      res.status(204).send(); // No content response
    } catch (error: any) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  };