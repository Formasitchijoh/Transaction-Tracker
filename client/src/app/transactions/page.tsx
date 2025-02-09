

import { Transaction, columns } from "./columns";
import { DataTable } from "./data-table";
import { API_BASE_URL } from "@/lib/api";
async function getData(): Promise<Transaction[]> {
  try {
    // Wait for the response
    const response = await fetch(`${API_BASE_URL}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // If response is not ok, throw an error
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
    }

    // Parse JSON response
    const result = await response.json();
    const data: Transaction[] = result.transactions
    console.log("Fetched data:", data
    );
    
    return data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return []; // Return empty array in case of error
  }
}

export default async function TransactionPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}

