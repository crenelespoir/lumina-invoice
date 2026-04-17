// Formulaire de configuration du profil entreprise
// Le freelance remplit ses infos qui apparaîtront sur ses factures PDF

"use client";

import { useState } from "react";
import { saveCompany } from "@/app/actions/company.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Le type du profil entreprise
type Company = {
  id: string;
  name: string;
  address: string | null;
  bankDetails: string | null;
  taxNumber: string | null;
} | null;

export default function CompanyForm({ company }: { company: Company }) {
  // On pré-remplit le formulaire si un profil existe déjà
  const [form, setForm] = useState({
    name: company?.name || "",
    address: company?.address || "",
    bankDetails: company?.bankDetails || "",
    taxNumber: company?.taxNumber || "",
  });

  // Message de confirmation après sauvegarde
  const [saved, setSaved] = useState(false);

  // Quand l'utilisateur tape dans un champ
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Soumettre le formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await saveCompany(form);

    // On affiche le message de confirmation
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">

      {/* Section — Informations de l'entreprise */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-6">
          Informations de l'entreprise
        </h2>

        <div className="flex flex-col gap-4">
          {/* Nom de l'entreprise */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="name">Nom de l'entreprise</Label>
            <Input
              id="name"
              name="name"
              placeholder="Ex: Marie Dev Studio"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Adresse */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="address">Adresse complète</Label>
            <Input
              id="address"
              name="address"
              placeholder="Ex: 12 rue des Palmiers, Cotonou, Bénin"
              value={form.address}
              onChange={handleChange}
            />
          </div>

          {/* Coordonnées bancaires */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="bankDetails">Coordonnées bancaires</Label>
            <Input
              id="bankDetails"
              name="bankDetails"
              placeholder="Ex: IBAN FR76 1234 5678 9012 3456 7890 123"
              value={form.bankDetails}
              onChange={handleChange}
            />
            <p className="text-xs text-slate-400">
              Ces informations apparaîtront sur vos factures PDF
            </p>
          </div>

          {/* Numéro fiscal */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="taxNumber">Numéro fiscal / SIRET</Label>
            <Input
              id="taxNumber"
              name="taxNumber"
              placeholder="Ex: 123 456 789 00012"
              value={form.taxNumber}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      {/* Bouton de sauvegarde */}
      <div className="flex items-center justify-end gap-4">
        {/* Message de confirmation */}
        {saved && (
          <p className="text-green-600 text-sm font-medium">
            ✅ Profil sauvegardé avec succès !
          </p>
        )}

        <Button type="submit" className="bg-slate-900 hover:bg-slate-700">
          Sauvegarder
        </Button>
      </div>
    </form>
  );
}