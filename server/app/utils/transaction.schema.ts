import { z } from "zod";

export const createTransactionSchema = z.object({
  body: z.object({
    value: z.number({
      required_error: "Value is required",
    }),
    timestamp: z.number({
      required_error: "Timestamp is required",
    }),
    receiver: z.string({
      required_error: "Receiver is required",
    }),
    confirmed: z.boolean().optional(),
    sender: z.string({
      required_error: "Sender is required",
    }),
  }),
});

export const params = z.object({
  transactionId: z.string(),
});

export const updateTransactionSchema = z.object({
  params,
  body: z
    .object({
      value: z.number(),
      timestamp: z.number(),
      receiver: z.string(),
      confirmed: z.boolean(),
      sender: z.string(),
    })
    .partial(),
});

export const filterQuery = z.object({
  limit: z.number().default(10),
  page: z.number().default(1),
});

export type ParamsInput = z.TypeOf<typeof params>;
export type FilterQueryInput = z.TypeOf<typeof filterQuery>;
export type CreateTransactionInput = z.TypeOf<typeof createTransactionSchema>["body"];
export type UpdateTransactionInput = z.TypeOf<typeof updateTransactionSchema>;
