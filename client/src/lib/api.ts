export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === "production" ? "https://transaction-tracker-uq72.onrender.com": "http://localhost:3001");
