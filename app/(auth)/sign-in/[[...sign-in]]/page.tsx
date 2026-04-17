// Page de connexion
// Clerk fournit le composant SignIn qui gère tout automatiquement

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <SignIn forceRedirectUrl="/dashboard" />
    </div>
  );
}