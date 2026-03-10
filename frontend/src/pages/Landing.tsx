import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8 bg-slate-50">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-primary-900 sm:text-6xl">
              Public Procurement <span className="text-brand-blue">Intelligence</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-primary-600">
              Transforming raw government tender data into actionable intelligence. 
              ProcureWatch provides transparency and seamless discovery for vendors, researchers, 
              and civic analysts tracking public spending.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/dashboard"
                className="rounded-md bg-brand-blue px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
              >
                Go to Dashboard
              </Link>
              <Link to="/tenders" className="text-sm font-semibold leading-6 text-primary-900">
                Browse Tenders <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Section */}
      <div className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-brand-blue">Civic Tech Platform</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-primary-900 sm:text-4xl">
              Everything you need to track public tenders
            </p>
            <p className="mt-6 text-lg leading-8 text-primary-600">
              Navigate seamlessly through Central Public Procurement data. Discover opportunities relevant to your sector.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {/* Feature 1 */}
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-primary-900">
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-brand-blue">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                    </svg>
                  </div>
                  Real-time Analytics
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-primary-600">
                  <p className="flex-auto">Interactive dashboards presenting visual insights across Ministries, Categories, and Geographies.</p>
                </dd>
              </div>
              {/* Feature 2 */}
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-primary-900">
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-brand-blue">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75A6 6 0 1115.75 3a6 6 0 010 12zM15.75 15.75l-4.5 4.5" />
                    </svg>
                  </div>
                  Advanced Search
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-primary-600">
                  <p className="flex-auto">Easily filter and pinpoint relevant tenders to save time directly from our organized data structures.</p>
                </dd>
              </div>
              {/* Feature 3 */}
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-primary-900">
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-brand-blue">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  Deadline Tracking
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-primary-600">
                  <p className="flex-auto">Stay ahead of timelines with alerts for tenders closing soon. Maximize your bids and compliance.</p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
