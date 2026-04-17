// Bouton de téléchargement du PDF
// Génère et télécharge la facture en PDF au clic

"use client";

import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import InvoicePDF from "@/components/invoice-pdf";
import { Button } from "@/components/ui/button";

type Props = {
  invoice: {
    number: string;
    currency: string;
    status: string;
    subtotal: string;
    taxRate: string;
    taxAmount: string;
    total: string;
    issuedAt: Date | null;
    dueAt: Date | null;
  };
  client: {
    name: string;
    email: string;
    address: string | null;
    country: string | null;
  };
  company: {
    name: string;
    address: string | null;
    bankDetails: string | null;
    taxNumber: string | null;
  };
  items: {
    description: string;
    quantity: number;
    unitPrice: string;
    lineTotal: string;
  }[];
};

export default function DownloadPDFButton({
  invoice,
  client,
  company,
  items,
}: Props) {
  // État de chargement pendant la génération du PDF
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);

    try {
      // On génère le PDF en mémoire
      const blob = await pdf(
        <InvoicePDF
          invoice={invoice}
          client={client}
          company={company}
          items={items}
        />
      ).toBlob();

      // On crée un lien de téléchargement temporaire
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${invoice.number}.pdf`;
      link.click();

      // On libère la mémoire
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erreur lors de la génération du PDF :", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={loading}
      className="bg-slate-900 hover:bg-slate-700"
    >
      {loading ? "Génération..." : "⬇ Télécharger PDF"}
    </Button>
  );
}