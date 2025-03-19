import axiosInstance from "./axiosConfig";

export async function getExpenses() {
  return axiosInstance.get("/api/Expenses");
}

export async function createExpense(expense) {
  return axiosInstance.post("/api/Expenses", expense);
}

export async function deleteExpense(id) {
  return axiosInstance.delete(`/api/Expenses/${id}`);
}

export async function updateExpense(id, updatedData) {
  return axiosInstance.put(`/api/Expenses/${id}`, updatedData);
}
