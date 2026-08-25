'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/home', label: 'Explore Institutions' },
    { href: '/contact', label: 'Contact' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/90 dark:bg-slate-950/90 light:bg-white/90 backdrop-blur-md border-b border-slate-800/80 dark:border-slate-800/80 light:border-slate-200/80 shadow-lg shadow-black/5 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3.5 group">
          <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-indigo-500/30 group-hover:border-indigo-500 transition-colors shadow-md shadow-indigo-500/10">
            <Image
              src="/icon-192.png"
              alt="IRIS 365 Logo"
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-xl tracking-tight text-white dark:text-white light:text-slate-900 flex items-center gap-1">
              <span>IRIS</span>
              <span className="text-indigo-400 font-mono">365</span>
            </span>
            <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase -mt-1">Campus OS</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs font-semibold uppercase tracking-wider transition-colors relative py-1 ${
                  isActive
                    ? 'text-indigo-400 font-bold'
                    : 'text-slate-300 dark:text-slate-300 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-indigo-600'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded-full shadow-sm shadow-indigo-500" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Actions & Theme Toggle */}
        <div className="hidden lg:flex items-center gap-4">
          <ThemeToggle />
          <Link
            href="/login?fresh=1"
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-white dark:hover:text-white light:hover:text-slate-900 bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200 hover:border-slate-700 transition-all"
          >
            Sign In
          </Link>
          <Link
            href="/request-demo"
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-all shadow-md shadow-indigo-600/25 flex items-center gap-1.5 active:scale-95"
          >
            <span>Request Demo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Trigger */}
        <div className="flex items-center gap-3 lg:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-900/60 text-slate-300 hover:text-white border border-slate-800"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed top-[68px] left-0 right-0 bg-slate-950/95 dark:bg-slate-950/95 light:bg-white/95 backdrop-blur-xl border-b border-slate-800 p-6 shadow-2xl flex flex-col gap-4 z-50">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-semibold py-2 px-3 rounded-lg transition-colors ${
                  pathname === link.href
                    ? 'bg-indigo-600/10 text-indigo-400 font-bold'
                    : 'text-slate-300 dark:text-slate-300 light:text-slate-700 hover:bg-slate-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-4 border-t border-slate-800/80 flex flex-col gap-2.5">
            <Link
              href="/login?fresh=1"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-200 font-semibold text-xs"
            >
              Sign In to Dashboard
            </Link>
            <Link
              href="/request-demo"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/25 flex items-center justify-center gap-2"
            >
              <span>Request Interactive Demo</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
