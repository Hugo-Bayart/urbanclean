import { Link } from "react-router-dom";
import Stepper from "../../components/Stepper";

export default function ChoisirDateHeure() {
  return (
    <div className="mx-auto max-w-5xl p-4">
      <Stepper step={5} />
      <h1 className="text-2xl font-bold mb-2">Choisir la date & l’heure</h1>
      <p className="text-gray-600 mb-6">Placeholder (sélecteur date/heure).</p>
      <div className="flex gap-2">
        <Link to="/commander/adresse" className="px-4 py-2 border rounded-md">Précédent</Link>
        <Link to="/commander/paiement" className="px-4 py-2 bg-black text-white rounded-md">Suivant</Link>
      </div>
    </div>
  );
}
