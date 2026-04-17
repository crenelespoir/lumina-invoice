// Ce fichier est le "gardien" de notre application
// Il vérifie si l'utilisateur est connecté avant d'accéder à une page

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// On définit les pages accessibles SANS être connecté
const isPublicRoute = createRouteMatcher([
  "/",           // Page d'accueil (landing page)
  "/sign-in(.*)", // Page de connexion
  "/sign-up(.*)", // Page d'inscription
]);

// Pour chaque requête, on vérifie si la page est publique ou protégée
export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    // Si la page est protégée et l'utilisateur n'est pas connecté
    // Clerk le redirige automatiquement vers la page de connexion
    await auth.protect();
  }
});

// On dit à Next.js sur quelles URLs ce middleware doit s'appliquer
export const config = {
  matcher: [
    // S'applique sur toutes les pages sauf les fichiers statiques (images, fonts...)
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // S'applique aussi sur toutes les routes API
    "/(api|trpc)(.*)",
  ],
}; 