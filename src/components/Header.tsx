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
    { href: '/home', label: 'Find Institution' },
    { href: '/contact', label: 'Contact' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050010]/90 dark:bg-[#050010]/90 light:bg-white/90 backdrop-blur-md border-b border-[#8A2BE2]/20 dark:border-[#8A2BE2]/20 light:border-slate-200/80 shadow-lg shadow-[#8A2BE2]/5 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3.5 group">
          <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-[#8A2BE2]/30 group-hover:border-[#8A2BE2] transition-colors shadow-md shadow-[#8A2BE2]/10">
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
              <span className="text-purple-400 font-mono">365</span>
            </span>
            <span className="text-xs font-mono tracking-wider text-slate-400 dark:text-slate-400 light:text-slate-500 uppercase -mt-0.5">Campus OS</span>
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
                    ? 'text-purple-300 dark:text-purple-300 light:text-purple-700 font-bold'
                    : 'text-slate-300 dark:text-slate-300 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-purple-600'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8A2BE2] rounded-full shadow-sm shadow-[#8A2BE2]" />
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
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-white dark:hover:text-white light:hover:text-slate-900 bg-white/5 dark:bg-white/5 light:bg-slate-100 border border-white/10 dark:border-white/10 light:border-slate-200 hover:border-purple-500/40 transition-all"
          >
            Sign In
          </Link>
          <Link
            href="/request-demo"
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#6C2BD9] to-[#8A2BE2] hover:brightness-110 transition-all shadow-md shadow-[#8A2BE2]/20 flex items-center gap-1.5 active:scale-95"
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
            className="p-2 rounded-xl bg-white/5 text-slate-300 hover:text-white border border-white/10"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed top-[68px] left-0 right-0 bg-[#050010]/95 dark:bg-[#050010]/95 light:bg-white/95 backdrop-blur-xl border-b border-[#8A2BE2]/20 p-6 shadow-2xl flex flex-col gap-4 z-50">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-xs font-semibold py-2 px-3 rounded-lg transition-colors ${
                  pathname === link.href
                    ? 'bg-[#8A2BE2]/10 text-purple-300 font-bold'
                    : 'text-slate-300 dark:text-slate-300 light:text-slate-700 hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
            <Link
              href="/login?fresh=1"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl border border-white/10 bg-white/5 text-slate-200 font-semibold text-xs"
            >
              Sign In
            </Link>
            <Link
              href="/request-demo"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl bg-gradient-to-r from-[#6C2BD9] to-[#8A2BE2] hover:brightness-110 text-white font-bold text-xs shadow-md shadow-[#8A2BE2]/20 flex items-center justify-center gap-2"
            >
              <span>Request Demo</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
