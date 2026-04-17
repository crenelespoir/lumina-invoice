// Page d'inscription
// Clerk fournit le composant SignUp qui gère tout automatiquement

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <SignUp forceRedirectUrl="/dashboard" />
    </div>
  );
}