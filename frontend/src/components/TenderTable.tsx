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
      'Works': 'bg-blue-100 text-blue-800',
      'Goods': 'bg-green-100 text-green-800',
      'Services': 'bg-purple-100 text-purple-800',
      'Consultancy': 'bg-orange-100 text-orange-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tender Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ministry
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Closing Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tenders.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                  No tenders found
                </td>
              </tr>
            ) : (
              tenders.map((tender) => (
                <tr key={tender.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="max-w-md">
                      <div className="text-sm font-medium text-gray-900 line-clamp-2">
                        {tender.title}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Ref: {tender.tender_ref_no}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{tender.ministry}</div>
                    {tender.department && (
                      <div className="text-xs text-gray-500">{tender.department}</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(tender.category)}`}>
                      {tender.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {tender.location}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{formatDate(tender.closing_date)}</div>
                    {showClosingDays && tender.days_until_closing !== undefined && (
                      <div className={`text-xs font-medium mt-1 ${
                        tender.days_until_closing <= 3 ? 'text-red-600' : 'text-orange-600'
                      }`}>
                        {tender.days_until_closing === 0 ? 'Today' : `${tender.days_until_closing} days left`}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <Link
                      to={`/tender/${tender.id}`}
                      className="text-brand-blue hover:text-brand-hover font-medium"
                    >
                      View Details
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
