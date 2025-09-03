// src/pages/Commander/ChoisirDateHeure.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { readDraft, writeDraft } from "@/lib/orderDraft";
import { Droplets } from "lucide-react";

const LEVELS = [
  { id: "sale",           label: "Sale",     hint: "Poussière / saleté légère", add: 0  },
  { id: "sale_plus",      label: "Sale +",   hint: "Plus marqué à l’intérieur", add: 10 },
  { id: "sale_plus_plus", label: "Sale ++",  hint: "Très sale / encrassé",      add: 20 },
];

export default function ChoisirDateHeure() {
  const navigate = useNavigate();
  const [level, setLevel] = useState(null);
  const [express, setExpress] = useState(false);

  useEffect(() => {
    const d = readDraft();
    if (d.detailId) setLevel(d.detailId);
    if (typeof d.express === "boolean") setExpress(d.express);
  }, []);

  // on enregistre immédiatement le choix pour que la page Paiement soit pré-remplie
  const onPickLevel = (id) => {
    setLevel(id);
    writeDraft({ detailId: id, express });
  };

  const handleNext = () => {
    if (!level) return;
    // sécurité : on réécrit le draft avant de passer à l’étape suivante
    writeDraft({ detailId: level, express });
    navigate("/commander/paiement");
  };

  return (
    <main className="mx-auto max-w-5xl p-4">
      {/* Stepper supprimé ici pour éviter la double barre */}
      <h1 className="text-2xl font-bold mb-2">Détail</h1>
      <p className="text-gray-600 mb-6">
        Choisis le niveau de saleté et l’option Express si besoin.
      </p>

      {/* Niveaux */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {LEVELS.map((l) => {
          const active = l.id === level;
          return (
            <button
              key={l.id}
              type="button"
              onClick={() => onPickLevel(l.id)}
              className={[
                "rounded-2xl border p-4 text-left transition",
                active
                  ? "border-black bg-black text-white shadow-lg"
                  : "border-gray-200 bg-white hover:border-black/50",
              ].join(" ")}
            >
              <div className="flex items-center gap-3">
                <span
                  className={[
                    "inline-flex items-center justify-center rounded-xl p-3",
                    active ? "bg-white/10" : "bg-gray-100",
                  ].join(" ")}
                >
                  <Droplets className="h-6 w-6" />
                </span>
                <div>
                  <div className="font-semibold">{l.label}</div>
                  <div
                    className={[
                      "text-sm",
                      active ? "text-white/80" : "text-gray-600",
                    ].join(" ")}
                  >
                    {l.hint}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Express */}
      <label className="mt-6 inline-flex items-center gap-2 select-none cursor-pointer">
        <input
          type="checkbox"
          className="h-4 w-4"
          checked={express}
          onChange={(e) => {
            setExpress(e.target.checked);
            // garder le draft à jour dès qu’on coche/décoche
            writeDraft({ detailId: level, express: e.target.checked });
          }}
        />
        <span className="text-sm">Express (⚡)</span>
      </label>

      <div className="mt-8 flex items-center justify-between">
        <Link to="/commander/service" className="px-4 py-2 border rounded-md">
          Précédent
        </Link>
        <button
          type="button"
          disabled={!level}
          onClick={handleNext}
          className="px-4 py-2 bg-black text-white rounded-md disabled:opacity-50"
        >
          Suivant
        </button>
      </div>
    </main>
  );
}
