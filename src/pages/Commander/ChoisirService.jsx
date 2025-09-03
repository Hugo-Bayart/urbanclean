// src/pages/Commander/ChoisirService.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { readDraft, writeDraft } from "@/lib/orderDraft";
import { Wrench, Brush, AlertTriangle } from "lucide-react";
// ⚠️ Mets à true seulement si le Stepper n'est PAS rendu par le layout
const SHOW_STEPPER = false;
let Stepper;
if (SHOW_STEPPER) {
  // import conditionnel pour éviter un import mort si tu ne l'affiches pas
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  Stepper = require("@/components/Stepper").default;
}

const SERVICES = [
  { id: "aspiration_simple", label: "Aspiration simple", icon: Wrench,  desc: "Aspiration rapide + surfaces principales." },
  { id: "detailing",         label: "Detailing",         icon: Brush,   desc: "Intérieur/extérieur minutieux." },
  { id: "catastrophe",       label: "Catastrophe (vomi)", icon: AlertTriangle, desc: "Désinfection / tâches tenaces." }
];

export default function ChoisirService() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  // Pré-sélection depuis le draft
  useEffect(() => {
    const d = readDraft();
    if (d?.serviceId) setSelected(d.serviceId);
  }, []);

  const onPick = (id) => {
    setSelected(id);
    writeDraft({ serviceId: id }); // on enregistre immédiatement
  };

  const handleNext = () => {
    if (!selected) return;
    // le choix est déjà écrit dans le draft via onPick
    navigate("/commander/date-heure");
  };

  return (
    <main className="mx-auto max-w-5xl p-4">
      {SHOW_STEPPER ? <Stepper step={4} /> : null}

      <h1 className="text-2xl font-bold mb-2">Choisir le service</h1>
      <p className="text-gray-600 mb-6">
        Sélectionne le niveau de prestation souhaité.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {SERVICES.map(({ id, label, icon: Icon, desc }) => {
          const active = selected === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onPick(id)}
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
                  <Icon className="h-6 w-6" />
                </span>
                <div>
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
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <Link to="/commander/vehicule" className="px-4 py-2 border rounded-md">
          Précédent
        </Link>
        <button
          type="button"
          disabled={!selected}
          onClick={handleNext}
          className="px-4 py-2 bg-black text-white rounded-md disabled:opacity-50"
        >
          Suivant
        </button>
      </div>
    </main>
  );
}
