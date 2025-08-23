import { Link } from "react-router-dom";
import Stepper from "../../components/Stepper";

export default function Confirmation() {
  return (
    <div className="mx-auto max-w-5xl p-4">
      <Stepper step={7} />
      <h1 className="text-2xl font-bold mb-2">Confirmation</h1>
      <p className="text-gray-600 mb-6">Commande confirmée. Placeholder (récap & numéro de commande).</p>
      <Link to="/historique" className="px-4 py-2 bg-black text-white rounded-md">Voir mon historique</Link>
    </div>
  );
}
