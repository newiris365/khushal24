export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-950 dark:bg-slate-950 light:bg-slate-50 text-slate-100 dark:text-slate-100 light:text-slate-900 flex flex-col items-center justify-center p-6 text-center transition-colors duration-300">
      <div className="relative w-14 h-14 mb-4">
        <div className="absolute inset-0 rounded-full border-4 border-indigo-500/20 animate-pulse" />
        <div className="absolute inset-0 rounded-full border-4 border-t-indigo-500 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
      </div>
      <p className="text-slate-400 text-sm font-medium tracking-wide animate-pulse">Loading IRIS 365...</p>
    </div>
  );
}
