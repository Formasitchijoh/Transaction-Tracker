"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { API_BASE_URL } from "@/lib/api";
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

const handleDeleteTransaction = async (transactionId: string) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/transactions/${transactionId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );
    }
    alert("Transaction deleted successfully");

    // Parse JSON response
  } catch (error) {
    console.error("Error fetching transactions:", error);
   alert("Error deleting transaction");
  }
};
const ConfirmTransaction = async (transactionId: string) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/transactions/${transactionId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ confirmed: true }),
      }
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );
    }
    alert("Transaction Updated successfully");

    // Parse JSON response
  } catch (error) {
    console.error("Error fetching transactions:", error);
   alert("Error Updating transaction");
  }
};

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "sender",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Sender
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "receiver",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Receiver
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "value",
    header: () => <div className="">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("value"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "confirmed",
    header: "Status",
  },
  {
    accessorKey: "timestamp",
    header: "Date",
    cell: ({ row }) => {
      const date = parseInt(row.getValue("timestamp"));
      const formattedDate = new Date(Number(date)).toLocaleString();

      return <div className="font-medium">{formattedDate.slice(0, 9)}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const transaction = row.original;

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
              onClick={() => {
                // navigator.clipboard.writeText(transaction.id)
                ConfirmTransaction(transaction.id)
              }}
            >
              <Edit size={18} />
              Confirm
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
            onClick={() => {
              // navigator.clipboard.writeText(transaction.id)
              handleDeleteTransaction(transaction.id)
            }}
            className="text-red-500 font-bold flex items-center gap-2">
              <Trash2 size={18} />
              Delete
            </DropdownMenuItem>{" "}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
