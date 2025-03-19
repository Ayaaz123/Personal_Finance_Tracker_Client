import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getExpenses, createExpense, deleteExpense, updateExpense } from '../../api/expenses';
export const fetchExpenses = createAsyncThunk('expenses/fetchExpenses', async () => {
  const response = await getExpenses();
  return response.data;
});
export const addExpense = createAsyncThunk('expenses/addExpense', async (expense) => {
  const response = await createExpense(expense);
  return response.data;
});

export const removeExpense = createAsyncThunk('expenses/removeExpense', async (id) => {
  await deleteExpense(id);
  return id;
});

export const modifyExpense = createAsyncThunk('expenses/modifyExpense', async ({ id, updatedData }) => {
  const response = await updateExpense(id, updatedData);
  return response.data;
});

const expenseSlice = createSlice({
  name: 'expenses',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeExpense.fulfilled, (state, action) => {
        state.items = state.items.filter(expense => expense.id !== action.payload);
      })
      .addCase(modifyExpense.fulfilled, (state, action) => {
        const index = state.items.findIndex(expense => expense.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export default expenseSlice.reducer;
