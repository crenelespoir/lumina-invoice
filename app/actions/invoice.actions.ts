// Les actions serveur pour la gestion des factures
// Ces fonctions parlent directement à la base de données

"use server";

import { db } from "@/db";
import { invoices, invoiceItems, users, clients } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// Fonction pour récupérer ou créer l'utilisateur
async function getOrCreateUser() {
  const { userId: clerkId } = await auth();

  if (!clerkId) throw new Error("Utilisateur non connecté");

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, clerkId))
    .limit(1);

  if (existingUser.length > 0) return existingUser[0];

  const newUser = await db
    .insert(users)
    .values({ clerkId, email: "" })
    .returning();

  return newUser[0];
}

// Fonction pour générer le numéro de facture automatiquement
// Format : INV-2026-001
async function generateInvoiceNumber(userId: string) {
  // On compte combien de factures l'utilisateur a déjà
  const existingInvoices = await db
    .select()
    .from(invoices)
    .where(eq(invoices.userId, userId));

  const count = existingInvoices.length + 1;
  const year = new Date().getFullYear();

  // On formate le numéro avec des zéros devant (001, 002...)
  const number = String(count).padStart(3, "0");

  return `INV-${year}-${number}`;
}

// Type pour les lignes de service d'une facture
export type InvoiceItemInput = {
  description: string;
  quantity: number;
  unitPrice: number;
};

// Type pour la création d'une facture
export type CreateInvoiceInput = {
  clientId: string;
  currency: string;
  taxRate: number;
  dueAt: string;
  items: InvoiceItemInput[];
};

// Fonction pour créer une nouvelle facture
export async function createInvoice(data: CreateInvoiceInput) {
  const user = await getOrCreateUser();

  // On génère le numéro de facture
  const number = await generateInvoiceNumber(user.id);

  // On calcule les totaux
  const subtotal = data.items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );
  const taxAmount = (subtotal * data.taxRate) / 100;
  const total = subtotal + taxAmount;

  // On crée la facture dans la base de données
  const newInvoice = await db
    .insert(invoices)
    .values({
      userId: user.id,
      clientId: data.clientId,
      number,
      currency: data.currency,
      status: "DRAFT",
      taxRate: String(data.taxRate),
      subtotal: String(subtotal),
      taxAmount: String(taxAmount),
      total: String(total),
      dueAt: new Date(data.dueAt),
    })
    .returning();

  // On crée les lignes de service
  for (const item of data.items) {
    await db.insert(invoiceItems).values({
      invoiceId: newInvoice[0].id,
      description: item.description,
      quantity: item.quantity,
      unitPrice: String(item.unitPrice),
      lineTotal: String(item.quantity * item.unitPrice),
    });
  }

  revalidatePath("/dashboard/invoices");
  return newInvoice[0];
}

// Fonction pour récupérer toutes les factures de l'utilisateur
export async function getInvoices() {
  const user = await getOrCreateUser();

  // On récupère les factures avec les infos du client
  const allInvoices = await db
    .select({
      id: invoices.id,
      number: invoices.number,
      status: invoices.status,
      currency: invoices.currency,
      total: invoices.total,
      dueAt: invoices.dueAt,
      createdAt: invoices.createdAt,
      clientName: clients.name,
    })
    .from(invoices)
    .leftJoin(clients, eq(invoices.clientId, clients.id))
    .where(eq(invoices.userId, user.id));

  return allInvoices;
}

// Fonction pour changer le statut d'une facture
export async function updateInvoiceStatus(
  invoiceId: string,
  status: "DRAFT" | "PENDING" | "PAID" | "OVERDUE"
) {
  await db
    .update(invoices)
    .set({ status })
    .where(eq(invoices.id, invoiceId));

  revalidatePath("/dashboard/invoices");
}

// Fonction pour récupérer les statistiques du dashboard
export async function getDashboardStats() {
  const user = await getOrCreateUser();

  // On récupère toutes les factures de l'utilisateur
  const allInvoices = await db
    .select()
    .from(invoices)
    .where(eq(invoices.userId, user.id));

  // On calcule les statistiques
  const totalRevenue = allInvoices
    .filter((inv) => inv.status === "PAID")
    .reduce((sum, inv) => sum + Number(inv.total), 0);

  const totalPending = allInvoices
    .filter((inv) => inv.status === "PENDING")
    .reduce((sum, inv) => sum + Number(inv.total), 0);

  const totalOverdue = allInvoices
    .filter((inv) => inv.status === "OVERDUE")
    .reduce((sum, inv) => sum + Number(inv.total), 0);

  const totalInvoices = allInvoices.length;

  // On calcule les revenus par mois pour le graphique
  const monthlyData = Array.from({ length: 6 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (5 - i));
    const month = date.toLocaleString("fr-FR", { month: "short" });
    const year = date.getFullYear();
    const monthNum = date.getMonth();

    // On filtre les factures payées de ce mois
    const monthRevenue = allInvoices
      .filter((inv) => {
        if (inv.status !== "PAID" || !inv.createdAt) return false;
        const invDate = new Date(inv.createdAt);
        return (
          invDate.getMonth() === monthNum &&
          invDate.getFullYear() === year
        );
      })
      .reduce((sum, inv) => sum + Number(inv.total), 0);

    return { month, revenue: monthRevenue };
  });

  return {
    totalRevenue,
    totalPending,
    totalOverdue,
    totalInvoices,
    monthlyData,
  };
}