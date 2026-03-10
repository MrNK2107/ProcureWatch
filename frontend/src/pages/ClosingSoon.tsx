import { useState, useEffect } from 'react';
import { tenderAPI, Tender } from '../api';
import Layout from '../components/Layout';
import TenderTable from '../components/TenderTable';

export default function ClosingSoon() {
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [days, setDays] = useState(7);

  useEffect(() => {
    loadClosingSoon();
  }, [days]);

  const loadClosingSoon = async () => {
    try {
      setLoading(true);
      const response = await tenderAPI.getClosingSoon(days);
      setTenders(response.tenders);
    } catch (err) {
      setError('Failed to load tenders');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Closing Soon</h1>
            <p className="text-gray-500 mt-1">
              Tenders with approaching deadlines
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <label className="text-sm font-medium text-gray-700">
              Show tenders closing in:
            </label>
            <select
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue"
            >
              <option value={3}>3 days</option>
              <option value={7}>7 days</option>
              <option value={14}>14 days</option>
              <option value={30}>30 days</option>
            </select>
          </div>
        </div>

        {/* Alert Banner */}
        {tenders.length > 0 && (
          <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-lg">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-orange-400 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm text-orange-800">
                <strong>{tenders.length} tenders</strong> closing within the next {days} days. Act fast to submit your bids!
              </p>
            </div>
          </div>
        )}

        {/* Tenders Table */}
        {loading ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="text-gray-500">Loading tenders...</div>
          </div>
        ) : error ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="text-red-500">{error}</div>
          </div>
        ) : tenders.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <svg
              className="w-16 h-16 text-gray-300 mx-auto mb-4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tenders closing soon</h3>
            <p className="text-gray-500">
              There are no tenders closing within the next {days} days.
            </p>
          </div>
        ) : (
          <TenderTable tenders={tenders} showClosingDays={true} />
        )}
      </div>
    </Layout>
  );
}
