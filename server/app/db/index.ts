require("dotenv").config();
import { Sequelize, DataTypes } from "sequelize";

const POSTGRES_URL = process.env.DATABASE_URL as unknown as string;
const sequelize = new Sequelize(POSTGRES_URL, {
    dialect: "postgres", // ✅ Add this line to specify PostgreSQL as the database dialect
    logging: false, // Optional: Disable logging
    host: 'postgres_db',  // this should match the service name in docker-compose.yml
    username: 'formasit',
    password: 'password123',
    database: 'transac_db',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // Accept self-signed certificates
      }
    }
  });

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("✅ Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

export { connectDB, sequelize, Sequelize, DataTypes };
