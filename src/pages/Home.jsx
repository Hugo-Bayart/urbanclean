import React from "react";
import { Link } from "react-router-dom";
import { Car } from "lucide-react";

export default function HomePage() {
  return (
    <main className="max-w-5xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Bienvenue sur UrbanClean</h1>
      <p className="text-gray-600 mb-6">Votre lavage de voiture à domicile en quelques clics.</p>

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
