import axiosInstance from "./axiosConfig";

export async function registerUser(userData) {
  return axiosInstance.post("/api/Auth/register", userData);
}

export async function loginUser(credentials) {
  return axiosInstance.post("/api/Auth/login", credentials);
}
