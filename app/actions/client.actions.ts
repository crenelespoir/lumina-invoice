// Les actions serveur pour la gestion des clients
// Ces fonctions s'exécutent côté serveur et parlent directement à la base de données

"use server";

import { db } from "@/db";
import { clients, users } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// Fonction pour récupérer ou créer l'utilisateur dans notre base de données
// Clerk gère l'auth mais on a besoin de l'utilisateur dans notre propre DB
async function getOrCreateUser() {
  // On récupère l'ID Clerk de l'utilisateur connecté
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    throw new Error("Utilisateur non connecté");
  }

  // On cherche si l'utilisateur existe déjà dans notre DB
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, clerkId))
    .limit(1);

  // S'il existe déjà, on le retourne
  if (existingUser.length > 0) {
    return existingUser[0];
  }

  // Sinon on le crée
  const newUser = await db
    .insert(users)
    .values({
      clerkId,
      email: "", // On mettra l'email plus tard
    })
    .returning();

  return newUser[0];
}

// Fonction pour ajouter un nouveau client
export async function createClient(formData: {
  name: string;
  email: string;
  address: string;
  country: string;
  currency: string;
}) {
  // On récupère l'utilisateur connecté
  const user = await getOrCreateUser();

  // On insère le client dans la base de données
  await db.insert(clients).values({
    userId: user.id,
    name: formData.name,
    email: formData.email,
    address: formData.address,
    country: formData.country,
    currency: formData.currency,
  });

  // On rafraîchit la page clients pour afficher le nouveau client
  revalidatePath("/dashboard/clients");
}

// Fonction pour récupérer tous les clients de l'utilisateur connecté
export async function getClients() {
  const user = await getOrCreateUser();

  // On récupère tous les clients liés à cet utilisateur
  const allClients = await db
    .select()
    .from(clients)
    .where(eq(clients.userId, user.id));

  return allClients;
}