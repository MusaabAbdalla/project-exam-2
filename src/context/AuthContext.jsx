import { createContext, useState, useContext } from "react";
import { load } from "@/storage/load";
import { useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // load token from localStorage when the app loads
    const token = load("token");
    if (token) {
      setIsLoggedIn(true);
    }
    setLoading(false); //stop loading once the token check is done
  }, []);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);
  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
