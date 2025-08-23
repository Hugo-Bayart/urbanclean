export default function Stepper({ step = 1 }) {
  const steps = [
    "Accueil",
    "Véhicule",
    "Service",
    "Adresse",
    "Date & heure",
    "Paiement",
    "Confirmation",
  ];
  return (
    <div className="w-full mx-auto max-w-5xl px-4 py-3 text-sm text-gray-700">
      <div className="flex flex-wrap gap-2 items-center">
        {steps.map((label, i) => {
          const index = i + 1;
          const isActive = index === step;
          return (
            <span key={label}
              className={`px-2.5 py-1 rounded-full border ${isActive ? "bg-black text-white border-black" : "bg-white"}`
              }>
              {index}. {label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
