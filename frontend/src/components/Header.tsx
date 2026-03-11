import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 glass border-b border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="bg-gradient-to-br from-brand-blue to-cyan-400 text-white p-2.5 rounded-xl shadow-lg shadow-brand-blue/20 group-hover:scale-105 transition-transform">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-white tracking-tight">ProcureWatch</h1>
                <p className="text-xs text-cyan-400 font-medium">Government Tender Intelligence</p>
              </div>
            </Link>
          </div>

          <nav className="flex space-x-2 bg-slate-800/50 p-1.5 rounded-xl border border-slate-700/50">
            <Link
              to="/dashboard"
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${isActive('/dashboard')
                  ? 'bg-brand-blue text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
            >
              Dashboard
            </Link>
            <Link
              to="/tenders"
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${isActive('/tenders')
                  ? 'bg-brand-blue text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
            >
              Tenders
            </Link>
            <Link
              to="/closing-soon"
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${isActive('/closing-soon')
                  ? 'bg-brand-blue text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
            >
              Closing Soon
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
