// tests/userController.test.ts
import request from 'supertest';
import { app } from '../../app/utils/socket';
import  TransactionModel  from '../../app/models/transaction'; // Your Sequelize model
import dotenv from 'dotenv';
dotenv.config();
jest.mock('@models/transaction'); // Use alias
jest.mock('sequelize');
describe('Transaction Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Reset all mocks before each test
  });

  it('GET /transactions should return a list of transactions', async () => {
    // Mock data
    const mockTransactions = [
      { id: 1, value: 100, createdAt: new Date() },
      { id: 2, value: 200, createdAt: new Date() },
    ];

    // Mocking TransactionModel.findAll() to return mock transactions
    (TransactionModel.findAll as jest.Mock).mockResolvedValue(mockTransactions);

    // Make request
    const response = await request(app).get('/api/transactions');

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.results).toBe(mockTransactions.length);
    expect(response.body.transactions).toEqual(mockTransactions);
  });

  it('GET /transactions should handle errors properly', async () => {
    // Mock findAll() to throw an error
    (TransactionModel.findAll as jest.Mock).mockRejectedValue(new Error('Database error'));

    const response = await request(app).get('/api/transactions');

    // Assertions
    expect(response.status).toBe(500);
    expect(response.body.status).toBe('error');
    expect(response.body.message).toBe('Database error');
  });
});
