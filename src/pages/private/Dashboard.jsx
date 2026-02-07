import { useState } from "react";
import { Layout } from "../../layout/Layout";

export const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const transactions = [
    {
      id: "#TXN-8902",
      customer: "James Miller",
      medicine: "Amoxicillin (500mg)",
      amount: "$45.00",
      status: "Completed",
      statusColor: "emerald",
    },
    {
      id: "#TXN-8901",
      customer: "Alice Thompson",
      medicine: "Lisinopril (10mg)",
      amount: "$22.50",
      status: "Pending",
      statusColor: "amber",
    },
    {
      id: "#TXN-8899",
      customer: "Robert Chen",
      medicine: "Metformin (500mg)",
      amount: "$12.00",
      status: "Completed",
      statusColor: "emerald",
    },
    {
      id: "#TXN-8898",
      customer: "Emily Davis",
      medicine: "Atorvastatin (20mg)",
      amount: "$68.40",
      status: "Cancelled",
      statusColor: "red",
    },
  ];

  const topMedicines = [
    { name: "Amoxicillin", units: 842, percentage: 85 },
    { name: "Lisinopril", units: 512, percentage: 60 },
    { name: "Metformin", units: 429, percentage: 45 },
    { name: "Atorvastatin", units: 310, percentage: 32 },
    { name: "Azithromycin", units: 245, percentage: 20 },
  ];

  const kpiCards = [
    {
      title: "Total Sales Today",
      value: "$1,240.00",
      icon: "payments",
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
      badge: "+12.5%",
      badgeColor: "emerald",
    },
    {
      title: "Low Stock Alerts",
      value: "8 Items",
      icon: "warning",
      iconBg: "bg-orange-500/10",
      iconColor: "text-orange-500",
      badge: "Action Required",
      badgeColor: "orange",
    },
    {
      title: "Pending Prescriptions",
      value: "14",
      icon: "prescriptions",
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-500",
      badge: "Active",
      badgeColor: "blue",
    },
    {
      title: "Monthly Revenue",
      value: "$5,820.00",
      icon: "insights",
      iconBg: "bg-purple-500/10",
      iconColor: "text-purple-500",
      badge: "-5%",
      badgeColor: "red",
    },
  ];

  // Helper para los colores de status
  const getStatusClasses = (color) => {
    const colors = {
      emerald:
        "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
      amber:
        "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
      red: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
    };
    return colors[color] || "";
  };

  // Helper para los badges de KPI
  const getBadgeClasses = (color) => {
    const colors = {
      emerald: "text-emerald-500 bg-emerald-500/10",
      orange: "text-orange-500 bg-orange-500/10",
      blue: "text-blue-500 bg-blue-500/10",
      red: "text-red-500 bg-red-500/10",
    };
    return colors[color] || "";
  };

  return (
    <Layout>
      {/* TopNavBar */}

      <div className="p-8 space-y-8">
        {/* Section Header */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Dashboard Overview
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Welcome back, here's what's happening today.
          </p>
        </div>

        {/* KPI Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiCards.map((card, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`p-2 ${card.iconBg} rounded-lg ${card.iconColor}`}
                >
                  <span className="material-symbols-outlined">{card.icon}</span>
                </span>
                <span
                  className={`text-xs font-bold px-2 py-1 rounded-full ${getBadgeClasses(card.badgeColor)}`}
                >
                  {card.badge}
                </span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                {card.title}
              </p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                {card.value}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Transactions Table */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Recent Transactions
              </h3>
              <button className="text-sm font-semibold text-primary hover:underline">
                View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Transaction ID</th>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Medicine</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {transactions.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-slate-100">
                        {transaction.id}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">
                        {transaction.customer}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">
                        {transaction.medicine}
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-slate-100">
                        {transaction.amount}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClasses(transaction.statusColor)}`}
                        >
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Selling Medicines Chart */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Top Selling Medicines
              </h3>
              <span className="material-symbols-outlined text-slate-400 cursor-pointer">
                more_vert
              </span>
            </div>
            <div className="flex-1 space-y-6">
              {topMedicines.map((medicine, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-900 dark:text-slate-100">
                      {medicine.name}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">
                      {medicine.units} Units
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full"
                      style={{
                        width: `${medicine.percentage}%`,
                        opacity: 1 - index * 0.15,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
              <span className="material-symbols-outlined text-base">info</span>
              <span>Data updated 5 mins ago</span>
            </div>
          </div>
        </div>

        {/* Footer/Bottom Actions */}
        <div className="flex gap-4">
          <div className="flex-1 bg-gradient-to-r from-emerald-500 to-primary p-6 rounded-xl flex items-center justify-between text-white shadow-lg shadow-emerald-500/20">
            <div>
              <h4 className="text-lg font-bold">Need to restock soon?</h4>
              <p className="text-white/80 text-sm">
                There are 8 items below the safety threshold. Review your
                inventory now.
              </p>
            </div>
            <button className="bg-white text-emerald-600 px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-emerald-50 transition-colors cursor-pointer">
              Manage Inventory
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};
