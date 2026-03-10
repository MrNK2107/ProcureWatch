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
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tender Explorer</h1>
          <p className="text-gray-500 mt-1">
            Browse and search government procurement opportunities
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search tender title or reference..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setPage(0);
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ministry
                </label>
                <select
                  value={ministry}
                  onChange={(e) => {
                    setMinistry(e.target.value);
                    setPage(0);
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
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

            <div className="flex space-x-3">
              <button
                type="submit"
                className="px-4 py-2 bg-brand-blue text-white rounded-lg hover:bg-brand-hover font-medium"
              >
                Search
              </button>
              <button
                type="button"
                onClick={clearFilters}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
              >
                Clear Filters
              </button>
            </div>
          </form>
        </div>

        {/* Results Info */}
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Showing {page * limit + 1} to {Math.min((page + 1) * limit, total)} of {total} tenders
          </p>
        </div>

        {/* Tenders Table */}
        {loading ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="text-gray-500">Loading tenders...</div>
          </div>
        ) : error ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="text-red-500">{error}</div>
          </div>
        ) : (
          <TenderTable tenders={tenders} />
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center space-x-2">
            <button
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <div className="px-4 py-2 bg-white border border-gray-300 rounded-lg">
              Page {page + 1} of {totalPages}
            </div>
            <button
              onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
              disabled={page >= totalPages - 1}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}
