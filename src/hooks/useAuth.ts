import { useState, useEffect } from "react";

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Проверяем localStorage на наличие токена
    const token = localStorage.getItem("auth_token");
    const userData = localStorage.getItem("user_data");

    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    // Простая имитация регистрации
    const userData = { email, name, id: Date.now().toString() };
    localStorage.setItem("auth_token", "mock_token");
    localStorage.setItem("user_data", JSON.stringify(userData));
    setUser(userData);
    return { data: { user: userData }, error: null };
  };

  const signIn = async (email: string, password: string) => {
    // Простая имитация входа
    const userData = { email, name: "Пользователь", id: Date.now().toString() };
    localStorage.setItem("auth_token", "mock_token");
    localStorage.setItem("user_data", JSON.stringify(userData));
    setUser(userData);
    return { data: { user: userData }, error: null };
  };

  const signOut = async () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
    setUser(null);
    return { error: null };
  };

  return {
    user,
    loading,
    signUp,
    signIn,
    signOut,
  };
};
