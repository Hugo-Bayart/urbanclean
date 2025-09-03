// src/App.jsx
import React, { useContext } from "react";
import {
  NavLink,
  Route,
  Routes,
  Navigate,
  useNavigate,
  Outlet,
} from "react-router-dom";

import HomePage from "@/pages/Home";
import Reservation from "@/pages/Reservation"; // si encore utilisé
import Orders from "@/pages/Orders";
import Profile from "@/pages/Profile";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";

import { AuthProvider, AuthContext } from "@/auth/AuthContext";
import ProtectedRoute from "@/ProtectedRoute";

import Stepper from "@/components/Stepper";
import logo from "@/assets/logo.png";
import { Home, ClipboardList, User2, LogOut, Car } from "lucide-react";

// Flow Commander
import CommanderHome from "@/pages/Commander/CommanderHome";        // 1. Accueil
import ChoisirAdresse from "@/pages/Commander/ChoisirAdresse";      // 2. Coordonnées
import ChoisirVehicule from "@/pages/Commander/ChoisirVehicule";    // 3. Véhicule
import ChoisirService from "@/pages/Commander/ChoisirService";      // 4. Service
import ChoisirDateHeure from "@/pages/Commander/ChoisirDateHeure";  // 5. Détail (date & heure)
import Paiement from "@/pages/Commander/Paiement";                   // 6. Paiement
import Confirmation from "@/pages/Commander/Confirmation";           // 7. Confirmation

const linkBase = "px-3 py-2 rounded-xl text-sm font-medium";
const linkActive = "bg-black text-white";
const linkIdle = "hover:bg-gray-100 text-gray-700";

export default function App() {
  return (
    <AuthProvider>
      <AppShell />
    </AuthProvider>
  );
}

function AppShell() {
  const { user, hydrated } = useContext(AuthContext);

  if (!hydrated) {
    return <div className="p-6 text-center text-gray-500">Chargement…</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* HEADER (≥ md) */}
      {user && (
        <header className="hidden md:block sticky top-0 z-20 bg-white/80 backdrop-blur border-b">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
            <img src={logo} alt="UrbanClean" className="h-10 object-contain" />

            <nav className="ml-4 flex items-center gap-2">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? linkActive : linkIdle}`
                }
              >
                Accueil
              </NavLink>

              <NavLink
                to="/orders"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? linkActive : linkIdle}`
                }
              >
                Mes commandes
              </NavLink>

              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? linkActive : linkIdle}`
                }
              >
                Profil
              </NavLink>
            </nav>

            <div className="ml-auto flex items-center gap-3">
              <span className="hidden lg:inline text-sm text-gray-500">
                Prototype v0.1
              </span>
              <LogoutButton />
            </div>
          </div>
        </header>
      )}

      {/* CONTENU */}
      <div className="pb-20 md:pb-0">
        <Routes>
          {/* Public */}
          <Route
            path="/login"
            element={user ? <Navigate to="/" replace /> : <Login />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/" replace /> : <Signup />}
          />

          {/* Protégées */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reservation"
            element={
              <ProtectedRoute>
                <Reservation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* --------- FLOW COMMANDER (layout + sous-routes) --------- */}
          <Route
            path="/commander"
            element={
              <ProtectedRoute>
                <CommanderLayout />
              </ProtectedRoute>
            }
          >
            {/* 1. Accueil */}
            <Route index element={<CommanderHome />} />
            {/* 2. Coordonnées */}
            <Route path="adresse" element={<ChoisirAdresse />} />
            {/* 3. Véhicule */}
            <Route path="vehicule" element={<ChoisirVehicule />} />
            {/* 4. Service */}
            <Route path="service" element={<ChoisirService />} />
            {/* 5. Détail (date & heure) */}
            <Route path="date-heure" element={<ChoisirDateHeure />} />
            {/* 6. Paiement */}
            <Route path="paiement" element={<Paiement />} />
            {/* 7. Confirmation */}
            <Route path="confirmation" element={<Confirmation />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {/* NAV bas (mobile) */}
      {user && <MobileTabBar />}
    </div>
  );
}

/* ----- Layout du flow Commander : rend UN SEUL Stepper + le contenu ----- */
function CommanderLayout() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <Stepper />   {/* <== Garder le Stepper UNIQUEMENT ici */}
      <Outlet />
    </div>
  );
}

function LogoutButton() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const onClick = () => {
    logout();
    navigate("/login", { replace: true });
  };
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium hover:bg-gray-50"
      aria-label="Se déconnecter"
      title="Se déconnecter"
    >
      <LogOut className="h-4 w-4" />
      Déconnexion
    </button>
  );
}

function NotFound() {
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-extrabold mb-2">Page introuvable</h1>
      <p className="text-gray-600">Le lien demandé n’existe pas.</p>
    </main>
  );
}

function MobileTabBar() {
  const itemBase =
    "flex-1 flex flex-col items-center justify-center gap-1 py-2 rounded-xl";
  const active = "bg-black text-white";
  const idle = "text-gray-700";

  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-30 border-t bg-white/95 backdrop-blur supports-[env(safe-area-inset-bottom)]:pb-[max(0.5rem,env(safe-area-inset-bottom))] px-3"
      aria-label="Navigation principale"
    >
      <div className="max-w-5xl mx-auto flex items-stretch gap-2 py-1">
        <NavLink to="/" end className={({ isActive }) => `${itemBase} ${isActive ? active : idle}`}>
          <Home className="h-5 w-5" />
          <span className="text-xs font-medium">Accueil</span>
        </NavLink>

        <NavLink to="/commander" className={({ isActive }) => `${itemBase} ${isActive ? active : idle}`}>
          <Car className="h-5 w-5" />
          <span className="text-xs font-medium">Commander</span>
        </NavLink>

        <NavLink to="/orders" className={({ isActive }) => `${itemBase} ${isActive ? active : idle}`}>
          <ClipboardList className="h-5 w-5" />
          <span className="text-xs font-medium">Commandes</span>
        </NavLink>

        <NavLink to="/profile" className={({ isActive }) => `${itemBase} ${isActive ? active : idle}`}>
          <User2 className="h-5 w-5" />
          <span className="text-xs font-medium">Profil</span>
        </NavLink>
      </div>
    </nav>
  );
}
