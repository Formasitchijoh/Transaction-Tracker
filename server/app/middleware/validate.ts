import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";

/*
Middleare to validate request body, query, and params
*/
export const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        params: req.params,
        query: req.query,
        body: req.body,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          status: "fail",
          errors: error.errors,
        });
      }
      return; // This return just exits the function without returning a value.
    }
  };




