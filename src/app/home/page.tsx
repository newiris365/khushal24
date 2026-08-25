'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Search,
  MapPin,
  GraduationCap,
  School,
  Building2,
  ChevronRight,
  Sparkles,
  Filter,
  AlertCircle
} from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

interface Institution {
  id: string;
  name: string;
  type: string;
  institute_type: string;
  city: string;
  state: string;
  logo_url?: string;
  address?: string;
}

type TabType = 'all' | 'college' | 'school';

// ──────────────────────────────────────────────────────────────────────────────
// Skeleton card shown while loading
// ──────────────────────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-[#13102A]/60 border border-white/10 rounded-2xl p-5 animate-pulse">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-14 h-14 rounded-xl bg-white/5 shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-white/5 rounded w-3/4" />
          <div className="h-3 bg-white/5 rounded w-1/2" />
        </div>
      </div>
      <div className="h-3 bg-white/5 rounded w-full mb-2" />
      <div className="h-8 bg-white/5 rounded-xl mt-4" />
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Institution card
// ──────────────────────────────────────────────────────────────────────────────
function InstitutionCard({ inst }: { inst: Institution }) {
  const router = useRouter();
  const isSchool = inst.institute_type === 'school';

  return (
    <div className="group bg-[#13102A]/60 border border-white/10 hover:border-[#6C2BD9]/50 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:shadow-[#6C2BD9]/10">
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        {/* Logo / Fallback */}
        <div className="w-14 h-14 rounded-xl bg-[#1E1A3A] border border-white/10 flex items-center justify-center shrink-0 overflow-hidden">
          {inst.logo_url ? (
            <Image
              src={inst.logo_url}
              alt={inst.name}
              width={56}
              height={56}
              className="w-full h-full object-contain p-1"
            />
          ) : (
            <span className="text-2xl">{isSchool ? '🏫' : '🏛️'}</span>
          )}
        </div>

        {/* Name + Type */}
        <div className="flex-1 min-w-0">
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border mb-1.5 ${
              isSchool
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                : 'bg-violet-500/10 border-violet-500/20 text-violet-400'
            }`}
          >
            {isSchool ? <School className="w-3 h-3" /> : <GraduationCap className="w-3 h-3" />}
            {isSchool ? 'School' : 'College / University'}
          </span>
          <h3 className="text-sm font-bold text-white leading-snug line-clamp-2 group-hover:text-[#A78BFA] transition-colors">
            {inst.name}
          </h3>
        </div>
      </div>

      {/* City / State */}
      {(inst.city || inst.state) && (
        <p className="flex items-center gap-1.5 text-xs text-[#C4B5FD]/60 mb-4">
          <MapPin className="w-3.5 h-3.5 shrink-0 text-[#6C2BD9]" />
          {[inst.city, inst.state].filter(Boolean).join(', ')}
        </p>
      )}

      {/* Actions */}
      <div className="flex gap-2 mt-auto pt-2 border-t border-white/5">
        <Link
          href={`/institutions/${inst.id}`}
          className="flex-1 py-2 px-3 text-center text-[11px] font-semibold rounded-xl border border-white/10 hover:border-[#6C2BD9]/40 bg-white/5 hover:bg-[#6C2BD9]/10 text-[#C4B5FD] hover:text-white transition-all"
        >
          View Details
        </Link>
        <button
          id={`apply-btn-${inst.id}`}
          onClick={() => router.push(`/admissions/${inst.id}/apply`)}
          className="flex-1 py-2 px-3 text-[11px] font-bold rounded-xl bg-gradient-to-r from-[#6C2BD9] to-[#8B5CF6] hover:brightness-110 text-white transition-all flex items-center justify-center gap-1.5 shadow-sm shadow-[#6C2BD9]/20"
        >
          Apply Now
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Main Page
// ──────────────────────────────────────────────────────────────────────────────
export default function ApplicantHomePage() {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [allCities, setAllCities] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [selectedCity, setSelectedCity] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch institutions from the public API
  const fetchInstitutions = useCallback(async (type: TabType) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (type !== 'all') params.set('type', type);
      const res = await fetch(`/api/institutions/public?${params.toString()}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to load institutions');
      setInstitutions(json.institutions || []);
      setAllCities(json.cities || []);
    } catch (err: any) {
      setError(err.message || 'Could not load institutions. Please try again.');
      setInstitutions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInstitutions(activeTab);
  }, [activeTab, fetchInstitutions]);

  // Client-side city + search filter (applied on top of the type-filtered server result)
  const filtered = institutions.filter((inst) => {
    const matchesCity = !selectedCity || inst.city?.toLowerCase() === selectedCity.toLowerCase();
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      inst.name.toLowerCase().includes(q) ||
      inst.city?.toLowerCase().includes(q) ||
      inst.state?.toLowerCase().includes(q);
    return matchesCity && matchesSearch;
  });

  const tabs: { key: TabType; label: string; icon: React.ReactNode }[] = [
    { key: 'all', label: 'All', icon: <Building2 className="w-3.5 h-3.5" /> },
    { key: 'college', label: 'Colleges & Universities', icon: <GraduationCap className="w-3.5 h-3.5" /> },
    { key: 'school', label: 'Schools', icon: <School className="w-3.5 h-3.5" /> }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Header />
      {/* Background effects */}
      <div className="fixed top-0 left-1/4 w-[700px] h-[700px] bg-[#6C2BD9]/8 rounded-full blur-[160px] pointer-events-none" />
      <div className="fixed top-1/2 right-0 w-[500px] h-[500px] bg-[#8B5CF6]/5 rounded-full blur-[180px] pointer-events-none" />

      {/* ── Hero ── */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-28 md:pt-36 pb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6C2BD9]/20 border border-[#6C2BD9]/40 text-[#A78BFA] text-[11px] font-mono mb-6 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          Admissions 2026–27 Now Open
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-transparent dark:bg-gradient-to-r dark:from-white dark:via-[#E0E7FF] dark:to-[#A78BFA] dark:bg-clip-text leading-tight mb-4">
          Find Your Institution,
          <br />
          Start Your Journey
        </h1>
        <p className="text-slate-600 dark:text-[#C4B5FD]/60 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          Browse colleges and schools, explore programmes, and apply directly — all in one place.
        </p>
      </section>

      {/* ── Filters ── */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-6">
        <div className="bg-white dark:bg-[#13102A]/80 border border-slate-200 dark:border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center shadow-md dark:shadow-none">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6C2BD9]" />
            <input
              id="institution-search"
              type="text"
              placeholder="Search by name, city or state…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-100 dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/30 outline-none focus:border-[#6C2BD9]/60 transition-colors"
            />
          </div>

          {/* City select */}
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#6C2BD9]" />
            <select
              id="city-filter"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="pl-8 pr-8 py-2.5 bg-slate-100 dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-xl text-sm text-slate-900 dark:text-white outline-none focus:border-[#6C2BD9]/60 transition-colors appearance-none cursor-pointer min-w-[160px]"
            >
              <option value="">All Cities</option>
              {allCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Type tabs */}
          <div className="flex rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 shrink-0">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                id={`tab-${tab.key}`}
                onClick={() => {
                  setActiveTab(tab.key);
                  setSelectedCity('');
                  setSearchQuery('');
                }}
                className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold transition-all ${
                  activeTab === tab.key
                    ? 'bg-[#6C2BD9] text-white'
                    : 'bg-slate-100 dark:bg-black/20 text-slate-600 dark:text-[#C4B5FD]/60 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/5'
                }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Results ── */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        {/* Count row */}
        {!loading && !error && (
          <div className="flex items-center gap-2 mb-5 text-xs text-slate-500 dark:text-[#C4B5FD]/50">
            <Filter className="w-3.5 h-3.5" />
            <span>
              {filtered.length === 0
                ? 'No institutions found'
                : `${filtered.length} institution${filtered.length !== 1 ? 's' : ''} found`}
              {selectedCity ? ` in ${selectedCity}` : ''}
            </span>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="flex flex-col items-center gap-3 py-20 text-center">
            <AlertCircle className="w-10 h-10 text-red-400" />
            <p className="text-sm text-red-400 font-semibold">{error}</p>
            <button
              onClick={() => fetchInstitutions(activeTab)}
              className="mt-2 px-5 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-bold text-white hover:bg-white/10 transition-all"
            >
              Retry
            </button>
          </div>
        )}

        {/* Loading skeletons */}
        {loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && filtered.length === 0 && (
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl">
              🏛️
            </div>
            <p className="text-sm text-slate-600 dark:text-[#C4B5FD]/60 max-w-xs">
              No institutions are listed here yet.
              {searchQuery || selectedCity ? ' Try clearing your filters.' : ' Check back soon.'}
            </p>
            {(searchQuery || selectedCity) && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCity('');
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-900 dark:text-white transition-all"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}

        {/* Institution cards grid */}
        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((inst) => (
              <InstitutionCard key={inst.id} inst={inst} />
            ))}
          </div>
        )}
      </section>

      {/* ── Footer ── */}
      <Footer />
    </div>
  );
}
