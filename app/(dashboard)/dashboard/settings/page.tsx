// Page des paramètres
// Le freelance configure les informations de son entreprise ici

import { getCompany } from "@/app/actions/company.actions";
import CompanyForm from "@/components/company-form";

export default async function SettingsPage() {
  // On récupère le profil entreprise existant s'il y en a un
  const company = await getCompany();

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Paramètres</h1>
        <p className="text-slate-500 mt-1">
          Configurez les informations de votre entreprise
        </p>
      </div>

      {/* Formulaire de profil entreprise */}
      <CompanyForm company={company} />
    </div>
  );
}