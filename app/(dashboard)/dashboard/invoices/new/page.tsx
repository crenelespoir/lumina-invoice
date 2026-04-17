// Page de création d'une nouvelle facture
// Le freelance remplit les infos et ajoute ses lignes de service

import { getClients } from "@/app/actions/client.actions";
import NewInvoiceForm from "@/components/new-invoice-form";

export default async function NewInvoicePage() {
  // On récupère les clients pour le menu déroulant
  const allClients = await getClients();

  // On formate les clients pour le formulaire
  const clients = allClients.map((c) => ({
    id: c.id,
    name: c.name,
    currency: c.currency,
  }));

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Nouvelle facture</h1>
        <p className="text-slate-500 mt-1">
          Remplissez les informations pour créer une facture professionnelle
        </p>
      </div>

      {/* Formulaire de création */}
      <NewInvoiceForm clients={clients} />
    </div>
  );
}