// Page principale du dashboard
// Affiche les statistiques et graphiques de l'activité du freelance

import { getDashboardStats } from "@/app/actions/invoice.actions";
import DashboardCharts from "@/components/dashboard-charts";
import { TrendingUp, Clock, AlertCircle, FileText } from "lucide-react";

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Tableau de bord</h1>
        <p className="text-slate-500 mt-1">Vue d'ensemble de votre activité</p>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-4 gap-4 mb-8">

        {/* Revenus totaux */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-slate-500">Revenus totaux</p>
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900">
            {stats.totalRevenue.toFixed(2)}
          </p>
          <p className="text-xs text-green-600 mt-2 font-medium">
            ↑ Factures payées
          </p>
        </div>

        {/* En attente */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-slate-500">En attente</p>
            <div className="w-10 h-10 bg-yellow-50 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-yellow-600">
            {stats.totalPending.toFixed(2)}
          </p>
          <p className="text-xs text-slate-400 mt-2 font-medium">
            À recevoir
          </p>
        </div>

        {/* En retard */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-slate-500">En retard</p>
            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-red-600">
            {stats.totalOverdue.toFixed(2)}
          </p>
          <p className="text-xs text-slate-400 mt-2 font-medium">
            Impayées
          </p>
        </div>

        {/* Total factures */}
        <div className="bg-blue-600 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-blue-200">Total factures</p>
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">
            {stats.totalInvoices}
          </p>
          <p className="text-xs text-blue-200 mt-2 font-medium">
            Toutes périodes
          </p>
        </div>

      </div>

      {/* Graphique */}
      <DashboardCharts monthlyData={stats.monthlyData} />
    </div>
  );
}