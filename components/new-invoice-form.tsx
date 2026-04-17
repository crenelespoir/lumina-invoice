// Formulaire de création d'une nouvelle facture
// Permet d'ajouter des lignes de service, calculer les totaux et soumettre

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createInvoice, InvoiceItemInput } from "@/app/actions/invoice.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Le type d'un client simplifié
type Client = {
  id: string;
  name: string;
  currency: string;
};

export default function NewInvoiceForm({ clients }: { clients: Client[] }) {
  const router = useRouter();

  // Informations générales de la facture
  const [clientId, setClientId] = useState(clients?.[0]?.id || "");
  const [currency, setCurrency] = useState(clients?.[0]?.currency || "USD");
  const [taxRate, setTaxRate] = useState(0);
  const [dueAt, setDueAt] = useState("");

  // Les lignes de service de la facture
  const [items, setItems] = useState<InvoiceItemInput[]>([
    { description: "", quantity: 1, unitPrice: 0 },
  ]);

  // Quand le client change, on met à jour la devise automatiquement
  const handleClientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = clients.find((c) => c.id === e.target.value);
    setClientId(e.target.value);
    if (selected) setCurrency(selected.currency);
  };

  // Mettre à jour une ligne de service
  const handleItemChange = (
    index: number,
    field: keyof InvoiceItemInput,
    value: string | number
  ) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  };

  // Ajouter une nouvelle ligne de service vide
  const addItem = () => {
    setItems([...items, { description: "", quantity: 1, unitPrice: 0 }]);
  };

  // Supprimer une ligne de service
  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  // Calculer le sous-total HT
  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );

  // Calculer le montant de la TVA
  const taxAmount = (subtotal * taxRate) / 100;

  // Calculer le total TTC
  const total = subtotal + taxAmount;

  // Soumettre le formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await createInvoice({
      clientId,
      currency,
      taxRate,
      dueAt,
      items,
    });

    // On redirige vers la liste des factures
    router.push("/dashboard/invoices");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">

      {/* Section 1 — Informations générales */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Informations générales
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {/* Sélection du client */}
          <div className="flex flex-col gap-1">
            <Label>Client</Label>
            <select
              value={clientId}
              onChange={handleClientChange}
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm"
              required
            >
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>

          {/* Devise */}
          <div className="flex flex-col gap-1">
            <Label>Devise</Label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm"
            >
              <option value="USD">USD — Dollar américain</option>
              <option value="EUR">EUR — Euro</option>
              <option value="GBP">GBP — Livre sterling</option>
              <option value="XOF">XOF — Franc CFA</option>
              <option value="CAD">CAD — Dollar canadien</option>
            </select>
          </div>

          {/* Taux de TVA */}
          <div className="flex flex-col gap-1">
            <Label>Taux TVA (%)</Label>
            <Input
              type="number"
              min="0"
              max="100"
              value={taxRate}
              onChange={(e) => setTaxRate(Number(e.target.value))}
              placeholder="Ex: 20"
            />
          </div>

          {/* Date d'échéance */}
          <div className="flex flex-col gap-1">
            <Label>Date d'échéance</Label>
            <Input
              type="date"
              value={dueAt}
              onChange={(e) => setDueAt(e.target.value)}
              required
            />
          </div>
        </div>
      </div>

      {/* Section 2 — Lignes de service */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Services
        </h2>

        <div className="flex flex-col gap-3">
          {/* En-têtes des colonnes */}
          <div className="grid grid-cols-12 gap-3 text-sm font-medium text-slate-500">
            <span className="col-span-6">Description</span>
            <span className="col-span-2">Quantité</span>
            <span className="col-span-2">Prix unitaire</span>
            <span className="col-span-1">Total</span>
            <span className="col-span-1"></span>
          </div>

          {/* Les lignes de service */}
          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-12 gap-3 items-center">
              {/* Description */}
              <div className="col-span-6">
                <Input
                  placeholder="Ex: Développement frontend"
                  value={item.description}
                  onChange={(e) =>
                    handleItemChange(index, "description", e.target.value)
                  }
                  required
                />
              </div>

              {/* Quantité */}
              <div className="col-span-2">
                <Input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(index, "quantity", Number(e.target.value))
                  }
                />
              </div>

              {/* Prix unitaire */}
              <div className="col-span-2">
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.unitPrice}
                  onChange={(e) =>
                    handleItemChange(index, "unitPrice", Number(e.target.value))
                  }
                />
              </div>

              {/* Total de la ligne */}
              <div className="col-span-1 text-sm font-medium text-slate-700">
                {(item.quantity * item.unitPrice).toFixed(2)}
              </div>

              {/* Bouton supprimer la ligne */}
              <div className="col-span-1">
                {items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="text-red-400 hover:text-red-600 text-lg"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Bouton ajouter une ligne */}
          <button
            type="button"
            onClick={addItem}
            className="text-sm text-slate-500 hover:text-slate-700 text-left mt-2"
          >
            + Ajouter une ligne
          </button>
        </div>
      </div>

      {/* Section 3 — Totaux */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex flex-col gap-2 items-end">
          {/* Sous-total HT */}
          <div className="flex gap-8 text-sm text-slate-600">
            <span>Sous-total HT</span>
            <span className="font-medium w-28 text-right">
              {subtotal.toFixed(2)} {currency}
            </span>
          </div>

          {/* TVA */}
          <div className="flex gap-8 text-sm text-slate-600">
            <span>TVA ({taxRate}%)</span>
            <span className="font-medium w-28 text-right">
              {taxAmount.toFixed(2)} {currency}
            </span>
          </div>

          {/* Total TTC */}
          <div className="flex gap-8 text-lg font-bold text-slate-900 border-t border-slate-200 pt-2 mt-2">
            <span>Total TTC</span>
            <span className="w-28 text-right">
              {total.toFixed(2)} {currency}
            </span>
          </div>
        </div>
      </div>

      {/* Boutons d'action */}
      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/dashboard/invoices")}
        >
          Annuler
        </Button>
        <Button type="submit" className="bg-slate-900 hover:bg-slate-700">
          Créer la facture
        </Button>
      </div>
    </form>
  );
}