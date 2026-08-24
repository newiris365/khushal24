import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 text-indigo-400 font-mono text-2xl font-bold">
        404
      </div>

      <h1 className="text-4xl font-extrabold tracking-tight text-white mb-3">Page Not Found</h1>
      <p className="text-slate-400 max-w-md mb-8 text-base leading-relaxed">
        The route or campus workspace resource you are looking for does not exist or has been relocated.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Link
          href="/"
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all shadow-lg shadow-indigo-600/25 active:scale-95"
        >
          Back to Home
        </Link>
        <Link
          href="/login"
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm transition-all border border-slate-700 active:scale-95"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}
