import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "https://api-register-six.vercel.app", // URL do seu backend
});

// Interceptor para adicionar o token de autenticação
api.interceptors.request.use(
  async (config) => {
    try {
      const userData = await AsyncStorage.getItem("user");
      const parsedUser = userData ? JSON.parse(userData) : null;
      const token = parsedUser?.token;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Adiciona o token no cabeçalho Authorization
      }
    } catch (error) {
      console.error("Erro ao recuperar o token:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Retorna erro em caso de falha
  }
);

export default api;
