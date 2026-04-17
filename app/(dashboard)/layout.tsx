// Layout principal du dashboard — responsive

import Sidebar from "@/components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      {/* Sur desktop, on pousse le contenu à droite de la sidebar */}
      {/* Sur mobile, pas de marge car la sidebar est en overlay */}
      <main className="flex-1 md:ml-64">
        <div className="pt-14 md:pt-0 p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}