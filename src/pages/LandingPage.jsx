import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      
      <div className="bg-white bg-opacity-80 p-6 rounded shadow text-center">
        <h1 className="text-4xl font-bold text-purple-600 mb-2">Expense Manager</h1>
        <p className="text-gray-700 mb-6">Track your expenses effortlessly</p>
        <div className="space-x-4">
          <Link
            to="/login"
            className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-6 py-2 bg-purple-200 text-purple-700 rounded hover:bg-purple-300"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
