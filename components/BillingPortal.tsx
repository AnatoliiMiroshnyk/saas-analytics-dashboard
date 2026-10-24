'use client';

import React, { useState } from 'react';
import { CreditCard, Check, Zap, ShieldCheck } from 'lucide-react';

export default function BillingPortal() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (priceId: string, planName: string) => {
    setLoading(priceId);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId, email: 'commander@devsync.io' }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error('Checkout failed:', err);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <CreditCard className="w-5 h-5 text-indigo-400" />
          <div>
            <h3 className="text-sm font-bold text-slate-200">Subscription & Billing Portal</h3>
            <p className="text-xs text-slate-400">Manage Stripe subscription tiers and webhook syncs</p>
          </div>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-3 py-1 rounded-full font-medium flex items-center space-x-1.5">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Active Pro Plan</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border border-slate-800 bg-slate-950/50 p-5 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-200">Growth Tier</span>
            <span className="text-lg font-extrabold text-indigo-400">$149<span className="text-xs text-slate-500">/mo</span></span>
          </div>
          <p className="text-xs text-slate-400">Ideal for scaling teams requiring high-frequency analytics & priority webhooks.</p>
          <button
            onClick={() => handleSubscribe('price_growth_tier', 'Growth Tier')}
            disabled={loading === 'price_growth_tier'}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 rounded-lg text-xs transition flex items-center justify-center space-x-2"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>{loading === 'price_growth_tier' ? 'Processing...' : 'Upgrade Plan'}</span>
          </button>
        </div>

        <div className="border border-slate-800 bg-slate-950/50 p-5 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-200">Enterprise Pro</span>
            <span className="text-lg font-extrabold text-cyan-400">$499<span className="text-xs text-slate-500">/mo</span></span>
          </div>
          <p className="text-xs text-slate-400">Dedicated database isolation, unlimited API throughput, and RBAC controls.</p>
          <button
            onClick={() => handleSubscribe('price_enterprise_pro', 'Enterprise Pro')}
            disabled={loading === 'price_enterprise_pro'}
            className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium py-2 rounded-lg text-xs transition border border-slate-700 flex items-center justify-center space-x-2"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>{loading === 'price_enterprise_pro' ? 'Processing...' : 'Contact Sales'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
