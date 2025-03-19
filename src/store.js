import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from './features/auth/authSlice';
import expenseReducer from './features/expenses/expenseSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    expenses: expenseReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
