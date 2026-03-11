import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { tenderAPI, Tender } from '../api';
import Layout from '../components/Layout';

export default function TenderDetail() {
  const { id } = useParams<{ id: string }>();
  const [tender, setTender] = useState<Tender | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadTender();
    }
  }, [id]);

  const loadTender = async () => {
    try {
      setLoading(true);
      const data = await tenderAPI.getTender(Number(id));
      setTender(data);
    } catch (err) {
      setError('Failed to load tender details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'N/A';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading tender details...</div>
        </div>
      </Layout>
    );
  }

  if (error || !tender) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-md">
            <div className="text-red-400 mb-4 font-medium">{error || 'Tender not found'}</div>
            <Link to="/tenders" className="inline-block px-5 py-2 bg-brand-blue/20 text-cyan-400 border border-brand-blue/30 rounded-lg hover:bg-brand-blue/30 transition-colors">
              Back to Tenders
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-slate-500 font-medium">
          <Link to="/" className="hover:text-cyan-400 transition-colors">
            Dashboard
          </Link>
          <span className="text-slate-600">/</span>
          <Link to="/tenders" className="hover:text-cyan-400 transition-colors">
            Tenders
          </Link>
          <span className="text-slate-600">/</span>
          <span className="text-slate-300">{tender.tender_ref_no}</span>
        </div>

        {/* Tender Header */}
        <div className="glass-card mb-6 animate-[fade-in-up_1s_ease-out]">
          <div className="flex justify-between items-start flex-col md:flex-row gap-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-3 tracking-tight leading-snug">
                {tender.title}
              </h1>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-lg">
                <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Reference:</span>
                <span className="font-mono text-cyan-400">{tender.tender_ref_no}</span>
              </div>
            </div>
            <div className="shrink-0 flex items-center gap-3">
              <span className="px-4 py-1.5 rounded-full text-sm font-bold tracking-widest uppercase bg-brand-blue/20 text-cyan-400 border border-brand-blue/30 shadow-[0_0_20px_-5px_rgba(56,189,248,0.4)]">
                {tender.category}
              </span>
            </div>
          </div>
        </div>

        {/* Tender Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-[fade-in-up_1s_ease-out_0.2s_both]">
          {/* Organization Info */}
          <div className="glass-card">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
              <div className="h-10 w-10 rounded-lg bg-brand-blue/20 border border-brand-blue/30 flex items-center justify-center mr-4">
                <svg className="w-5 h-5 text-cyan-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              Organization
            </h2>
            <dl className="space-y-4">
              <div className="bg-white/[0.02] p-4 rounded-xl border border-white/[0.05]">
                <dt className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Ministry</dt>
                <dd className="text-sm font-medium text-white mt-1.5">{tender.ministry || 'N/A'}</dd>
              </div>
              <div className="bg-white/[0.02] p-4 rounded-xl border border-white/[0.05]">
                <dt className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Department</dt>
                <dd className="text-sm font-medium text-white mt-1.5">{tender.department || 'N/A'}</dd>
              </div>
              {tender.sub_department && (
                <div className="bg-white/[0.02] p-4 rounded-xl border border-white/[0.05]">
                  <dt className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Sub-Department</dt>
                  <dd className="text-sm font-medium text-white mt-1.5">{tender.sub_department}</dd>
                </div>
              )}
            </dl>
          </div>

          {/* Tender Info */}
          <div className="glass-card">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
              <div className="h-10 w-10 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mr-4">
                <svg className="w-5 h-5 text-purple-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              Tender Information
            </h2>
            <dl className="space-y-4">
              <div className="bg-white/[0.02] p-4 rounded-xl border border-white/[0.05]">
                <dt className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Type</dt>
                <dd className="text-sm font-medium text-white mt-1.5">{tender.tender_type || 'N/A'}</dd>
              </div>
              <div className="bg-white/[0.02] p-4 rounded-xl border border-white/[0.05]">
                <dt className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Category</dt>
                <dd className="text-sm font-medium text-white mt-1.5">{tender.category || 'N/A'}</dd>
              </div>
              <div className="bg-white/[0.02] p-4 rounded-xl border border-white/[0.05]">
                <dt className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Location</dt>
                <dd className="text-sm font-medium text-white mt-1.5">{tender.location || 'N/A'}</dd>
              </div>
            </dl>
          </div>

          {/* Important Dates */}
          <div className="glass-card lg:col-span-2">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
              <div className="h-10 w-10 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mr-4">
                <svg className="w-5 h-5 text-emerald-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              Important Dates
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/[0.02] px-6 py-5 rounded-2xl border border-white/[0.05]">
                <dt className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Published Date</dt>
                <dd className="text-xl font-bold text-white mt-2">
                  {formatDate(tender.published_date)}
                </dd>
              </div>
              <div className="bg-orange-500/10 px-6 py-5 rounded-2xl border border-orange-500/20 shadow-[0_0_15px_-3px_rgba(249,115,22,0.2)]">
                <dt className="text-xs font-semibold text-orange-400 uppercase tracking-widest">Closing Date</dt>
                <dd className="text-xl font-bold text-orange-300 mt-2">
                  {formatDate(tender.closing_date)}
                </dd>
              </div>
              <div className="bg-white/[0.02] px-6 py-5 rounded-2xl border border-white/[0.05]">
                <dt className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Opening Date</dt>
                <dd className="text-xl font-bold text-white mt-2">
                  {formatDate(tender.opening_date)}
                </dd>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-4 pt-4 animate-[fade-in-up_1s_ease-out_0.3s_both]">
          <Link
            to="/tenders"
            className="px-6 py-3 bg-white/5 border border-white/10 text-slate-300 rounded-xl hover:bg-white/10 font-semibold transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Tenders
          </Link>
          <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-brand-blue text-white rounded-xl hover:shadow-[0_0_20px_-5px_rgba(56,189,248,0.5)] font-semibold transition-all hover:-translate-y-0.5 flex items-center gap-2">
            View on Government Portal
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </button>
        </div>
      </div>
    </Layout>
  );
}
