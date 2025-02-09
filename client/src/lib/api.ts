export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === "production" ? "https://transaction-tracker-uq72.onrender.com/api/transactions": "http://localhost:3001/api/transactions");
