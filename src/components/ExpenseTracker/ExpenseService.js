import { getDatabase, ref, push, onValue } from 'firebase/database';
import firebaseApp from '../../firebase';

const database = getDatabase(firebaseApp);

// Function to add an expense to the database
export const addExpense = (expense, onSuccess, onError) => {
  try {
    push(ref(database, 'expenses'), expense)
      .then((response) => {
        onSuccess(response);
      })
      .catch((error) => {
        onError(error);
      });
  } catch (error) {
    onError(error);
  }
};

// Function to get all expenses from the database
export const getExpenses = (onSuccess, onError) => {
  try {
    onValue(ref(database, 'expenses'), (snapshot) => {
      const data = snapshot.val();
      const expenses = data ? Object.values(data) : [];
      onSuccess(expenses);
    }, (error) => {
      onError(error);
    });
  } catch (error) {
    onError(error);
  }
};
