import axios from "axios";

const API_URL = "http://localhost:5000/gyumolcs"; // backend route

// Alapértelmezett axios config (minden hívásnál használja)
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // kell, ha cookie-t vagy auth fejléceket használsz
  headers: { "Content-Type": "application/json" },
});

export const getFruits = async () => {
  const res = await api.get("/");
  return res.data;
};

export const createFruit = async (data) => {
  const res = await api.post("/", data);
  return res.data;
};

export const updateFruit = async (id, data) => {
  const res = await api.put(`/${id}`, data);
  return res.data;
};

export const deleteFruit = async (id) => {
  const res = await api.delete(`/${id}`);
  return res.data;
};
