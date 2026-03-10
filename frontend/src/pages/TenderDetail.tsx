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
          <div className="text-center">
            <div className="text-red-500 mb-4">{error || 'Tender not found'}</div>
            <Link to="/tenders" className="text-brand-blue hover:text-brand-hover">
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
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-brand-blue">
            Dashboard
          </Link>
          <span>/</span>
          <Link to="/tenders" className="hover:text-brand-blue">
            Tenders
          </Link>
          <span>/</span>
          <span className="text-gray-900">{tender.tender_ref_no}</span>
        </div>

        {/* Tender Header */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {tender.title}
              </h1>
              <p className="text-sm text-gray-500">
                Reference: <span className="font-mono">{tender.tender_ref_no}</span>
              </p>
            </div>
            <div className="ml-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-slate-100 text-brand-blue">
                {tender.category}
              </span>
            </div>
          </div>
        </div>

        {/* Tender Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Organization Info */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-brand-blue" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Organization
            </h2>
            <dl className="space-y-3">
              <div>
                <dt className="text-sm font-medium text-gray-500">Ministry</dt>
                <dd className="text-sm text-gray-900 mt-1">{tender.ministry || 'N/A'}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Department</dt>
                <dd className="text-sm text-gray-900 mt-1">{tender.department || 'N/A'}</dd>
              </div>
              {tender.sub_department && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Sub-Department</dt>
                  <dd className="text-sm text-gray-900 mt-1">{tender.sub_department}</dd>
                </div>
              )}
            </dl>
          </div>

          {/* Tender Info */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-brand-blue" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Tender Information
            </h2>
            <dl className="space-y-3">
              <div>
                <dt className="text-sm font-medium text-gray-500">Type</dt>
                <dd className="text-sm text-gray-900 mt-1">{tender.tender_type || 'N/A'}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Category</dt>
                <dd className="text-sm text-gray-900 mt-1">{tender.category || 'N/A'}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Location</dt>
                <dd className="text-sm text-gray-900 mt-1">{tender.location || 'N/A'}</dd>
              </div>
            </dl>
          </div>

          {/* Important Dates */}
          <div className="bg-white rounded-lg shadow-sm p-6 lg:col-span-2">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-brand-blue" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Important Dates
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <dt className="text-sm font-medium text-gray-500">Published Date</dt>
                <dd className="text-lg font-semibold text-gray-900 mt-2">
                  {formatDate(tender.published_date)}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Closing Date</dt>
                <dd className="text-lg font-semibold text-orange-600 mt-2">
                  {formatDate(tender.closing_date)}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Opening Date</dt>
                <dd className="text-lg font-semibold text-gray-900 mt-2">
                  {formatDate(tender.opening_date)}
                </dd>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-4">
          <Link
            to="/tenders"
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
          >
            Back to Tenders
          </Link>
          <button className="px-6 py-3 bg-brand-blue text-white rounded-lg hover:bg-brand-hover font-medium">
            View on Government Portal
          </button>
        </div>
      </div>
    </Layout>
  );
}
