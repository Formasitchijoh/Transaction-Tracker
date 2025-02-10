"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// This type is used to define the shape of our data.
export type Transaction = {
  id: string;
  value: number;
  timestamp: string;
  receiver: string;
  confirmed: boolean;
  sender: string;
};

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "sender",
    header: "Sender",
  },

  {
    accessorKey: "receiver",
    header: "receiver",
  },
  {
    accessorKey: "value",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("value"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "confirmed",
    header: "Status",
  },
  {
    accessorKey: "timestamp",
    header: "Time",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              <Edit size={18} />
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500 font-bold flex items-center gap-2">
              <Trash2 size={18} />
              Delete
            </DropdownMenuItem>{" "}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
