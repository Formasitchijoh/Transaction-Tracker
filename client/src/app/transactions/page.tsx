"use client";
import { Transaction, columns } from "./columns";
import { DataTable } from "./data-table";
import { API_BASE_URL } from "@/lib/api";
import io from "socket.io-client";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';

const socket = io(API_BASE_URL, {
  withCredentials: true, // Allow cross-origin requests with credentials
  transports: ['websocket', 'polling'], // Ensure WebSocket connection works
});

export const getData = async (): Promise<Transaction[]> => {
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
  const [loading, setLoading] = useState(false)
  const [fetchTransactions, setFetchTransactions] = useState(false)
  const setNotification = (message:string) => toast(message);


  useEffect(() => { 
    // Listen for transaction creation
    socket.on("transaction-created", () => {
      setFetchTransactions(true);
      setNotification('Transaction Completed')
      
    });
    // Listen for transaction updates
    socket.on("transaction-updated", () => {
      setFetchTransactions(true);
    });

    return () => {
      socket.off("transaction-created");
      socket.off("transaction-updated");
    };
  }, []);

  
  useEffect(() => {
    setLoading(true)
    getData().then((result) => setData(result));
    setFetchTransactions(false);
    setLoading(false)

  }, [fetchTransactions]);

  return (
    <>

      <ToastContainer />
      <DataTable loading={loading} columns={columns} data={data} />
    </>
  );
};

export default TransactionPage;
