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
        <div className="flex justify-between items-center relative z-10 animate-[fade-in-down_1s_ease-out]">
          <div>
            <h1 className="text-4xl font-extrabold text-white">Closing Soon</h1>
            <p className="text-slate-400 mt-2 text-lg">
              Tenders with approaching <span className="text-orange-400 font-medium tracking-wide">deadlines</span>
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-white/5 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-md">
            <label className="text-sm font-semibold text-slate-300 uppercase tracking-widest">
              Closing in:
            </label>
            <select
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="px-3 py-1.5 bg-[#0f172a] border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-brand-blue outline-none transition-shadow"
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
          <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-xl relative z-10 animate-[fade-in-up_1s_ease-out_0.2s_both] shadow-lg shadow-orange-500/5 backdrop-blur-sm">
            <div className="flex items-center">
              <span className="flex h-3 w-3 relative mr-4 ml-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
              </span>
              <p className="text-sm text-orange-200">
                <strong className="text-orange-400 font-bold">{tenders.length} tenders</strong> closing within the next <strong className="text-orange-400 font-bold">{days} days</strong>. Act fast to submit your bids!
              </p>
            </div>
          </div>
        )}

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
          ) : tenders.length === 0 ? (
            <div className="glass-card p-12 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-slate-400">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">No tenders closing soon</h3>
              <p className="text-slate-400">
                There are no tenders closing within the next {days} days.
              </p>
            </div>
          ) : (
            <TenderTable tenders={tenders} showClosingDays={true} />
          )}
        </div>
      </div>
    </Layout>
  );
}
