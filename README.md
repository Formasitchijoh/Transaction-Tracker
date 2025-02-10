# Tracky - Transaction Tracking System

Tracky is a transaction tracking system composed of three core components:

1. **Scheduler** – Generates random transaction data every minute and communicates with the REST API to store these transactions. After a transaction is stored, the Scheduler updates its confirmed status 10 seconds later.
2. **REST API** – Provides endpoints for creating, storing, and retrieving transaction data.
3. **Web Application** – A single-page application (SPA) built with **Next.js** that allows users to:
   - View all stored transactions.
   - Search transactions using parameters such as ID, value, sender, and receiver.
   - Access detailed transaction information.

This system provides a complete solution for simulating and managing financial transactions.

---

## 🚀 Getting Started

Follow the steps below to set up the project on your local machine.

### 1️⃣ Clone the Repository & Install Dependencies

```sh
git clone https://github.com/Formasitchijoh/Transaction-Tracker.git
cd tracky

# Install Server Dependencies
cd server
npm install  # or yarn install, pnpm install
cd ..

# Install Client Dependencies
cd client
npm install  # or yarn install, pnpm install
cd ..
```

### 🛠 Running the Application

You can run Tracky using either local development mode or Docker.

### 🔹 Running Locally

#### Start the Express Server

```sh
cd transactify/server
npx ts-node app/index.ts 
The local server is found at http://localhost:3001/api/transactions

```

#### Start the Next.js Client

```sh
cd transactify/client
npm run dev  # or yarn dev, pnpm dev
The local server is found at http://localhost:3000
```

### 🔹 Running with Docker

#### Build the Docker Containers and Start in Detached Mode

```sh
docker-compose up -d
docker-compose up --build

```

### 📖 Accessing the Swagger Documentation

Once the server is running, you can access the Swagger documentation by navigating to:

```
http://localhost:3001/api-docs
```

The Swagger UI will provide an interactive view of all available API endpoints, their parameters, and responses.

