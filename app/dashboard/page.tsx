'use client';

import React, { useEffect, useState } from 'react';
import MetricCard from '@/components/MetricCard';
import RevenueChart from '@/components/RevenueChart';
import BillingPortal from '@/components/BillingPortal';
import { DollarSign, Users, TrendingUp, Activity, BarChart3, LayoutDashboard, Settings } from 'lucide-react';

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/analytics')
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error('Error fetching analytics:', err));
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 text-sm">
        Loading SaaS Analytics Engine...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* Navigation Sidebar */}
      <aside className="w-full md:w-64 border-r border-slate-800 bg-slate-900/60 p-6 flex flex-col justify-between">
        <div className="space-y-8">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-600/20 border border-indigo-500/30 rounded-xl text-indigo-400">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <span className="font-bold text-lg bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                MetricsPulse
              </span>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">SaaS Analytics</p>
            </div>
          </div>

          <nav className="space-y-1 text-sm font-medium">
            <a href="#" className="flex items-center space-x-3 bg-indigo-600/10 text-indigo-400 px-3.5 py-2.5 rounded-xl border border-indigo-500/20">
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview</span>
            </a>
            <a href="#" className="flex items-center space-x-3 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 px-3.5 py-2.5 rounded-xl transition">
              <Activity className="w-4 h-4" />
              <span>Usage Telemetry</span>
            </a>
            <a href="#" className="flex items-center space-x-3 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 px-3.5 py-2.5 rounded-xl transition">
              <Settings className="w-4 h-4" />
              <span>Settings & RBAC</span>
            </a>
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-800 text-xs text-slate-500">
          Role: <strong className="text-slate-300">ADMIN</strong> • Stripe Sync Active
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 space-y-8 overflow-y-auto">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Executive Revenue Dashboard</h1>
            <p className="text-xs text-slate-400">Real-time financial telemetry, API volume, and Stripe lifecycle reconciliation</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-xs text-slate-300 flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Stripe Webhooks Connected</span>
          </div>
        </header>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Monthly Recurring Revenue"
            value={`$${data.mrr.toLocaleString()}`}
            change="+14.2%"
            isPositive={true}
            icon={DollarSign}
          />
          <MetricCard
            title="Active Subscriptions"
            value={data.activeSubscriptions.toString()}
            change="+8.1%"
            isPositive={true}
            icon={Users}
          />
          <MetricCard
            title="Net Churn Rate"
            value={`${data.churnRate}%`}
            change="-0.4%"
            isPositive={true}
            icon={TrendingUp}
          />
          <MetricCard
            title="Total API Throughput"
            value={`${(data.totalApiRequests / 1000000).toFixed(2)}M`}
            change="+24.5%"
            isPositive={true}
            icon={Activity}
          />
        </div>

        {/* Charts & Billing */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueChart revenueData={data.revenueTrend} usageData={data.usageTrend} />
          <BillingPortal />
        </div>

        {/* Recent Transactions Table */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
          <h3 className="text-sm font-semibold text-slate-200">Recent Stripe Billing Events</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/60 text-slate-400 uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Plan</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {data.recentTransactions.map((tx: any) => (
                  <tr key={tx.id} className="hover:bg-slate-800/40 transition">
                    <td className="p-3 font-semibold text-slate-100">{tx.customer}</td>
                    <td className="p-3 text-slate-400">{tx.plan}</td>
                    <td className="p-3 font-bold text-emerald-400">{tx.amount}</td>
                    <td className="p-3">
                      <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-medium">
                        {tx.status}
                      </span>
                    </td>
                    <td className="p-3 text-slate-500">{tx.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
