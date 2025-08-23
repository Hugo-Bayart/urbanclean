import { useContext, useState } from "react";
import { AuthContext } from "../auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    login(email.trim());
    navigate("/", { replace: true });
  };

  return (
    <div style={{ maxWidth: 420, margin: "48px auto", padding: 16 }}>
      <h1 style={{ marginBottom: 8 }}>UrbanClean</h1>
      <p style={{ opacity: 0.7, marginBottom: 16 }}>Connexion</p>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
          style={{ padding: 12, borderRadius: 8, border: "1px solid #ddd" }}
        />
        <button
          type="submit"
          style={{ padding: 12, borderRadius: 10, border: "none", background:"#111", color:"#fff" }}
        >
          Se connecter
        </button>
      </form>
      <p style={{ marginTop: 12 }}>
        Pas de compte ? <Link to="/signup">Créer un compte</Link>
      </p>
    </div>
  );
}
