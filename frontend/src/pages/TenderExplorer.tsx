import { useState, useEffect } from 'react';
import { tenderAPI, Tender } from '../api';
import Layout from '../components/Layout';
import TenderTable from '../components/TenderTable';

export default function TenderExplorer() {
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [ministry, setMinistry] = useState('');

  const [categories, setCategories] = useState<string[]>([]);
  const [ministries, setMinistries] = useState<string[]>([]);

  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const limit = 20;

  useEffect(() => {
    loadFilters();
  }, []);

  useEffect(() => {
    loadTenders();
  }, [search, category, ministry, page]);

  const loadFilters = async () => {
    try {
      const [cats, mins] = await Promise.all([
        tenderAPI.getDistinctCategories(),
        tenderAPI.getDistinctMinistries(),
      ]);
      setCategories(cats);
      setMinistries(mins);
    } catch (err) {
      console.error('Failed to load filters', err);
    }
  };

  const loadTenders = async () => {
    try {
      setLoading(true);
      const response = await tenderAPI.getTenders({
        limit,
        offset: page * limit,
        search: search || undefined,
        category: category || undefined,
        ministry: ministry || undefined,
      });
      setTenders(response.results);
      setTotal(response.total);
    } catch (err) {
      setError('Failed to load tenders');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(0);
    loadTenders();
  };

  const clearFilters = () => {
    setSearch('');
    setCategory('');
    setMinistry('');
    setPage(0);
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="relative z-10 animate-[fade-in-down_1s_ease-out]">
          <h1 className="text-4xl font-extrabold text-white">Tender Explorer</h1>
          <p className="text-slate-400 mt-2 text-lg">
            Browse and search <span className="text-brand-blue font-medium">government procurement opportunities</span>
          </p>
        </div>

        {/* Filters */}
        <div className="glass-card relative z-10 animate-[fade-in-up_1s_ease-out_0.2s_both]">
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-300 mb-2 tracking-wide uppercase">
                  Search
                </label>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search tender title or reference..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2 tracking-wide uppercase">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setPage(0);
                  }}
                  className="w-full px-4 py-3 bg-[#0f172a] border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all outline-none"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2 tracking-wide uppercase">
                  Ministry
                </label>
                <select
                  value={ministry}
                  onChange={(e) => {
                    setMinistry(e.target.value);
                    setPage(0);
                  }}
                  className="w-full px-4 py-3 bg-[#0f172a] border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all outline-none"
                >
                  <option value="">All Ministries</option>
                  {ministries.map((min) => (
                    <option key={min} value={min}>
                      {min}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex space-x-4 pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-brand-blue text-white rounded-xl hover:shadow-[0_0_20px_-5px_rgba(56,189,248,0.5)] font-semibold transition-all hover:-translate-y-0.5"
              >
                Search
              </button>
              <button
                type="button"
                onClick={clearFilters}
                className="px-6 py-2.5 bg-white/5 border border-white/10 text-slate-300 rounded-xl hover:bg-white/10 font-semibold transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </form>
        </div>

        {/* Results Info */}
        <div className="flex justify-between items-center relative z-10 animate-[fade-in-up_1s_ease-out_0.3s_both]">
          <p className="text-sm font-medium text-slate-400 bg-white/5 px-4 py-2 rounded-full border border-white/10 inline-block">
            Showing <strong className="text-white">{page * limit + 1}</strong> to <strong className="text-white">{Math.min((page + 1) * limit, total)}</strong> of <strong className="text-white">{total}</strong> tenders
          </p>
        </div>

        {/* Tenders Table */}
        <div className="relative z-10 animate-[fade-in-up_1s_ease-out_0.4s_both]">
          {loading ? (
            <div className="glass-card p-12 text-center">
              <div className="text-slate-400">Loading tenders...</div>
            </div>
          ) : error ? (
            <div className="glass-card border-red-500/30 p-12 text-center">
              <div className="text-red-400">{error}</div>
            </div>
          ) : (
            <TenderTable tenders={tenders} />
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center space-x-3 pt-6 relative z-10 animate-[fade-in-up_1s_ease-out_0.5s_both]">
            <button
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed font-medium text-white transition-colors"
            >
              Previous
            </button>
            <div className="px-5 py-2.5 bg-brand-blue/20 border border-brand-blue/30 rounded-xl font-medium text-brand-blue">
              Page {page + 1} of {totalPages}
            </div>
            <button
              onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
              disabled={page >= totalPages - 1}
              className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed font-medium text-white transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}
