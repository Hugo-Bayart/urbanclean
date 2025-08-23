import { Link } from "react-router-dom";
import Stepper from "../../components/Stepper";

export default function Paiement() {
  return (
    <div className="mx-auto max-w-5xl p-4">
      <Stepper step={6} />
      <h1 className="text-2xl font-bold mb-2">Paiement</h1>
      <p className="text-gray-600 mb-6">Placeholder (intégration paiement).</p>
      <div className="flex gap-2">
        <Link to="/commander/date-heure" className="px-4 py-2 border rounded-md">Précédent</Link>
        <Link to="/commander/confirmation" className="px-4 py-2 bg-black text-white rounded-md">Payer</Link>
      </div>
    </div>
  );
}
