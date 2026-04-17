// Ce fichier définit la structure de notre base de données
// Chaque "table" ici correspond à une table dans PostgreSQL sur Neon

import {
  pgTable,
  uuid,
  text,
  timestamp,
  numeric,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";

// Les 4 statuts possibles d'une facture
export const invoiceStatusEnum = pgEnum("invoice_status", [
  "DRAFT",    // Brouillon
  "PENDING",  // En attente de paiement
  "PAID",     // Payée
  "OVERDUE",  // En retard
]);

// Table des utilisateurs
// On stocke juste le lien avec Clerk ici
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  clerkId: text("clerk_id").notNull().unique(), // L'ID venant de Clerk
  email: text("email").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Table du profil entreprise du freelance
// Un seul profil par utilisateur
export const companies = pgTable("companies", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id), // Lié à un utilisateur
  name: text("name").notNull(),       // Nom de l'entreprise
  logoUrl: text("logo_url"),          // Logo (optionnel)
  address: text("address"),           // Adresse
  bankDetails: text("bank_details"),  // Coordonnées bancaires
  taxNumber: text("tax_number"),      // Numéro fiscal
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Table des clients du freelance
export const clients = pgTable("clients", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id), // Lié à un utilisateur
  name: text("name").notNull(),       // Nom du client
  email: text("email").notNull(),     // Email
  address: text("address"),           // Adresse
  country: text("country"),           // Pays
  currency: text("currency").notNull().default("USD"), // Devise par défaut
  createdAt: timestamp("created_at").defaultNow(),
});

// Table des factures
export const invoices = pgTable("invoices", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id),
  clientId: uuid("client_id").notNull().references(() => clients.id),
  number: text("number").notNull().unique(), // Ex: INV-2026-001
  currency: text("currency").notNull(),      // Devise de la facture
  status: invoiceStatusEnum("status").notNull().default("DRAFT"),
  taxRate: numeric("tax_rate", { precision: 5, scale: 2 }).notNull().default("0"), // Taux TVA en %
  subtotal: numeric("subtotal", { precision: 10, scale: 2 }).notNull().default("0"), // Total HT
  taxAmount: numeric("tax_amount", { precision: 10, scale: 2 }).notNull().default("0"), // Montant TVA
  total: numeric("total", { precision: 10, scale: 2 }).notNull().default("0"), // Total TTC
  issuedAt: timestamp("issued_at").defaultNow(),  // Date d'émission
  dueAt: timestamp("due_at"),                      // Date d'échéance
  createdAt: timestamp("created_at").defaultNow(),
});

// Table des lignes de service d'une facture
// Une facture peut avoir plusieurs lignes
export const invoiceItems = pgTable("invoice_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  invoiceId: uuid("invoice_id").notNull().references(() => invoices.id),
  description: text("description").notNull(), // Description du service
  quantity: integer("quantity").notNull(),     // Quantité
  unitPrice: numeric("unit_price", { precision: 10, scale: 2 }).notNull(), // Prix unitaire
  lineTotal: numeric("line_total", { precision: 10, scale: 2 }).notNull(), // Quantité × Prix unitaire
});