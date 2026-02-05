import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("adminAuthenticated");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = (password: string) => {
    if (password === "admin123") {
      localStorage.setItem("adminAuthenticated", "true");
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("adminAuthenticated");
    setIsAuthenticated(false);
    navigate("/admin/login");
  };

  return { isAuthenticated, isLoading, login, logout };
};
