// src/pages/Commander/ChoisirService.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Stepper from "../../components/Stepper";
import { Sparkles, Wrench, AlertTriangle } from "lucide-react";

const SERVICES = [
  {
    id: "aspiration_simple",
    label: "Aspiration simple",
    desc: "Aspiration rapide + surfaces principales.",
    Icon: Wrench, // tu peux mettre Sparkles si tu préfères
  },
  {
    id: "detailling",
    label: "Detailling",
    desc: "Nettoyage intérieur/exterieur minutieux (détails, finitions).",
    Icon: Sparkles,
  },
  {
    id: "catastrophe",
    label: "Catastrophe (vomi)",
    desc: "Intervention lourde (désinfection, taches tenaces).",
    Icon: AlertTriangle,
  },
];

export default function ChoisirService() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const handleNext = () => {
    if (!selected) return;
    // Sauvegarde légère (à remplacer par un Context si tu préfères)
    localStorage.setItem("serviceType", selected);
    navigate("/commander/ChoisirAdresse");
  };

  return (
    <div className="mx-auto max-w-5xl p-4">
      <Stepper step={3} />
      <h1 className="text-2xl font-bold mb-2">Choisir le service</h1>
      <p className="text-gray-600 mb-6">
        Sélectionne le niveau de prestation souhaité.
      </p>

      {/* Grille de cartes */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {SERVICES.map(({ id, label, desc, Icon }) => {
          const active = selected === id;
          return (
            <button
              key={id}
              onClick={() => setSelected(id)}
              role="radio"
              aria-checked={active}
              className={[
                "group text-left w-full rounded-2xl border p-4 transition",
                "focus:outline-none focus:ring-2 focus:ring-black/50",
                active
                  ? "bg-black text-white border-black shadow-lg"
                  : "bg-white border-gray-200 hover:border-black/50",
              ].join(" ")}
            >
              <div className="flex items-start gap-3">
                <span
                  className={[
                    "inline-flex items-center justify-center rounded-xl p-3",
                    active ? "bg-white/10" : "bg-gray-100",
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
                      active ? "text-white/80" : "text-gray-600",
                    ].join(" ")}
                  >
                    {desc}
                  </div>
                </div>
              </div>

              {active && (
                <span className="mt-3 inline-block text-xs font-medium rounded-full bg-white/20 px-2 py-0.5">
                  Sélectionné
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Link to="/commander/vehicule" className="px-4 py-2 border rounded-md">
          Précédent
        </Link>
        <button
          type="button"
          onClick={handleNext}
          disabled={!selected}
          className={[
            "px-4 py-2 rounded-md font-semibold",
            selected
              ? "bg-black text-white hover:bg-black/90"
              : "bg-gray-200 text-gray-500 cursor-not-allowed",
          ].join(" ")}
        >
          Suivant
        </button>
      </div>
    </div>
  );
}
