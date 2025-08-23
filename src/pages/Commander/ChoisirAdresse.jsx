import { Link } from "react-router-dom";
import Stepper from "../../components/Stepper";

export default function ChoisirAdresse() {
  return (
    <div className="mx-auto max-w-5xl p-4">
      <Stepper step={4} />
      <h1 className="text-2xl font-bold mb-2">Adresse d’intervention</h1>
      <p className="text-gray-600 mb-6">Placeholder (adresse + carte).</p>
      <div className="flex gap-2">
        <Link to="/commander/service" className="px-4 py-2 border rounded-md">Précédent</Link>
        <Link to="/commander/date-heure" className="px-4 py-2 bg-black text-white rounded-md">Suivant</Link>
      </div>
    </div>
  );
}
// dans n'importe quel fichier .jsx
import Home from "@/pages/Home";
