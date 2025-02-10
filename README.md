# Tracky - Transaction Tracking System

Tracky is a transaction tracking system composed of three core components:

1. **Scheduler** – Generates random transaction data every minute and communicates with the REST API to store these transactions. After a transaction is stored, the Scheduler updates its confirmed status 10 seconds later.
2. **REST API** – Provides endpoints for creating, storing, and retrieving transaction data.
3. **Web Application** – A single-page application (SPA) that allows users to:
   - View all stored transactions.
   - Search transactions using parameters such as ID, value, sender, and receiver.
   - Access detailed transaction information.

This system provides a complete solution for simulating and managing financial transactions.

---

## 🚀 Getting Started

Follow the steps below to set up the project on your local machine.

### 1️⃣ Clone the Repository & Install Dependencies

```sh
git clone https://github.com/your-username/tracky.git
cd tracky
``` sh

# Install Server Dependencies
cd server
npm install  # or yarn install, pnpm install
cd ..

# Install Client Dependencies
cd client
npm install  # or yarn install, pnpm install
cd ..

### 🛠 Running the Application

You can run Tracky using either local development mode or Docker.

### 🔹 Running Locally

#### Start the Server
```sh
cd tracky/server
npm start  # or yarn start, pnpm start
