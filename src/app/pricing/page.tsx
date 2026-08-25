'use client';

import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import {
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Zap,
  Building2,
  Users,
  Calculator,
  Headset,
  Sparkles
} from 'lucide-react';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [accountCount, setAccountCount] = useState<number>(1500);

  // Calculate pricing based on account blocks of 500
  const accountBlocks = Math.max(1, Math.ceil(accountCount / 500));

  const getTier = (count: number) => {
    if (count > 10000) return 'enterprise';
    if (count > 2500) return 'scale';
    return 'growth';
  };

  const activeTier = getTier(accountCount);

  // Base rate per 500-user block
  const getRatePerBlock = (tier: string) => {
    if (tier === 'enterprise') return 79;
    if (tier === 'scale') return 89;
    return 99; // growth
  };

  const currentRatePerBlock = getRatePerBlock(activeTier);
  const monthlyCost = accountBlocks * currentRatePerBlock;
  const annualTotalCost = Math.round(monthlyCost * 12 * 0.8); // 20% discount
  const annualMonthlyEquiv = Math.round(annualTotalCost / 12);

  const sharedFeatures = [
    'Complete Campus OS (All 40+ Role Workspaces)',
    'Unlimited AI Concierge & Chat Assistant Queries',
    'Realtime GPS Bus & Transit Telemetry',
    'RFID / QR Gate Security & Attendance Engine',
    'Automated NAAC, NBA, and AISHE Compliance Reports',
    'Hostel, Canteen Wallet & Gym Pass Management',
    'Parent Portal & WhatsApp API Communication Engine',
    'Native Mobile iOS & Android App Access'
  ];

  return (
    <div className="min-h-screen bg-slate-950 dark:bg-slate-950 light:bg-slate-50 text-slate-100 dark:text-slate-100 light:text-slate-900 transition-colors duration-300 font-sans">
      <Header />

      {/* Hero Header */}
      <section className="pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono text-xs uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          Transparent Account-Based Pricing
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white dark:text-white light:text-slate-900 max-w-4xl mx-auto leading-tight">
          One Platform. Every Feature. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-400 to-indigo-300">
            Scale Only by Account Count.
          </span>
        </h1>

        <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          No feature gating or hidden add-on costs. Every IRIS 365 plan includes the complete Campus Operating System
          suite for your entire institution.
        </p>

        {/* Monthly / Annual Billing Toggle */}
        <div className="pt-6 flex items-center justify-center gap-4">
          <span
            className={`text-xs font-semibold uppercase tracking-wider ${billingCycle === 'monthly' ? 'text-white dark:text-white light:text-slate-900 font-bold' : 'text-slate-400'}`}
          >
            Monthly Billing
          </span>

          <button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
            className="w-14 h-8 rounded-full bg-slate-800 dark:bg-slate-800 light:bg-slate-200 p-1 relative border border-slate-700 dark:border-slate-700 light:border-slate-300 transition-all focus:outline-none"
            aria-label="Toggle Billing Cycle"
          >
            <div
              className={`w-6 h-6 rounded-full bg-indigo-500 shadow-md transition-transform transform ${
                billingCycle === 'annual' ? 'translate-x-6 bg-indigo-400' : 'translate-x-0'
              }`}
            />
          </button>

          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-semibold uppercase tracking-wider ${billingCycle === 'annual' ? 'text-white dark:text-white light:text-slate-900 font-bold' : 'text-slate-400'}`}
            >
              Annual Billing
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-bold uppercase">
              Save 20%
            </span>
          </div>
        </div>
      </section>

      {/* Tier Cards Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* Growth Tier */}
          <div className="rounded-3xl border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-900/50 dark:bg-slate-900/50 light:bg-white p-8 flex flex-col justify-between shadow-xl space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-white dark:text-white light:text-slate-900">Growth</h3>
                <span className="px-3 py-1 rounded-full bg-slate-800 dark:bg-slate-800 light:bg-slate-100 text-slate-300 dark:text-slate-300 light:text-slate-700 text-xs font-mono">
                  500 – 2,500 Accounts
                </span>
              </div>

              <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed">
                Ideal for growing colleges and single-campus institutions requiring automated core operations.
              </p>

              <div className="pt-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-white dark:text-white light:text-slate-900 font-mono">
                    ${billingCycle === 'annual' ? '79' : '99'}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">/ month per 500 accounts</span>
                </div>
                {billingCycle === 'annual' && (
                  <span className="text-[11px] text-emerald-400 font-mono block mt-1">
                    Billed annually ($950/yr per 500 accounts)
                  </span>
                )}
              </div>

              <div className="pt-4 border-t border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-2.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-bold block">
                  Support & SLA
                </span>
                <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-700 font-medium">
                  Standard Email & Ticket Support (24h SLA)
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                  Features Included
                </span>
                {sharedFeatures.slice(0, 5).map((f, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-xs text-slate-300 dark:text-slate-300 light:text-slate-700"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/request-demo?tier=growth"
              className="w-full py-3 rounded-xl bg-slate-800 dark:bg-slate-800 light:bg-slate-200 hover:bg-slate-700 dark:hover:bg-slate-700 light:hover:bg-slate-300 text-white dark:text-white light:text-slate-900 font-bold text-xs text-center transition-all border border-slate-700 dark:border-slate-700 light:border-slate-300 block"
            >
              Get Started with Growth
            </Link>
          </div>

          {/* Scale Tier (Featured) */}
          <div className="rounded-3xl border-2 border-indigo-500 bg-slate-900/90 dark:bg-slate-900/90 light:bg-white p-8 flex flex-col justify-between shadow-2xl shadow-indigo-500/10 relative space-y-6">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-indigo-600 text-white font-mono text-[10px] uppercase font-extrabold tracking-widest shadow-md">
              Most Popular Choice
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-white dark:text-white light:text-slate-900">Scale</h3>
                <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-mono font-bold">
                  2,500 – 10,000 Accounts
                </span>
              </div>

              <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed">
                Designed for multi-department colleges and universities scaling telemetry and live operations.
              </p>

              <div className="pt-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-white dark:text-white light:text-slate-900 font-mono">
                    ${billingCycle === 'annual' ? '71' : '89'}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">/ month per 500 accounts</span>
                </div>
                {billingCycle === 'annual' && (
                  <span className="text-[11px] text-emerald-400 font-mono block mt-1">
                    Billed annually ($850/yr per 500 accounts)
                  </span>
                )}
              </div>

              <div className="pt-4 border-t border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-2.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-bold block">
                  Support & SLA
                </span>
                <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-700 font-medium">
                  Priority 24/7 Support & Dedicated Onboarding Specialist (4h SLA)
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                  Features Included
                </span>
                {sharedFeatures.map((f, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-xs text-slate-300 dark:text-slate-300 light:text-slate-700"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/request-demo?tier=scale"
              className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs text-center transition-all shadow-lg shadow-indigo-600/25 block active:scale-95"
            >
              Get Started with Scale
            </Link>
          </div>

          {/* Enterprise Tier */}
          <div className="rounded-3xl border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-900/50 dark:bg-slate-900/50 light:bg-white p-8 flex flex-col justify-between shadow-xl space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-white dark:text-white light:text-slate-900">Enterprise</h3>
                <span className="px-3 py-1 rounded-full bg-slate-800 dark:bg-slate-800 light:bg-slate-100 text-slate-300 dark:text-slate-300 light:text-slate-700 text-xs font-mono">
                  10,000+ Accounts
                </span>
              </div>

              <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed">
                For large multi-campus university systems requiring custom SLAs, dedicated infrastructure, and hardware
                integration.
              </p>

              <div className="pt-2">
                <span className="text-3xl font-extrabold text-white dark:text-white light:text-slate-900 font-mono block">
                  Custom Contract
                </span>
                <span className="text-xs text-slate-400 font-mono">Tailored pricing & volume discounts</span>
              </div>

              <div className="pt-4 border-t border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-2.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-bold block">
                  Support & SLA
                </span>
                <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-700 font-medium">
                  Dedicated Account Manager, Custom Hardware Integration & Guaranteed 99.99% Uptime SLA
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                  Features Included
                </span>
                {sharedFeatures.map((f, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-xs text-slate-300 dark:text-slate-300 light:text-slate-700"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/contact?type=enterprise"
              className="w-full py-3.5 rounded-xl bg-slate-800 dark:bg-slate-800 light:bg-slate-200 hover:bg-slate-700 text-white dark:text-white light:text-slate-900 font-bold text-xs text-center transition-all border border-slate-700 block"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Account Calculator Section */}
      <section className="bg-slate-900/60 dark:bg-slate-900/60 light:bg-white border-y border-slate-800 dark:border-slate-800 light:border-slate-200 py-20 px-6 md:px-12">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 font-mono text-xs uppercase font-bold">
              <Calculator className="w-4 h-4" />
              Interactive Price Calculator
            </div>
            <h2 className="text-3xl font-extrabold text-white dark:text-white light:text-slate-900 tracking-tight">
              Estimate Your Institution's Exact Investment
            </h2>
            <p className="text-xs text-slate-400 max-w-lg mx-auto">
              Select your total combined active user accounts (students + faculty & staff) to calculate your exact rate.
            </p>
          </div>

          {/* Calculator Control Panel */}
          <div className="p-8 rounded-3xl bg-slate-950 dark:bg-slate-950 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 shadow-2xl space-y-8">
            {/* Account Count Slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-300 dark:text-slate-300 light:text-slate-700 uppercase tracking-wider font-mono">
                  Total Active Accounts (Students + Staff)
                </label>
                <span className="text-2xl font-extrabold text-indigo-400 font-mono">
                  {accountCount.toLocaleString()} <span className="text-xs text-slate-400 font-normal">accounts</span>
                </span>
              </div>

              <input
                type="range"
                min="500"
                max="15000"
                step="500"
                value={accountCount}
                onChange={(e) => setAccountCount(parseInt(e.target.value))}
                className="w-full h-3 rounded-lg bg-slate-800 accent-indigo-500 cursor-pointer"
              />

              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>500 Accounts</span>
                <span>2,500 Accounts (Growth)</span>
                <span>10,000 Accounts (Scale)</span>
                <span>15,000+ Accounts (Enterprise)</span>
              </div>
            </div>

            {/* Calculated Breakdown Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-800 dark:border-slate-800 light:border-slate-200">
              <div className="p-5 rounded-2xl bg-slate-900/60 dark:bg-slate-900/60 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Recommended Tier</span>
                <span className="text-lg font-bold text-white dark:text-white light:text-slate-900 uppercase font-mono">
                  {activeTier} Tier
                </span>
                <span className="text-[11px] text-slate-400 block font-mono">{accountBlocks} × 500-account blocks</span>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/60 dark:bg-slate-900/60 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Monthly Total Rate</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-white dark:text-white light:text-slate-900 font-mono">
                    ${billingCycle === 'annual' ? annualMonthlyEquiv.toLocaleString() : monthlyCost.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">/ mo</span>
                </div>
                {billingCycle === 'annual' && (
                  <span className="text-[10px] text-slate-500 line-through font-mono">
                    ${monthlyCost.toLocaleString()} / mo standard
                  </span>
                )}
              </div>

              <div className="p-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 space-y-1">
                <span className="text-[10px] font-mono text-indigo-400 uppercase block font-bold">
                  Annual Total Investment
                </span>
                <span className="text-2xl font-bold text-indigo-300 font-mono">
                  ${(annualMonthlyEquiv * 12).toLocaleString()}
                </span>
                <span className="text-[10px] text-emerald-400 font-mono block">
                  Includes 20% annual billing discount
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>30-Day Money-Back Guarantee. No Long-Term Lock-in.</span>
              </div>

              <Link
                href={`/request-demo?accounts=${accountCount}&tier=${activeTier}&cycle=${billingCycle}`}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs tracking-wide shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2"
              >
                <span>Request Custom Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
