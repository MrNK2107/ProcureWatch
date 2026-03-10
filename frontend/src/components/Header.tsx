import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-brand-blue text-white p-2 rounded-lg">
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
                <h1 className="text-2xl font-bold text-gray-900">ProcureWatch</h1>
                <p className="text-xs text-gray-500">Government Tender Intelligence</p>
              </div>
            </Link>
          </div>

          <nav className="flex space-x-1">
            <Link
              to="/dashboard"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/dashboard')
                  ? 'bg-slate-100 text-brand-hover'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/tenders"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/tenders')
                  ? 'bg-slate-100 text-brand-hover'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Tenders
            </Link>
            <Link
              to="/closing-soon"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/closing-soon')
                  ? 'bg-slate-100 text-brand-hover'
                  : 'text-gray-600 hover:bg-gray-100'
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
