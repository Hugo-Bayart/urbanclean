import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./auth/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, hydrated } = useContext(AuthContext);

  if (!hydrated) return null; // évite un flash blanc/redirect avant hydratation
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
