'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ThemeToggle from './ThemeToggle';
import { ShieldCheck, Mail, Globe, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 dark:bg-slate-950 light:bg-slate-100 text-slate-400 border-t border-slate-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-indigo-500/30">
                <Image
                  src="/icon-192.png"
                  alt="IRIS 365"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-heading font-extrabold text-2xl tracking-tight text-white dark:text-white light:text-slate-900">
                IRIS<span className="text-indigo-400 font-mono">365</span>
              </span>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The AI-Powered Campus Operating System. Unifying academic administration, student life, attendance
              telemetry, transit GPS, and institutional governance into a single enterprise workspace.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <ThemeToggle />
              <span className="text-xs text-slate-500 font-mono">Select Appearance Mode</span>
            </div>
          </div>

          {/* Navigation Column 1: Platform */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white dark:text-white light:text-slate-900 uppercase tracking-wider font-mono">
              Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-indigo-400 transition-colors">
                  Campus OS Overview
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-indigo-400 transition-colors">
                  Account Pricing & Plans
                </Link>
              </li>
              <li>
                <Link href="/home" className="hover:text-indigo-400 transition-colors">
                  Explore Institutions
                </Link>
              </li>
              <li>
                <Link href="/request-demo" className="hover:text-indigo-400 transition-colors">
                  Request Interactive Demo
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation Column 2: Solutions */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white dark:text-white light:text-slate-900 uppercase tracking-wider font-mono">
              Solutions
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-indigo-400 transition-colors">
                  Platform Architecture
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-indigo-400 transition-colors">
                  Enterprise Contact
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-indigo-400 transition-colors">
                  Campus Staff Sign In
                </Link>
              </li>
              <li>
                <Link href="/request-demo" className="hover:text-indigo-400 transition-colors">
                  Schedule Guided Demo
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation Column 3: Corporate */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white dark:text-white light:text-slate-900 uppercase tracking-wider font-mono">
              Company
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-indigo-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-indigo-400 transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-indigo-400 transition-colors">
                  Dashboard Sign In
                </Link>
              </li>
              <li>
                <a
                  href="mailto:contact@iris365.io"
                  className="hover:text-indigo-400 transition-colors flex items-center gap-1"
                >
                  <Mail className="w-3 h-3" /> contact@iris365.io
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>ISO 27001 & SOC-2 Compliant Campus Infrastructure</span>
          </div>

          <div>© {new Date().getFullYear()} IRIS 365 Inc. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
