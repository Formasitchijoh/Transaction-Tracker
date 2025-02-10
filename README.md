# Tracky

This Transaction Tracking System consists of three main components: a Scheduler, a REST API, and a Web Application. The Scheduler generates random transaction data every minute and communicates with the REST API to store these transactions. After a transaction is stored, the Scheduler updates its confirmed status 10 seconds later. The REST API provides the interface for creating, storing, and retrieving transactions. The Web Application, a single-page app, allows users to view all stored transactions, search by various parameters (such as ID, value, sender, and receiver), and view detailed transaction information. This system provides a complete solution for simulating and managing financial transactions.
## Getting Started

After cloning the repository, follow these steps to set up the project on your local machine.

### 1. Install Dependencies

Change into the `transactify` folder and then install dependencies in both the **server** and **client** directories.

#### Server

```bash
cd transactify/server
npm install
# or
yarn install
# or
pnpm install

#### Client

```bash
cd transactify/client
npm install
# or
yarn install
# or
pnpm install
