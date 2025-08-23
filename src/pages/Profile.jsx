import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/auth/AuthContext";
import { LogOut } from "lucide-react";

export default function Profile() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-extrabold mb-4">Mon profil</h1>

      <div className="rounded-2xl border bg-white p-4 mb-4">
        <div className="text-sm text-gray-500">Connecté avec :</div>
        <div className="text-base font-medium">{user?.email ?? "—"}</div>
      </div>

      <button
        onClick={onLogout}
        className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium hover:bg-gray-50"
      >
        <LogOut className="h-4 w-4" />
        Déconnexion
      </button>
    </main>
  );
}
