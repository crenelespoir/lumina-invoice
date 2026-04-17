// Ce fichier configure Drizzle ORM
// Il indique où se trouve le schéma et comment se connecter à la base de données

import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

// On charge les variables d'environnement depuis .env.local
dotenv.config({ path: ".env.local" });

export default {
  // Où se trouve notre schéma (la structure de la base de données)
  schema: "./db/schema.ts",

  // Où Drizzle va stocker les fichiers de migration
  out: "./db/migrations",

  // On utilise PostgreSQL comme base de données
  dialect: "postgresql",

  // L'URL de connexion à Neon
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;