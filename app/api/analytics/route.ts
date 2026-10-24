import { NextResponse } from 'next/server';

export async function GET() {
  const analyticsData = {
    mrr: 12450,
    activeSubscriptions: 342,
    churnRate: 2.1,
    totalApiRequests: 1845000,
    revenueTrend: [8200, 9100, 9800, 10500, 11200, 12450],
    usageTrend: [240000, 310000, 420000, 510000, 680000, 845000],
    recentTransactions: [
      { id: 'tx_1', customer: 'Acme Corp', plan: 'Enterprise Pro', amount: '$499.00', status: 'Paid', date: 'Just now' },
      { id: 'tx_2', customer: 'Nexus Labs', plan: 'Growth Tier', amount: '$149.00', status: 'Paid', date: '12 mins ago' },
      { id: 'tx_3', customer: 'Starlight Media', plan: 'Growth Tier', amount: '$149.00', status: 'Paid', date: '45 mins ago' },
      { id: 'tx_4', customer: 'Vortex Tech', plan: 'Starter Pack', amount: '$49.00', status: 'Paid', date: '2 hours ago' },
    ]
  };

  return NextResponse.json(analyticsData);
}
