import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";
import { connectDB, sequelize } from "../db";
const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 8000;

export const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "https://transaction-tracker-liard.vercel.app/"],
    methods: ["GET", "POST"],
  },
});

// Start server and connect to database 
server.listen(PORT, async () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log("🚀 Server started successfully");
  await connectDB();
  sequelize.sync({ force: false }).then(() => {
    console.log("✅ Synced database successfully...");
  });
});

export { server, app };
