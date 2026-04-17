// Page de gestion des clients
// Design moderne avec cartes et avatar

import ClientForm from "@/components/client-form";
import { getClients } from "@/app/actions/client.actions";
import { Users } from "lucide-react";

// Couleurs des avatars selon la devise
const currencyColors: Record<string, string> = {
  USD: "bg-green-100 text-green-700",
  EUR: "bg-blue-100 text-blue-700",
  GBP: "bg-purple-100 text-purple-700",
  XOF: "bg-orange-100 text-orange-700",
  CAD: "bg-red-100 text-red-700",
};

export default async function ClientsPage() {
  const clients = await getClients();

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Clients</h1>
          <p className="text-slate-500 mt-1">Gérez votre répertoire de clients</p>
        </div>
        <ClientForm />
      </div>

      {/* Aucun client */}
      {clients.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center shadow-sm">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-lg font-semibold text-slate-700 mb-2">
            Aucun client pour le moment
          </h2>
          <p className="text-slate-400 text-sm">
            Ajoutez votre premier client pour commencer à créer des factures
          </p>
        </div>
      ) : (
        /* Grille de cartes clients */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {clients.map((client) => {
            // Initiales du client pour l'avatar
            const initials = client.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2);

            const colorClass = currencyColors[client.currency] || "bg-slate-100 text-slate-700";

            return (
              <div
                key={client.id}
                className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition"
              >
                {/* Avatar et nom */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                    {initials}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{client.name}</p>
                    <p className="text-sm text-slate-400">{client.email}</p>
                  </div>
                </div>

                {/* Infos */}
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-500">
                    {client.country || "—"}
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${colorClass}`}>
                    {client.currency}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}