// Ce fichier crée la connexion entre notre app et la base de données Neon
// On l'importe partout où on a besoin de lire ou écrire des données

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// On récupère l'URL de connexion depuis les variables d'environnement
const sql = neon(process.env.DATABASE_URL!);

// On crée l'instance Drizzle qu'on va utiliser dans toute l'app
// "schema" permet à Drizzle de connaître la structure de nos tables
export const db = drizzle(sql, { schema });