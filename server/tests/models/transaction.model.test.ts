// tests/models/transaction.model.test.ts

// First, we override the "../db" module so that our model doesn't try to connect to a real database.
jest.mock('../../src/db', () => {
    // Import sequelize-mock
    const SequelizeMock = require('sequelize-mock');
    // Create a new mock database instance
    const dbMock = new SequelizeMock();
    // For DataTypes we can reuse those from sequelize (or you can simply pass an empty object if not used)
    const DataTypes = require('sequelize').DataTypes;
    return {
      sequelize: dbMock,
      DataTypes,
    };
  });
  
  // Now import the model. It will use the mocked "sequelize" from the above jest.mock.
  import TransactionModel from '../../src/models/transaction.model';
  
  describe("TransactionModel", () => {
    it("should create a transaction", async () => {
      // Prepare the data you want to "create"
      const transactionData = {
        value: 100,
        timestamp: Date.now(),
        receiver: "test@example.com",
        sender: "sender@example.com",
      };
  
      // Create a fake transaction that your mock will return.
      const fakeTransaction = {
        id: "1234", // a mocked id
        ...transactionData,
        confirmed: false, // default value as per your model
      };
  
      // Override the create method with a Jest mock that resolves with our fake transaction.
      TransactionModel.create = jest.fn().mockResolvedValue(fakeTransaction);
  
      // Call the create method (this won't hit any real database).
      const result = await TransactionModel.create(transactionData);
  
      // Perform assertions on the returned fake transaction.
      expect(result).toHaveProperty("id", "1234");
      expect(result.value).toBe(100);
      expect(result.receiver).toBe("test@example.com");
      expect(result.confirmed).toBe(false);
    });
  });
  