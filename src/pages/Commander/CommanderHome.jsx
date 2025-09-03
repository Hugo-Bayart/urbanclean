import { Link } from "react-router-dom";

export default function CommanderHome() {
  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-extrabold mb-2">Commander un lavage</h1>
      <p className="text-gray-600 mb-6">
        Page d’accueil du parcours. Ajoutez votre UI ici.
      </p>

      <Link to="/commander/adresse" className="px-4 py-2 bg-black text-white rounded-md">
        Commencer
      </Link>
    </main>
  );
}
