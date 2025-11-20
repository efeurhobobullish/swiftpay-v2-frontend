import axios from "axios";
import { useAuthStore } from "@/Stores"; 

const api = axios.create({
  baseURL: "https://swiftpaylite-backend-61677663bd02.herokuapp.com",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const { token } = useAuthStore.getState();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
