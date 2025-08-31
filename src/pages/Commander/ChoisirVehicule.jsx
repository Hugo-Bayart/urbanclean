import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Car, CarFront, Truck } from "lucide-react";

const OPTIONS = [
  { id: "citadine", label: "Citadine", icon: Car, description: "Petite voiture urbaine (ex: 208, Clio)." },
  { id: "berline_suv", label: "Berline / SUV", icon: CarFront, description: "Berline, break, crossover, SUV." },
  { id: "utilitaire_van", label: "Utilitaire / Van", icon: Truck, description: "Fourgon, van, utilitaire." }
];

export default function ChoisirVehicule() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!selected) return;
    // Ici tu pourrais enregistrer le choix dans un context ou localStorage
    localStorage.setItem("vehiculeType", selected);
    navigate("/commander/ChoisirVehicule"); // Redirection vers la page suivante
  };

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-extrabold mb-1">Choisir le véhicule</h1>
      <p className="text-gray-600 mb-6">Sélectionne le type de véhicule à laver.</p>

      {/* Grille de cartes cliquables */}
      <div
        role="radiogroup"
        aria-label="Type de véhicule"
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        {OPTIONS.map(({ id, label, icon: Icon, description }) => {
          const isActive = selected === id;
          return (
            <button
              key={id}
              role="radio"
              aria-checked={isActive}
              onClick={() => setSelected(id)}
              className={[
                "group relative w-full rounded-2xl border p-4 text-left transition",
                "focus:outline-none focus:ring-2 focus:ring-black/50",
                isActive
                  ? "border-black bg-black text-white shadow-lg"
                  : "border-gray-200 bg-white hover:border-black/50",
              ].join(" ")}
            >
              {/* Input caché pour l’accessibilité */}
              <input
                type="radio"
                name="vehicle"
                value={id}
                checked={isActive}
                onChange={() => setSelected(id)}
                className="sr-only"
              />

              <div className="flex items-start gap-3">
                <span
                  className={[
                    "inline-flex items-center justify-center rounded-xl p-3",
                    isActive ? "bg-white/10" : "bg-gray-100",
                  ].join(" ")}
                  aria-hidden="true"
                >
                  <Icon className="h-6 w-6" />
                </span>

                <div className="flex-1">
                  <div className="font-semibold">{label}</div>
                  <div
                    className={[
                      "text-sm",
                      isActive ? "text-white/80" : "text-gray-600",
                    ].join(" ")}
                  >
                    {description}
                  </div>
                </div>
              </div>

              {isActive && (
                <span className="absolute top-3 right-3 text-xs font-medium rounded-full bg-white/20 px-2 py-0.5">
                  Sélectionné
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Actions */}
      <div className="mt-8 flex items-center justify-between">
        <Link
          to="/commander"
          className="rounded-xl border px-4 py-2 text-sm font-medium hover:bg-gray-50"
        >
          Retour
        </Link>

        <button
          type="button"
          disabled={!selected}
          onClick={handleContinue}
          className={[
            "rounded-xl px-4 py-2 text-sm font-semibold",
            selected
              ? "bg-black text-white hover:bg-black/90"
              : "bg-gray-200 text-gray-500 cursor-not-allowed",
          ].join(" ")}
        >
          Continuer
        </button>
      </div>
    </main>
  );
}
