import { expect } from 'chai';
import sinon from 'sinon';
const SequelizeMock  = require('sequelize-mock');

// Initialize the mock Sequelize instance
const dbMock = new SequelizeMock();

// Create the mocked model
const TransactionMock = dbMock.define('transactions', {
  id: {
    type: SequelizeMock.UUIDV4,
    primaryKey: true,
  },
  value: 1000,
  timestamp: 1627889193000,
  receiver: 'receiver@example.com',
  sender: 'sender@example.com',
  confirmed: false,
});

describe('Transaction Model (Mocked)', () => {

  it('should create a transaction using the mock model', async () => {
    // Mock the `create` method of the mocked Transaction model
    const transactionData = {
      value: 1000,
      timestamp: 1627889193000,
      receiver: 'receiver@example.com',
      sender: 'sender@example.com',
    };

    // Mock the `create` method using `sinon`
    sinon.stub(TransactionMock, 'create').returns(
      Promise.resolve({
        ...transactionData,
        id: '123e4567-e89b-12d3-a456-426614174001',
        confirmed: false, // Default value
      })
    );

    const transaction = await TransactionMock.create(transactionData);

    expect(transaction).to.have.property('id');
    expect(transaction.value).to.equal(1000);
    expect(transaction.receiver).to.equal('receiver@example.com');
    expect(transaction.confirmed).to.equal(false);

    sinon.restore(); // Restore the stub after use
  });

  it('should fetch a transaction by id using the mock model', async () => {
    const transactionData = {
      value: 1000,
      timestamp: 1627889193000,
      receiver: 'receiver@example.com',
      sender: 'sender@example.com',
    };

    // Mock the `findOne` method of the mocked Transaction model
    sinon.stub(TransactionMock, 'findOne').returns(
      Promise.resolve({
        ...transactionData,
        id: '123e4567-e89b-12d3-a456-426614174001',
        confirmed: false, // Default value
      })
    );

    const transaction = await TransactionMock.findOne({
      where: { id: '123e4567-e89b-12d3-a456-426614174001' },
    });

    expect(transaction).to.have.property('id');
    expect(transaction.id).to.equal('123e4567-e89b-12d3-a456-426614174001');
    expect(transaction.value).to.equal(1000);
    expect(transaction.receiver).to.equal('receiver@example.com');
    expect(transaction.confirmed).to.equal(false);

    sinon.restore(); // Restore the stub after use
  });

  it('should return null if transaction not found using the mock model', async () => {
    // Mock `findOne` to return `null` for a non-existing transaction
    sinon.stub(TransactionMock, 'findOne').returns(Promise.resolve(null));

    const transaction = await TransactionMock.findOne({
      where: { id: 'nonexistent-id' },
    });

    expect(transaction).to.equal(null);

    sinon.restore(); // Restore the stub after use
  });

});
