'use client';

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface RevenueChartProps {
  revenueData: number[];
  usageData: number[];
}

export default function RevenueChart({ revenueData, usageData }: RevenueChartProps) {
  const labels = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Monthly Recurring Revenue ($)',
        data: revenueData,
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.15)',
        tension: 0.4,
        pointBackgroundColor: '#818cf8',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: { color: '#94a3b8', font: { family: 'Inter', size: 12 } },
      },
      tooltip: {
        backgroundColor: '#0f172a',
        titleColor: '#f8fafc',
        bodyColor: '#cbd5e1',
        borderColor: '#334155',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: { color: '#1e293b' },
        ticks: { color: '#64748b' },
      },
      y: {
        grid: { color: '#1e293b' },
        ticks: { color: '#64748b' },
      },
    },
  };

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl h-80">
      <h3 className="text-sm font-semibold text-slate-200 mb-4">Financial Growth Trajectory</h3>
      <div className="h-64">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
