// Formulaire d'ajout d'un nouveau client
// S'affiche dans une fenêtre modale quand on clique sur "Nouveau client"

"use client"; // Ce composant utilise des interactions — il s'exécute côté navigateur

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { createClient } from "@/app/actions/client.actions";

export default function ClientForm() {
  // On contrôle l'ouverture/fermeture de la modale
  const [open, setOpen] = useState(false);

  // Les valeurs du formulaire
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    country: "",
    currency: "USD",
  });

  // Quand l'utilisateur tape dans un champ, on met à jour le formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Quand l'utilisateur soumet le formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // On appelle l'action serveur pour sauvegarder le client
      await createClient(form);

      // On réinitialise le formulaire et on ferme la modale
      setForm({
        name: "",
        email: "",
        address: "",
        country: "",
        currency: "USD",
      });
      setOpen(false);
    } catch (error) {
      console.error("Erreur lors de la création du client :", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Bouton qui ouvre la modale */}
      <DialogTrigger asChild>
        <Button className="bg-slate-900 hover:bg-slate-700">
          + Nouveau client
        </Button>
      </DialogTrigger>

      {/* Contenu de la modale */}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Ajouter un client</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          {/* Nom du client */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="name">Nom</Label>
            <Input
              id="name"
              name="name"
              placeholder="Ex: Agence Dupont"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Ex: contact@agence.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Adresse */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="address">Adresse</Label>
            <Input
              id="address"
              name="address"
              placeholder="Ex: 12 rue de Paris"
              value={form.address}
              onChange={handleChange}
            />
          </div>

          {/* Pays */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="country">Pays</Label>
            <Input
              id="country"
              name="country"
              placeholder="Ex: France"
              value={form.country}
              onChange={handleChange}
            />
          </div>

          {/* Devise par défaut */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="currency">Devise par défaut</Label>
            <select
              id="currency"
              name="currency"
              value={form.currency}
              onChange={handleChange}
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm"
            >
              <option value="USD">USD — Dollar américain</option>
              <option value="EUR">EUR — Euro</option>
              <option value="GBP">GBP — Livre sterling</option>
              <option value="XOF">XOF — Franc CFA</option>
              <option value="CAD">CAD — Dollar canadien</option>
            </select>
          </div>

          {/* Boutons d'action */}
          <div className="flex justify-end gap-3 mt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Annuler
            </Button>
            <Button type="submit" className="bg-slate-900 hover:bg-slate-700">
              Ajouter le client
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}