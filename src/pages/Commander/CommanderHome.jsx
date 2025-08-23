import { Link } from "react-router-dom";
import Stepper from "../../components/Stepper";

export default function CommanderHome() {
  return (
    <div className="mx-auto max-w-5xl p-4">
      <Stepper step={1} />
      <h1 className="text-2xl font-bold mb-2">Commander un lavage</h1>
      <p className="text-gray-600 mb-6">Page d’accueil du parcours. Ajoutez votre UI ici.</p>
      <div className="flex gap-2">
        <Link to="/commander/vehicule" className="px-4 py-2 bg-black text-white rounded-md">Commencer</Link>
      </div>
    </div>
  );
}
