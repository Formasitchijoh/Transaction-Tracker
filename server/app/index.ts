

import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

import express from "express";
import cors from "cors";
import transactionRouter from "./routes";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { swaggerOptions } from "./utils/swagger.config";
import { app, io } from "./utils/socket";

// Import scheduler AFTER io is defined to avoid circular dependency
import "./jobs/scheduler";

const PORT = process.env.PORT || 8000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "10kb" }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

app.use(
  cors({
    origin: ["http://localhost:3000", "https://transaction-tracker-liard.vercel.app/"],
    credentials: true,
  })
);

// Swagger API documentation
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use("/api/transactions", transactionRouter);

app.all("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: `Route: ${req.originalUrl} does not exist on this server`,
  });
});

// ✅ Ensure io is properly handling WebSocket connections
io.on("connection", (socket) => {

  socket.on("transaction-created", (transactionId) => {
    io.emit("transaction-created", transactionId);
  });

  socket.on("disconnect", () => {
    console.log(`❌ User disconnected: ${socket.id}`);
  });
  socket.emit("server-message", { message: "Connected to WebSocket server!" });

});