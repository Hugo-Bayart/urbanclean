// src/components/Stepper.jsx
import { NavLink, useLocation } from "react-router-dom";

/**
 * Carte des étapes du parcours "Commander".
 * ⚠️ Si tu changes un chemin, mets-le à jour ici.
 */
const STEPS = [
  { key: "accueil",      label: "Accueil",       path: "/commander" },
  { key: "coordonnees",  label: "Coordonnées",   path: "/commander/adresse" },
  { key: "vehicule",     label: "Véhicule",      path: "/commander/vehicule" },
  { key: "service",      label: "Service",       path: "/commander/service" },
  { key: "detail",       label: "Détail",        path: "/commander/date-heure" }, // Date & heure
  { key: "paiement",     label: "Paiement",      path: "/commander/paiement" },
  { key: "confirmation", label: "Confirmation",  path: "/commander/confirmation" },
];

/**
 * Stepper
 * - Auto-détecte l'étape active à partir de l'URL.
 * - Si tu veux forcer une étape, tu peux passer <Stepper step={3}/> (facultatif).
 */
export default function Stepper({ step }) {
  const { pathname } = useLocation();

  // Déduire l'étape courante depuis l'URL si "step" n'est pas fourni
  let currentIndex = STEPS.findIndex((s) =>
    s.path === "/commander"
      ? pathname === "/commander" || pathname === "/commander/"
      : pathname.startsWith(s.path)
  );
  if (currentIndex === -1) currentIndex = 0;

  // Si prop "step" (1..N) est passée, elle prend le dessus
  if (Number.isInteger(step) && step >= 1 && step <= STEPS.length) {
    currentIndex = step - 1;
  }

  return (
    <nav aria-label="Progression de la commande" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2">
        {STEPS.map((s, i) => {
          const active = i === currentIndex;

          return (
            <li key={s.key}>
              <NavLink
                to={s.path}
                aria-current={active ? "step" : undefined}
                className={[
                  "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition",
                  active
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-700 border-gray-300 hover:border-black/70",
                ].join(" ")}
              >
                <span
                  className={[
                    "inline-flex h-5 w-5 items-center justify-center rounded-full border text-xs",
                    active ? "border-white bg-white/20" : "border-gray-300",
                  ].join(" ")}
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <span className="font-medium">{s.label}</span>
              </NavLink>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
