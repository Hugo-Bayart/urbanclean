import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/auth/AuthContext";
import { createOrder } from "@/lib/fakeApi";

const SERVICES = [
  { id: "basic", label: "Basique", duration: 45, price: 20 },
  { id: "standard", label: "Standard", duration: 60, price: 30 },
  { id: "premium", label: "Premium", duration: 75, price: 40 },
];

const EXTRAS = [
  { id: "interior", label: "Intérieur", price: 10 },
  { id: "exterior", label: "Extérieur", price: 10 },
];

export default function Reservation() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [serviceId, setServiceId] = useState("standard");
  const [extras, setExtras] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const service = useMemo(
    () => SERVICES.find((s) => s.id === serviceId),
    [serviceId]
  );

  const total = useMemo(() => {
    const extraSum = extras.reduce((sum, id) => {
      const x = EXTRAS.find((e) => e.id === id);
      return sum + (x?.price ?? 0);
    }, 0);
    return (service?.price ?? 0) + extraSum;
  }, [service, extras]);

  const toggleExtra = (id) => {
    setExtras((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!address.trim()) return alert("Renseigne une adresse.");
    if (!date || !time) return alert("Choisis une date et une heure.");
    if (!service) return;

    setLoading(true);
    try {
      const startsAt = new Date(`${date}T${time}:00`);
      const payload = {
        userEmail: user?.email ?? "client@example.com",
        address: address.trim(),
        serviceId,
        serviceLabel: service.label,
        estimatedMinutes: service.duration,
        extras,
        note: note.trim() || null,
        startsAt: startsAt.toISOString(),
        price: total,
      };
      const order = await createOrder(payload);
      navigate("/orders?created=" + order.id, { replace: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-md md:max-w-2xl mx-auto p-4 md:p-6">
      <form onSubmit={submit} className="grid gap-5">
        {/* Adresse */}
        <section className="rounded-2xl border bg-white p-4">
          <label className="block text-sm font-medium mb-2">Adresse</label>
          <input
            type="text"
            placeholder="10 Rue de la Paix, Paris"
            className="w-full rounded-xl border px-3 py-2"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </section>

        {/* Services */}
        <section className="rounded-2xl border bg-white p-4">
          <h2 className="font-semibold mb-3">Service</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {SERVICES.map((s) => {
              const active = s.id === serviceId;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setServiceId(s.id)}
                  className={`rounded-xl border p-4 text-left hover:bg-gray-50 ${
                    active ? "border-black" : "border-gray-200"
                  }`}
                >
                  <div className="font-medium">{s.label}</div>
                  <div className="text-sm text-gray-600">
                    {s.duration} min · {s.price} €
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Extras */}
        <section className="rounded-2xl border bg-white p-4">
          <h2 className="font-semibold mb-3">Extras (optionnel)</h2>
          <div className="grid gap-2">
            {EXTRAS.map((x) => (
              <label key={x.id} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="h-4 w-4"
                  checked={extras.includes(x.id)}
                  onChange={() => toggleExtra(x.id)}
                />
                <span className="flex-1">{x.label}</span>
                <span className="text-sm text-gray-600">+{x.price} €</span>
              </label>
            ))}
          </div>
        </section>

        {/* Date & heure */}
        <section className="rounded-2xl border bg-white p-4 grid md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-2">Date</label>
            <input
              type="date"
              className="w-full rounded-xl border px-3 py-2"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Heure</label>
            <input
              type="time"
              className="w-full rounded-xl border px-3 py-2"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
        </section>

        {/* Note */}
        <section className="rounded-2xl border bg-white p-4">
          <h2 className="font-semibold mb-3">Infos complémentaires</h2>
          <textarea
            rows={3}
            placeholder="Ajouter une note pour le nettoyeur (code portail, couleur du véhicule, etc.)"
            className="w-full rounded-xl border px-3 py-2"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </section>

        {/* Récap */}
        <section className="rounded-2xl border bg-white p-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {service?.label} {extras.length ? `+ ${extras.length} extra(s)` : ""} —{" "}
            {service?.duration} min
          </div>
          <div className="text-xl font-bold">{total} €</div>
        </section>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-black text-white py-4 text-base font-semibold disabled:opacity-50"
        >
          {loading ? "Création…" : "Confirmer la commande"}
        </button>
      </form>
    </main>
  );
}
