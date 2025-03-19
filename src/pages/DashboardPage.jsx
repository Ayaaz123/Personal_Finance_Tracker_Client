import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchExpenses,
  addExpense,
  removeExpense,
  modifyExpense,
} from "../features/expenses/expenseSlice";
import Calculator from "../components/Calculator";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.items);
  const loading = useSelector((state) => state.expenses.loading);

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [editingExpense, setEditingExpense] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCalculator, setShowCalculator] = useState(false);

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!description || !amount || !date || !category) {
      alert("Please fill all fields.");
      return;
    }
    dispatch(addExpense({ description, amount, date, category }));
    setDescription("");
    setAmount("");
    setDate("");
    setCategory("");
  };

  const handleDeleteExpense = (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) return;
    dispatch(removeExpense(id));
  };

  const handleEditClick = (expense) => {
    setEditingExpense(expense);
  };

  const handleEditChange = (e) => {
    setEditingExpense({
      ...editingExpense,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateExpense = (e) => {
    e.preventDefault();
    if (
      !editingExpense.description ||
      !editingExpense.amount ||
      !editingExpense.date ||
      !editingExpense.category
    ) {
      alert("Please fill all fields in the edit form.");
      return;
    }
    dispatch(modifyExpense({ id: editingExpense.id, updatedData: editingExpense }));
    setEditingExpense(null);
  };

  const handleCancelEdit = () => {
    setEditingExpense(null);
  };

  const filteredExpenses = expenses.filter((exp) =>
    exp.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col"
      style={{
        backgroundImage:
          "url('https://t4.ftcdn.net/jpg/02/10/45/95/360_F_210459536_XmLDEcKq2DpeNLVmheuWeu9NM9aGKnih.jpg')",
      }}
    >
      <nav className="bg-purple-600 px-4 py-2 flex justify-between items-center">
        <div className="text-white font-bold text-xl">Expense Manager</div>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search expenses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded px-3 py-1"
          />
          <Link
            to="/profile"
            className="text-black bg-white px-3 py-1 rounded hover:bg-gray-200 transition-colors"
          >
            Profile
          </Link>
          <Link
            to="/"
            onClick={() => localStorage.clear()}
            className="text-black bg-white px-3 py-1 rounded hover:bg-gray-200 transition-colors"
          >
            Logout
          </Link>
        </div>
      </nav>

      <div className="flex-1 p-4 bg-white bg-opacity-80">
        {loading && <p>Loading expenses...</p>}
        <div
          className={`grid gap-4 mb-6 ${
            editingExpense ? "grid-cols-2" : "grid-cols-1"
          }`}
        >
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Add an Expense</h2>
            <form onSubmit={handleAddExpense}>
              <div className="mb-2">
                <label className="block text-gray-700">Description</label>
                <input
                  type="text"
                  className="w-full border border-gray-600 px-3 py-2 rounded bg-gray-800 text-white placeholder-gray-300"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">Amount</label>
                <input
                  type="number"
                  className="w-full border border-gray-600 px-3 py-2 rounded bg-gray-800 text-white placeholder-gray-300"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">Date</label>
                <input
                  type="date"
                  className="w-full border border-gray-600 px-3 py-2 rounded bg-gray-800 text-white placeholder-gray-300"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">Category</label>
                <input
                  type="text"
                  className="w-full border border-gray-600 px-3 py-2 rounded bg-gray-800 text-white placeholder-gray-300"
                  placeholder="Enter category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                Add Expense
              </button>
            </form>
          </div>
          {editingExpense && (
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-semibold mb-2 text-gray-800">Edit Expense</h2>
              <form onSubmit={handleUpdateExpense}>
                <div className="mb-2">
                  <label className="block text-gray-700">Description</label>
                  <input
                    type="text"
                    name="description"
                    className="w-full border border-gray-600 px-3 py-2 rounded bg-gray-800 text-white placeholder-gray-300"
                    value={editingExpense.description}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700">Amount</label>
                  <input
                    type="number"
                    name="amount"
                    className="w-full border border-gray-600 px-3 py-2 rounded bg-gray-800 text-white placeholder-gray-300"
                    value={editingExpense.amount}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700">Date</label>
                  <input
                    type="date"
                    name="date"
                    className="w-full border border-gray-600 px-3 py-2 rounded bg-gray-800 text-white placeholder-gray-300"
                    value={editingExpense.date?.substring(0, 10) || ""}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700">Category</label>
                  <input
                    type="text"
                    name="category"
                    className="w-full border border-gray-600 px-3 py-2 rounded bg-gray-800 text-white placeholder-gray-300"
                    value={editingExpense.category}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Recent Expenses</h2>
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left text-gray-700">Description</th>
                <th className="px-4 py-2 text-left text-gray-700">Amount</th>
                <th className="px-4 py-2 text-left text-gray-700">Date</th>
                <th className="px-4 py-2 text-left text-gray-700">Category</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((exp) => (
                <tr key={exp.id} className="border-b">
                  <td className="px-4 py-2 text-gray-800">{exp.description}</td>
                  <td className="px-4 py-2 text-gray-800">{exp.amount}</td>
                  <td className="px-4 py-2 text-gray-800">
                    {new Date(exp.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 text-gray-800">{exp.category}</td>
                  <td className="px-4 py-2 text-right space-x-2">
                    <button
                      onClick={() => handleEditClick(exp)}
                      className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteExpense(exp.id)}
                      className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredExpenses.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-2 text-gray-600">
                    No expenses found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <button
            onClick={() => setShowCalculator(!showCalculator)}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          >
            {showCalculator ? "Hide Calculator" : "Show Calculator"}
          </button>
          {showCalculator && (
            <div className="mt-4">
              <Calculator />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
