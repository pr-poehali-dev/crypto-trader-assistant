import axios from "axios";

const API_BASE_URL = "http://localhost:3001/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

// Добавляем токен к каждому запросу
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (data: { email: string; password: string; name: string }) =>
    api.post("/auth/register", data),

  login: (data: { email: string; password: string }) =>
    api.post("/auth/login", data),

  getProfile: () => api.get("/auth/me"),
};

// Watchlist API
export const watchlistAPI = {
  getWatchlist: () => api.get("/watchlist"),
  addToWatchlist: (data: { coinId: string; coinName: string }) =>
    api.post("/watchlist", data),
  removeFromWatchlist: (id: string) => api.delete(`/watchlist/${id}`),
};

// Trades API
export const tradesAPI = {
  getTrades: () => api.get("/trades"),
  createTrade: (data: {
    coinId: string;
    type: string;
    amount: number;
    price: number;
  }) => api.post("/trades", data),
};
