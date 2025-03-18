import React, { useState } from "react";
import { registerUser } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    address: "",
    gender: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      alert("Registration successful! You can now login.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data || "Registration failed");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      
      <div className="w-full max-w-md bg-white bg-opacity-80 p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Register
        </h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleRegister}>
         
          <div className="mb-4">
            <label className="block mb-1 text-gray-700">First Name</label>
            <input
              name="firstName"
              type="text"
              placeholder="Enter your first name"
              className="w-full border border-gray-600 px-3 py-2 rounded
                             bg-gray-800 text-white placeholder-gray-300"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-700">Last Name</label>
            <input
              name="lastName"
              type="text"
              placeholder="Enter your last name"
              className="w-full border border-gray-600 px-3 py-2 rounded
                             bg-gray-800 text-white placeholder-gray-300"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-700">Email</label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              className="w-full border border-gray-600 px-3 py-2 rounded
                             bg-gray-800 text-white placeholder-gray-300"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-700">Password</label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              className="w-full border border-gray-600 px-3 py-2 rounded bg-gray-800 text-white placeholder-gray-300"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-700">Date of Birth</label>
            <input
              name="dateOfBirth"
              type="date"
              className="w-full border border-gray-600 px-3 py-2 rounded bg-gray-800 text-white placeholder-gray-300"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-700">Address</label>
            <input
              name="address"
              type="text"
              placeholder="Enter your address"
              className="w-full border border-gray-600 px-3 py-2 rounded
                             bg-gray-800 text-white placeholder-gray-300"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-700">Gender</label>
            <select
              name="gender"
              className="w-full border border-gray-600 px-3 py-2 rounded
                             bg-gray-800 text-white placeholder-gray-300"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded 
                       hover:bg-purple-700"
          >
            Register
          </button>
        </form>
        <div className="text-center mt-4">
          <Link to="/login" className="text-purple-600 hover:underline">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
