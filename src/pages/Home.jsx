import { useNavigate } from "react-router-dom";
import { Car, Mic, Search } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  return (
    <main className="relative h-[calc(100vh-0px)] md:h-[calc(100vh-64px)]">
      {/* Carte fake en fond */}
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background:
            "repeating-linear-gradient(0deg,#eef1f4 0 2px,transparent 2px 40px),repeating-linear-gradient(90deg,#eef1f4 0 2px,transparent 2px 40px),linear-gradient(#f8fafc,#f3f4f6)",
        }}
      />

      {/* Barre de recherche en haut */}
      <div className="absolute left-4 right-4 top-4 z-10">
        <div className="flex items-center gap-2 rounded-2xl bg-white shadow-lg px-4 py-3">
          <Search className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Où nettoyer ?"
            className="w-full outline-none placeholder:text-gray-400"
            // On peut capturer la saisie plus tard
          />
          <Mic className="h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Position de l'utilisateur (point bleu) */}
      <div className="absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <span className="block h-6 w-6 rounded-full bg-blue-500 shadow-[0_0_0_6px_rgba(59,130,246,0.25)]" />
      </div>

      {/* Quelques nettoyeurs dispo (icônes voiture) */}
      <Car className="absolute z-10 h-6 w-6 text-black left-[20%] top-[65%]" />
      <Car className="absolute z-10 h-6 w-6 text-black right-[22%] top-[38%]" />
      <Car className="absolute z-10 h-6 w-6 text-black right-[28%] top-[70%]" />

      {/* Bouton principal en bas */}
   import { Link } from "react-router-dom";
import { Car } from "lucide-react";

export default function HomePage() {
  return (
    <main className="max-w-5xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Bienvenue sur UrbanClean</h1>
      <p className="text-gray-600 mb-6">Votre lavage de voiture à domicile en quelques clics.</p>

      {/* Nouveau bouton: va vers /commander */}
      <Link
        to="/commander"
        className="inline-flex items-center gap-2 rounded-xl bg-black text-white px-5 py-3 text-sm font-medium hover:bg-black/90"
      >
        <Car className="h-4 w-4" />
        Commander
      </Link>
    </main>
  );
}
