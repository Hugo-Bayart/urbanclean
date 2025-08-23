import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("uc_user");
    if (raw) setUser(JSON.parse(raw));
    setHydrated(true);
  }, []);

  const login = (email) => {
    const u = { id: "u_123", email };
    setUser(u);
    localStorage.setItem("uc_user", JSON.stringify(u));
  };

  const signup = (email) => {
    const u = { id: "u_123", email, firstLoginAt: Date.now() };
    setUser(u);
    localStorage.setItem("uc_user", JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("uc_user");
  };

  return (
    <AuthContext.Provider value={{ user, hydrated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
