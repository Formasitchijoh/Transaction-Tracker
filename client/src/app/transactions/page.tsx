"use client";
import { Transaction, columns } from "./columns";
import { DataTable } from "./data-table";
import { API_BASE_URL } from "@/lib/api";
import io from "socket.io-client";
import { useState, useEffect } from "react";

const socket = io(API_BASE_URL, {
  withCredentials: true, // Allow cross-origin requests with credentials
  transports: ['websocket', 'polling'], // Ensure WebSocket connection works
});

const getData = async (): Promise<Transaction[]> => {
  try {
    // Wait for the response
    const response = await fetch(`${API_BASE_URL}/api/transactions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );
    }

    const result = await response.json();
    const data: Transaction[] = result.transactions;

    return data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return []; // Return empty array in case of error
  }
};

const TransactionPage = () => {
  const [data, setData] = useState<Transaction[]>([]);
  const [fetchTransactions, setFetchTransactions] = useState(false)

  useEffect(() => { 
    // Listen for transaction creation
    socket.on("transaction-created", (transactionId) => {
      setFetchTransactions(true);
      console.log(`Transaction created 111111: ${transactionId}`);
      
    });
    // Listen for transaction updates
    socket.on("transaction-updated", (transactionId) => {
      setFetchTransactions(true);
      console.log(`Transaction created 333333: ${transactionId}`);
    });

    return () => {
      socket.off("transaction-created");
      socket.off("transaction-updated");
    };
  }, [socket]);

  
  useEffect(() => {
    getData().then((data) => setData(data));
    console.log("Data updated and  fetched successfully", data);
    setFetchTransactions(false);

  }, [fetchTransactions]);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default TransactionPage;
