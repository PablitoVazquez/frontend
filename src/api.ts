// src/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // Ajusta la URL según tu backend
});

// Agregar el token automáticamente a todas las solicitudes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
