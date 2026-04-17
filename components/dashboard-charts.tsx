// Composant graphique du dashboard
// Affiche les revenus des 6 derniers mois sous forme de graphique

"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type MonthlyData = {
  month: string;
  revenue: number;
};

export default function DashboardCharts({
  monthlyData,
}: {
  monthlyData: MonthlyData[];
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <h2 className="text-lg font-semibold text-slate-900 mb-6">
        Revenus des 6 derniers mois
      </h2>

      {/* Graphique en barres */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={monthlyData}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          {/* Grille de fond */}
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />

          {/* Axe des mois */}
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
          />

          {/* Axe des montants */}
          <YAxis
            tick={{ fontSize: 12, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
          />

          {/* Infobulle au survol */}
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "none",
              borderRadius: "8px",
              color: "#f8fafc",
              fontSize: "12px",
            }}
            formatter={(value) => {
              if (typeof value === "number") {
                return [`${value.toFixed(2)}`, "Revenus"];
              }
              return ["N/A", "Revenus"];
            }}
          />

          {/* Les barres du graphique */}
          <Bar
            dataKey="revenue"
            fill="#2e86c1"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}