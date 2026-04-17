// Composant qui affiche la liste des factures
// Design moderne avec badges colorés et actions claires

"use client";

import Link from "next/link";
import { updateInvoiceStatus } from "@/app/actions/invoice.actions";
import { FileText, Plus } from "lucide-react";

// Configuration des statuts avec couleurs et labels
const statusConfig = {
  DRAFT: { label: "Brouillon", color: "bg-slate-100 text-slate-600 border-slate-200" },
  PENDING: { label: "En attente", color: "bg-yellow-50 text-yellow-700 border-yellow-200" },
  PAID: { label: "Payée", color: "bg-green-50 text-green-700 border-green-200" },
  OVERDUE: { label: "En retard", color: "bg-red-50 text-red-700 border-red-200" },
};

type Invoice = {
  id: string;
  number: string;
  status: "DRAFT" | "PENDING" | "PAID" | "OVERDUE";
  currency: string;
  total: string;
  dueAt: Date | null;
  createdAt: Date | null;
  clientName: string | null;
};

export default function InvoiceList({ invoices }: { invoices: Invoice[] }) {
  if (invoices.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center shadow-sm">
        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-lg font-semibold text-slate-700 mb-2">
          Aucune facture pour le moment
        </h2>
        <p className="text-slate-400 text-sm mb-6">
          Créez votre première facture en cliquant sur "Nouvelle facture"
        </p>
        <Link
          href="/dashboard/invoices/new"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          Nouvelle facture
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-100">
            <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wide">
              Numéro
            </th>
            <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wide">
              Client
            </th>
            <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wide">
              Statut
            </th>
            <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wide">
              Montant
            </th>
            <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wide">
              Échéance
            </th>
            <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wide">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {invoices.map((invoice) => {
            const status = statusConfig[invoice.status];
            return (
              <tr
                key={invoice.id}
                className="hover:bg-slate-50 transition group"
              >
                {/* Numéro de facture */}
                <td className="px-6 py-4">
                  <Link
                    href={`/dashboard/invoices/${invoice.id}`}
                    className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    {invoice.number}
                  </Link>
                </td>

                {/* Client */}
                <td className="px-6 py-4">
                  <span className="text-slate-700 font-medium">
                    {invoice.clientName}
                  </span>
                </td>

                {/* Badge statut */}
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${status.color}`}>
                    {status.label}
                  </span>
                </td>

                {/* Montant */}
                <td className="px-6 py-4">
                  <span className="font-semibold text-slate-900">
                    {Number(invoice.total).toFixed(2)}
                  </span>
                  <span className="text-slate-400 text-xs ml-1">
                    {invoice.currency}
                  </span>
                </td>

                {/* Échéance */}
                <td className="px-6 py-4 text-slate-500 text-sm">
                  {invoice.dueAt
                    ? new Date(invoice.dueAt).toLocaleDateString("fr-FR")
                    : "—"}
                </td>

                {/* Changer le statut */}
                <td className="px-6 py-4">
                  <select
                    value={invoice.status}
                    onChange={(e) =>
                      updateInvoiceStatus(
                        invoice.id,
                        e.target.value as "DRAFT" | "PENDING" | "PAID" | "OVERDUE"
                      )
                    }
                    className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 text-slate-600 bg-white hover:border-slate-300 transition"
                  >
                    <option value="DRAFT">Brouillon</option>
                    <option value="PENDING">En attente</option>
                    <option value="PAID">Payée</option>
                    <option value="OVERDUE">En retard</option>
                  </select>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}