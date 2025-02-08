import schedule from 'node-schedule';
import { createTransaction, updateTransactionConfirmation, generateRandomTransaction } from '../utils/helpers';

// Function to simulate creating and confirming a transaction
async function createAndUpdateTransaction() {
  try {
    // Generate random transaction data
    const newTransaction = generateRandomTransaction();

    // Create the transaction using the API
    const transactionId = await createTransaction(newTransaction);
    if (transactionId) {
      // After 10 seconds, confirm the transaction
      setTimeout(() => updateTransactionConfirmation(transactionId), 10000);
    }
  } catch (error) {
    console.error('Error in transaction creation and update:', error);
  }
}

// Schedule the task to run every minute
schedule.scheduleJob('*/1 * * * *', function () {
  console.log('Running transaction creation job...');
  createAndUpdateTransaction();
});
