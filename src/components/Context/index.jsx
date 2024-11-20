import React, { createContext, useState, useEffect } from "react";
import api from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Para verificar o carregamento inicial

  // Carrega o usuário ao iniciar
  useEffect(() => {
    async function getUser() {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Erro ao recuperar o usuário:", error);
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    }
    getUser();
  }, []);

  // Função para cadastrar o usuário
  async function Cadastrar(nome, email, senha) {
    try {
      const response = await api.post("/registro", { nome, email, senha });
      const userData = response.data;
      console.log(userData);
      
      // Salva os dados do usuário e o token
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Erro ao cadastrar");
    }
  }

  // Função de login
  async function Login(email, senha) {
    try {
      const response = await api.post("/login", { email, senha });
      const userData = response.data;
      console.log(userData);
      // Salva os dados do usuário e o token
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Erro ao fazer login");
    }
  }

  // Função de logout
  async function Logout() {
    try {
      await AsyncStorage.removeItem("user"); // Remove o usuário do armazenamento
      setUser(null); // Reseta o estado global
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  }

  // Função para alugar casas
  async function alugarCasas(casaId) {
    try {
      const response = await api.post("/criar/aluguel", { casaId });
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao alugar casas:", error);
    }
  }

  return (
    <MyContext.Provider value={{ Login, Logout, user, loading, Cadastrar, alugarCasas }}>
      {children}
    </MyContext.Provider>
  );
};
