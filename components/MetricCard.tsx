'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: LucideIcon;
}

export default function MetricCard({ title, value, change, isPositive, icon: Icon }: MetricCardProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</span>
        <div className="p-2.5 bg-indigo-600/10 border border-indigo-500/20 rounded-xl text-indigo-400">
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div>
        <div className="text-3xl font-extrabold text-slate-100">{value}</div>
        <div className="flex items-center space-x-1.5 mt-2">
          <span
            className={`text-xs font-bold px-2 py-0.5 rounded-full ${
              isPositive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
            }`}
          >
            {change}
          </span>
          <span className="text-xs text-slate-500">vs last month</span>
        </div>
      </div>
    </div>
  );
}
