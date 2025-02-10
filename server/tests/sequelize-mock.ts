// sequelize-mock.ts
const SequelizeMock  = require('sequelize-mock');

// Create a mock database instance
const dbMock = new SequelizeMock();

// Mock the Transaction model
const TransactionMock = dbMock.define('transactions', {
  id: '123e4567-e89b-12d3-a456-426614174001',
  value: 1000,
  timestamp: 1627889193000,
  receiver: 'receiver@example.com',
  confirmed: true,
  sender: 'sender@example.com',
});

export { TransactionMock };
