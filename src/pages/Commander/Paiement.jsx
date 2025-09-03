// src/pages/Commander/Paiement.jsx
import { useContext, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "@/auth/AuthContext";
import { createOrder } from "@/lib/fakeApi";
import { readDraft, writeDraft } from "@/lib/orderDraft";

// === Config tarifs (adapte librement) ===
const VEHICLES = [
  { id: "citadine",       label: "Citadine",       add: 0  },
  { id: "berline_suv",    label: "Berline / SUV",  add: 5  },
  { id: "utilitaire_van", label: "Utilitaire / Van", add: 10 },
];

const SERVICES = [
  { id: "aspiration_simple", label: "Aspiration simple",  price: 20 },
  { id: "detailing",         label: "Detailing",          price: 40 },
  { id: "catastrophe",       label: "Catastrophe (vomi)", price: 80 },
];

const DETAIL_LEVELS = [
  { id: "sale",           label: "Sale",     add: 0  },
  { id: "sale_plus",      label: "Sale +",   add: 10 },
  { id: "sale_plus_plus", label: "Sale ++",  add: 20 },
];

const EXPRESS_FEE = 10;

export default function Paiement() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // --- states (préremplis depuis le draft) ---
  const [address, setAddress]     = useState("");
  const [vehicleId, setVehicleId] = useState(null);
  const [serviceId, setServiceId] = useState(null);
  const [detailId, setDetailId]   = useState(null);
  const [express, setExpress]     = useState(false);

  // on garde Date & Heure comme demandé
  const [date, setDate] = useState("");  // format YYYY-MM-DD
  const [time, setTime] = useState("");  // format HH:mm

  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  // --- préremplissage ---
  useEffect(() => {
    const d = readDraft();
    if (d.address) setAddress(d.address);
    if (d.vehicleId) setVehicleId(d.vehicleId);
    if (d.serviceId) setServiceId(d.serviceId);
    if (d.detailId) setDetailId(d.detailId);
    if (typeof d.express === "boolean") setExpress(d.express);
    if (d.date) setDate(d.date);
    if (d.time) setTime(d.time);
    if (d.note) setNote(d.note);
  }, []);

  // --- sauvegarde automatique du brouillon ---
  useEffect(() => {
    writeDraft({ address, vehicleId, serviceId, detailId, express, date, time, note });
  }, [address, vehicleId, serviceId, detailId, express, date, time, note]);

  const vehicle = useMemo(() => VEHICLES.find(v => v.id === vehicleId), [vehicleId]);
  const service = useMemo(() => SERVICES.find(s => s.id === serviceId), [serviceId]);
  const detail  = useMemo(() => DETAIL_LEVELS.find(l => l.id === detailId), [detailId]);

  // --- calcul du total ---
  const total = useMemo(() => {
    const base = service?.price ?? 0;
    const vAdd = vehicle?.add ?? 0;
    const dAdd = detail?.add ?? 0;
    const eAdd = express ? EXPRESS_FEE : 0;
    return base + vAdd + dAdd + eAdd;
  }, [vehicle, service, detail, express]);

  const canSubmit =
    address.trim() &&
    vehicle &&
    service &&
    detail &&
    date &&
    time;

  // --- submit ---
  const submit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    try {
      const startsAt = new Date(`${date}T${time}:00`);
      const payload = {
        userEmail: user?.email ?? "client@example.com",
        address: address.trim(),
        vehicleId,
        serviceId,
        detailId,
        express,
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

  // --- helpers UI cartes ---
  const cardCls = (active) =>
    [
      "rounded-2xl border p-4 text-left transition",
      active ? "border-black bg-black text-white shadow-lg"
             : "border-gray-200 bg-white hover:border-black/50",
    ].join(" ");

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-extrabold mb-2">Paiement</h1>
      <p className="text-gray-600 mb-6">
        Vérifie / ajuste tes informations, puis confirme ta commande.
      </p>

      <form onSubmit={submit} className="grid gap-6">

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

        {/* Véhicule (3 cartes) */}
        <section className="rounded-2xl border bg-white p-4">
          <h2 className="font-semibold mb-3">Véhicule</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {VEHICLES.map((v) => {
              const active = v.id === vehicleId;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setVehicleId(v.id)}
                  className={cardCls(active)}
                >
                  <div className="font-medium">{v.label}</div>
                  {!!v.add && (
                    <div className="text-sm text-gray-600">
                      {active ? "+ " : "+ "}{v.add} €
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* Service (3 cartes) */}
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
                  className={cardCls(active)}
                >
                  <div className="font-medium">{s.label}</div>
                  <div className="text-sm text-gray-600">{s.price} €</div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Détail (3 cartes) */}
        <section className="rounded-2xl border bg-white p-4">
          <h2 className="font-semibold mb-3">Détail</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {DETAIL_LEVELS.map((l) => {
              const active = l.id === detailId;
              return (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => setDetailId(l.id)}
                  className={cardCls(active)}
                >
                  <div className="font-medium">{l.label}</div>
                  {!!l.add && (
                    <div className="text-sm text-gray-600">+ {l.add} €</div>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* Express (checkbox) */}
        <section className="rounded-2xl border bg-white p-4">
          <label className="inline-flex items-center gap-2 select-none cursor-pointer">
            <input
              type="checkbox"
              className="h-4 w-4"
              checked={express}
              onChange={(e) => setExpress(e.target.checked)}
            />
            <span className="text-sm">Express (⚡ +{EXPRESS_FEE} €)</span>
          </label>
        </section>

        {/* Date & heure (conservée) */}
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

        {/* Infos complémentaires (conservée) */}
        <section className="rounded-2xl border bg-white p-4">
          <h2 className="font-semibold mb-3">Infos complémentaires</h2>
          <textarea
            rows={3}
            placeholder="Ajouter une note (code portail, couleur du véhicule, etc.)"
            className="w-full rounded-xl border px-3 py-2"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </section>

        {/* Récap prix + actions */}
        <section className="rounded-2xl border bg-white p-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {vehicle?.label ?? "—"} · {service?.label ?? "—"} · {detail?.label ?? "—"}
            {express ? " · Express" : ""} · {date || "—"} {time || ""}
          </div>
          <div className="text-xl font-bold">{total} €</div>
        </section>

        <div className="flex items-center justify-between">
          <Link to="/commander/date-heure" className="px-4 py-2 border rounded-md">
            Précédent
          </Link>
          <button
            type="submit"
            disabled={!canSubmit || loading}
            className="px-4 py-2 bg-black text-white rounded-md disabled:opacity-50"
          >
            {loading ? "Création…" : "Confirmer la commande"}
          </button>
        </div>
      </form>
    </main>
  );
}
