export interface Transaction {
    value: number;
    timestamp: number;
    receiver: string;
    confirmed: boolean;
    sender: string;
  }
  
  // Function to generate random transaction data
  export function generateRandomTransaction(): Transaction {
    const values = ['completed', 'pending', 'failed'];
    const randomValue = Math.floor(Math.random() * 1000); // Random value between 0 and 1000
    const randomStatus = values[Math.floor(Math.random() * values.length)];
  
    return {
      value: randomValue,
      timestamp: Date.now(),
      receiver: `Receiver ${Math.floor(Math.random() * 100)}`, // Random receiver name
      sender: `Sender ${Math.floor(Math.random() * 100)}`,   // Random sender name
      confirmed: randomStatus === 'completed' ? true : false,
    };
  }
  
  // Function to create a new transaction using fetch
  export async function createTransaction(transaction: Transaction) {
    try {
      console.log('Creating transaction:', transaction);
      
      const response = await fetch('http://localhost:3001/api/transactions/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transaction),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create transaction');
      }
  
      const data = await response.json();
      console.log('Transaction created:', data);
      return data.data.transaction.id; // Return the transaction ID
    } catch (error) {
      console.error('Error creating transaction:', error);
    }
  }
  
  // Function to update the transaction's confirmed status after 10 seconds
  export async function updateTransactionConfirmation(transactionId: string) {
    try {
      const response = await fetch(`http://localhost:3001/api/transactions/${transactionId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ confirmed: true }),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to confirm transaction with ID: ${transactionId}`);
      }
  
      const data = await response.json();
      console.log(`Transaction ${transactionId} confirmed after 10 seconds:`, data);
    } catch (error) {
      console.error(`Error confirming transaction ${transactionId}:`, error);
    }
  }
  