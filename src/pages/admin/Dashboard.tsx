import { useState, useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
import {
  usersApi,
  websitesApi,
  changeRequestsApi,
  invoicesApi,
} from "../../api/mockApi";
import { Card } from "../../components/ui";
import { Users, Globe, FileText, DollarSign } from "lucide-react";

export function AdminDashboard() {
  const [stats, setStats] = useState({
    totalClients: 0,
    totalWebsites: 0,
    pendingRequests: 0,
    unpaidInvoices: 0,
  });
  const { token } = useAuthStore();

  useEffect(() => {
    if (!token) return;

    const loadStats = async () => {
      try {
        const [clients, websites, requests, invoices] = await Promise.all([
          usersApi.getAll(token),
          websitesApi.getAll(token),
          changeRequestsApi.getAll(token),
          invoicesApi.getAll(token),
        ]);

        setStats({
          totalClients: clients.length,
          totalWebsites: websites.length,
          pendingRequests: requests.filter((r) => r.status === "Pending")
            .length,
          unpaidInvoices: invoices.filter(
            (i) => i.status !== "Paid" && i.status !== "Draft"
          ).length,
        });
      } catch (error) {
        console.error("Failed to load stats:", error);
      }
    };

    loadStats();
  }, [token]);

  const statCards = [
    {
      label: "Total Clients",
      value: stats.totalClients,
      icon: Users,
      color: "bg-blue-500",
    },
    {
      label: "Total Websites",
      value: stats.totalWebsites,
      icon: Globe,
      color: "bg-green-500",
    },
    {
      label: "Pending Requests",
      value: stats.pendingRequests,
      icon: FileText,
      color: "bg-yellow-500",
    },
    {
      label: "Unpaid Invoices",
      value: stats.unpaidInvoices,
      icon: DollarSign,
      color: "bg-red-500",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-zinc-600">Overview of your platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-zinc-900">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
