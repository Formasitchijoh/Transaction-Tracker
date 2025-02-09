"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Transaction } from "../columns";
import { API_BASE_URL } from "@/lib/api";
const TransactionDetails = () => {
  const [transaction, setTransaction] = useState<Transaction>();
  const params = useParams();
  const transactionId = params.transactionId as string;

  useEffect(() => {
    const fetchTransaction = async () => {
      const response = await fetch(`${API_BASE_URL}/${transactionId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    // If response is not ok, throw an error
    if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
      }

    // Parse JSON response
    const data = await response.json();
    console.log("Fetched data:", data.data.transaction
    );
      setTransaction(data.data.transaction);
    };

    fetchTransaction();
  }, [transactionId]);

  return (
    <div className="w-[80%] mx-auto h-[80vh] flex flex-col items-center justify-center p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Transaction Details
      </h2>
  
      {transaction ? (
        <div className="w-full max-w-lg bg-gray-100 p-6 rounded-lg">
          <p className="text-lg">
            <span className="font-semibold text-gray-700">Transaction ID:</span>{" "}
            <span className="text-blue-600">{transaction.id}</span>
          </p>
          <p className="text-lg">
            <span className="font-semibold text-gray-700">Sender:</span>{" "}
            <span className="text-red-500">{transaction.sender}</span>
          </p>
          <p className="text-lg">
            <span className="font-semibold text-gray-700">Receiver:</span>{" "}
            <span className="text-green-500">{transaction.receiver}</span>
          </p>
          <p className="text-lg">
            <span className="font-semibold text-gray-700">Value:</span>{" "}
            <span className="text-blue-700 font-bold">${transaction.value}</span>
          </p>
          <p className="text-lg">
            <span className="font-semibold text-gray-700">Timestamp:</span>{" "}
            <span className="text-gray-600">
              {new Date(Number(transaction.timestamp)).toLocaleString()}
            </span>
          </p>
          <p className="text-lg">
            <span className="font-semibold text-gray-700">Status:</span>{" "}
            {transaction.confirmed ? (
              <span className="text-green-600 font-bold">Confirmed ✅</span>
            ) : (
              <span className="text-red-600 font-bold">Pending ⏳</span>
            )}
          </p>
  
          {/* Action Buttons */}
          <div className="flex justify-between mt-6">
            <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
              ✏️ Edit
            </button>
            <button className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition">
              🗑️ Delete
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Loading transaction details...</p>
      )}
    </div>
  );
  
  
};

export default TransactionDetails;
