import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import morgan from "morgan";
import cors from "cors";
import { connectDB, sequelize} from "./db";
import transactionRouter from "./routes";
import path from 'path';
// import './jobs/scheduler'
dotenv.config({
  path: path.resolve(__dirname, '../../.env'), // Adjust path if necessary
});
const app: Application = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(express.json({ limit: "10kb" }));
// if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
})

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.get("/api/healthchecker", (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "Build CRUD API with Node.js and Sequelize",
  });
});

app.use("/api/transactions", transactionRouter);
app.all("*", (req: Request, res: Response) => {
  res.status(404).json({
    status: "fail",
    message: `Route: ${req.originalUrl} does not exist on this server`,
  });
});

app.listen(PORT, async () => {
  console.log("🚀Server started Successfully");
  await connectDB();
  sequelize.sync({ force: false }).then(() => {
    console.log("✅Synced database successfully...");
  });
});