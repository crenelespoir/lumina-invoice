// Page de détail d'une facture
// Affiche toutes les informations et permet de télécharger le PDF

import { db } from "@/db";
import { invoices, invoiceItems, clients, companies, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import DownloadPDFButton from "@/components/download-pdf-button";
import Link from "next/link";

// Les couleurs des statuts
const statusConfig = {
  DRAFT: { label: "Brouillon", color: "bg-slate-100 text-slate-700" },
  PENDING: { label: "En attente", color: "bg-yellow-100 text-yellow-700" },
  PAID: { label: "Payée", color: "bg-green-100 text-green-700" },
  OVERDUE: { label: "En retard", color: "bg-red-100 text-red-700" },
};

export default async function InvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { userId: clerkId } = await auth();

  // On récupère l'utilisateur connecté
  const user = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, clerkId!))
    .limit(1);

  if (!user.length) notFound();

  // On récupère la facture
  const invoice = await db
    .select()
    .from(invoices)
    .where(eq(invoices.id, id))
    .limit(1);

  if (!invoice.length) notFound();

  // On récupère les lignes de service
  const items = await db
    .select()
    .from(invoiceItems)
    .where(eq(invoiceItems.invoiceId, id));

  // On récupère le client
  const client = await db
    .select()
    .from(clients)
    .where(eq(clients.id, invoice[0].clientId))
    .limit(1);

  // On récupère le profil entreprise
  const company = await db
    .select()
    .from(companies)
    .where(eq(companies.userId, user[0].id))
    .limit(1);

  const inv = invoice[0];
  const cli = client[0];
  const comp = company[0];
  const status = statusConfig[inv.status];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link
            href="/dashboard/invoices"
            className="text-sm text-slate-500 hover:text-slate-700 mb-2 inline-block"
          >
            ← Retour aux factures
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">{inv.number}</h1>
          <span className={`px-2 py-1 rounded text-xs font-medium mt-2 inline-block ${status.color}`}>
            {status.label}
          </span>
        </div>

        {/* Bouton télécharger PDF */}
        {comp && (
          <DownloadPDFButton
            invoice={inv}
            client={cli}
            company={comp}
            items={items}
          />
        )}
      </div>

      {/* Informations générales */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Infos client */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">
            Client
          </h2>
          <p className="font-semibold text-slate-900">{cli?.name}</p>
          <p className="text-slate-600 text-sm mt-1">{cli?.email}</p>
          <p className="text-slate-600 text-sm">{cli?.address}</p>
          <p className="text-slate-600 text-sm">{cli?.country}</p>
        </div>

        {/* Dates et devise */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">
            Détails
          </h2>
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Date d'émission</span>
              <span className="font-medium">
                {inv.issuedAt
                  ? new Date(inv.issuedAt).toLocaleDateString("fr-FR")
                  : "—"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Date d'échéance</span>
              <span className="font-medium">
                {inv.dueAt
                  ? new Date(inv.dueAt).toLocaleDateString("fr-FR")
                  : "—"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Devise</span>
              <span className="font-medium">{inv.currency}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tableau des services */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-6">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Description</th>
              <th className="text-center px-6 py-4 text-sm font-semibold text-slate-600">Quantité</th>
              <th className="text-right px-6 py-4 text-sm font-semibold text-slate-600">Prix unitaire</th>
              <th className="text-right px-6 py-4 text-sm font-semibold text-slate-600">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-slate-100">
                <td className="px-6 py-4 text-slate-900">{item.description}</td>
                <td className="px-6 py-4 text-center text-slate-600">{item.quantity}</td>
                <td className="px-6 py-4 text-right text-slate-600">
                  {Number(item.unitPrice).toFixed(2)} {inv.currency}
                </td>
                <td className="px-6 py-4 text-right font-medium text-slate-900">
                  {Number(item.lineTotal).toFixed(2)} {inv.currency}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totaux */}
        <div className="p-6 border-t border-slate-200 flex flex-col items-end gap-2">
          <div className="flex gap-16 text-sm text-slate-600">
            <span>Sous-total HT</span>
            <span className="w-32 text-right font-medium">
              {Number(inv.subtotal).toFixed(2)} {inv.currency}
            </span>
          </div>
          <div className="flex gap-16 text-sm text-slate-600">
            <span>TVA ({inv.taxRate}%)</span>
            <span className="w-32 text-right font-medium">
              {Number(inv.taxAmount).toFixed(2)} {inv.currency}
            </span>
          </div>
          <div className="flex gap-16 text-lg font-bold text-slate-900 border-t border-slate-200 pt-3 mt-1">
            <span>Total TTC</span>
            <span className="w-32 text-right">
              {Number(inv.total).toFixed(2)} {inv.currency}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}