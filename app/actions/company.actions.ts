// Les actions serveur pour la gestion du profil entreprise
// Ces fonctions parlent directement à la base de données

"use server";

import { db } from "@/db";
import { companies, users } from "@/db/schema";
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

// Fonction pour récupérer le profil entreprise de l'utilisateur connecté
export async function getCompany() {
  const user = await getOrCreateUser();

  // On cherche le profil entreprise lié à cet utilisateur
  const company = await db
    .select()
    .from(companies)
    .where(eq(companies.userId, user.id))
    .limit(1);

  // On retourne le profil s'il existe, sinon null
  return company.length > 0 ? company[0] : null;
}

// Type pour les données du formulaire entreprise
export type CompanyInput = {
  name: string;
  address: string;
  bankDetails: string;
  taxNumber: string;
};

// Fonction pour sauvegarder ou mettre à jour le profil entreprise
export async function saveCompany(data: CompanyInput) {
  const user = await getOrCreateUser();

  // On vérifie si un profil existe déjà
  const existing = await db
    .select()
    .from(companies)
    .where(eq(companies.userId, user.id))
    .limit(1);

  if (existing.length > 0) {
    // Si le profil existe, on le met à jour
    await db
      .update(companies)
      .set({
        name: data.name,
        address: data.address,
        bankDetails: data.bankDetails,
        taxNumber: data.taxNumber,
        updatedAt: new Date(),
      })
      .where(eq(companies.userId, user.id));
  } else {
    // Sinon on en crée un nouveau
    await db.insert(companies).values({
      userId: user.id,
      name: data.name,
      address: data.address,
      bankDetails: data.bankDetails,
      taxNumber: data.taxNumber,
    });
  }

  revalidatePath("/dashboard/settings");
}