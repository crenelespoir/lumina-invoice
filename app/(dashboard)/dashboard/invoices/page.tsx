// Page de gestion des factures
// Affiche la liste des factures avec leur statut

import { getInvoices } from "@/app/actions/invoice.actions";
import InvoiceList from "@/components/invoice-list";
import Link from "next/link";

export default async function InvoicesPage() {
  // On récupère les factures depuis la base de données
  const invoices = await getInvoices();

  return (
    <div>
      {/* Header de la page */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Factures</h1>
          <p className="text-slate-500 mt-1">Gérez vos factures professionnelles</p>
        </div>

        {/* Bouton pour créer une nouvelle facture */}
        <Link
          href="/dashboard/invoices/new"
          className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition text-sm font-medium"
        >
          + Nouvelle facture
        </Link>
      </div>

      {/* Liste des factures */}
      <InvoiceList invoices={invoices} />
    </div>
  );

}