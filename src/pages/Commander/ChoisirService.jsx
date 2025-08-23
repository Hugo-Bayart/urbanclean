import { Link } from "react-router-dom";
import Stepper from "../../components/Stepper";

export default function ChoisirService() {
  return (
    <div className="mx-auto max-w-5xl p-4">
      <Stepper step={3} />
      <h1 className="text-2xl font-bold mb-2">Choisir le service</h1>
      <p className="text-gray-600 mb-6">Placeholder (liste de services).</p>
      <div className="flex gap-2">
        <Link to="/commander/vehicule" className="px-4 py-2 border rounded-md">Précédent</Link>
        <Link to="/commander/adresse" className="px-4 py-2 bg-black text-white rounded-md">Suivant</Link>
      </div>
    </div>
  );
}
