export interface AnalyticsSummary {
  mrr: number;
  activeSubscriptions: number;
  churnRate: number;
  totalApiRequests: number;
  revenueTrend: number[];
  usageTrend: number[];
}

export interface UserSubscriptionInfo {
  id: string;
  email: string;
  role: 'ADMIN' | 'MEMBER';
  status: 'active' | 'canceled' | 'past_due' | 'none';
  planName: string;
  currentPeriodEnd?: string;
}
