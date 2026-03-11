import { Tender } from '../api';
import { Link } from 'react-router-dom';

interface TenderTableProps {
  tenders: Tender[];
  showClosingDays?: boolean;
}

export default function TenderTable({ tenders, showClosingDays = false }: TenderTableProps) {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'N/A';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Works': 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
      'Goods': 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
      'Services': 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
      'Consultancy': 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
    };
    return colors[category] || 'bg-white/10 text-slate-300 border border-white/20';
  };

  return (
    <div className="glass rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/10">
          <thead className="bg-white/5 backdrop-blur-sm">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-widest border-b border-white/10">
                Tender Details
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-widest border-b border-white/10">
                Ministry
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-widest border-b border-white/10">
                Category
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-widest border-b border-white/10">
                Location
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-widest border-b border-white/10">
                Closing Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-widest border-b border-white/10">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 bg-transparent">
            {tenders.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-slate-400 font-medium tracking-wide">
                  No tenders found.
                </td>
              </tr>
            ) : (
              tenders.map((tender) => (
                <tr key={tender.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="max-w-md">
                      <div className="text-sm font-semibold text-white line-clamp-2 leading-relaxed">
                        {tender.title}
                      </div>
                      <div className="text-xs text-brand-blue mt-1.5 font-mono">
                        Ref: {tender.tender_ref_no}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-white">{tender.ministry}</div>
                    {tender.department && (
                      <div className="text-xs text-slate-400 mt-1">{tender.department}</div>
                    )}
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-2.5 py-1 text-[11px] uppercase tracking-wider font-bold rounded-lg ${getCategoryColor(tender.category)}`}>
                      {tender.category}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-sm text-slate-300 font-medium">
                    {tender.location}
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-white">{formatDate(tender.closing_date)}</div>
                    {showClosingDays && tender.days_until_closing !== undefined && (
                      <div className={`text-xs font-bold mt-1.5 px-2 py-0.5 inline-block rounded ${tender.days_until_closing <= 3 ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                        }`}>
                        {tender.days_until_closing === 0 ? 'Hurry! Closing Today' : `${tender.days_until_closing} days left`}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-5 text-sm">
                    <Link
                      to={`/tender/${tender.id}`}
                      className="text-cyan-400 hover:text-white font-semibold flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity"
                    >
                      View
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
