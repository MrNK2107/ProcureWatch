import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="bg-[#030712] min-h-screen relative overflow-hidden flex flex-col items-center set-bg-grid">

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_40%,transparent_100%)]"></div>

      {/* Top Ambient Light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-30 blur-[100px] bg-gradient-to-b from-brand-blue to-transparent rounded-full pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-7xl px-6 pt-32 pb-24 lg:px-8 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium text-slate-300 mb-8 shadow-2xl hover:bg-white/10 transition-colors cursor-pointer animate-[fade-in-down_1s_ease-out]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          Next-generation civic tech platform
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white max-w-5xl leading-[1.1] animate-[fade-in-up_1s_ease-out]">
          Uncover Opportunities in <br />
          <span className="text-gradient">
            Public Procurement
          </span>
        </h1>

        <p className="mt-8 text-lg md:text-xl leading-relaxed text-slate-400 max-w-2xl font-light animate-[fade-in-up_1s_ease-out_0.2s_both]">
          Transform opaque government tender data into your competitive advantage. Track deadlines, analyze ministry spending, and win more contracts.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 animate-[fade-in-up_1s_ease-out_0.4s_both]">
          <Link
            to="/dashboard"
            className="group relative rounded-full p-[1px] bg-gradient-to-r from-cyan-400 via-brand-blue to-purple-500 overflow-hidden shadow-[0_0_40px_-10px_rgba(56,189,248,0.5)] hover:shadow-[0_0_60px_-15px_rgba(56,189,248,0.7)] transition-shadow duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-brand-blue to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative bg-[#030712] rounded-full px-8 py-4 transition-colors duration-300 group-hover:bg-opacity-0">
              <span className="relative z-10 font-semibold text-white transition-colors duration-300 flex items-center gap-2">
                Launch Dashboard
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </div>
          </Link>
          <Link
            to="/tenders"
            className="rounded-full px-8 py-4 text-base font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex items-center gap-2"
          >
            Browse Tenders
          </Link>
        </div>

        {/* Abstract Dashboard Mockup */}
        <div className="mt-24 w-full max-w-5xl mockup-window border border-white/10 bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden relative animate-[fade-in-up_1.5s_ease-out_0.6s_both]">
          {/* Header bar */}
          <div className="h-12 border-b border-white/5 bg-white/5 flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          {/* Body */}
          <div className="p-8 grid grid-cols-3 gap-6 opacity-60">
            <div className="col-span-2 space-y-4">
              <div className="h-8 bg-white/10 rounded-lg w-1/3"></div>
              <div className="h-64 bg-white/5 rounded-xl border border-white/5 relative overflow-hidden flex items-end px-8 pb-4 gap-4">
                {/* Abstract chart */}
                <div className="w-12 h-32 bg-brand-blue/40 rounded-t-sm relative"><div className="absolute -top-10 left-0 text-xs text-white/50 w-full text-center">Q1</div></div>
                <div className="w-12 h-48 bg-brand-blue/60 rounded-t-sm relative"><div className="absolute -top-10 left-0 text-xs text-white/50 w-full text-center">Q2</div></div>
                <div className="w-12 h-24 bg-brand-blue/30 rounded-t-sm relative"><div className="absolute -top-10 left-0 text-xs text-white/50 w-full text-center">Q3</div></div>
                <div className="w-12 h-56 bg-brand-blue/80 rounded-t-sm relative"><div className="absolute -top-10 left-0 text-xs text-brand-blue w-full text-center font-bold">Q4</div></div>
                <div className="w-12 h-40 bg-cyan-400/80 rounded-t-sm relative"><div className="absolute -top-10 left-0 text-xs text-cyan-400 w-full text-center font-bold">YTD</div></div>
              </div>
            </div>
            <div className="space-y-4 flex flex-col justify-end">
              <div className="h-24 bg-gradient-to-br from-white/10 to-transparent rounded-xl border border-white/10 p-4">
                <div className="w-1/2 h-4 bg-white/20 rounded mb-2"></div>
                <div className="w-full h-10 bg-white/10 rounded"></div>
              </div>
              <div className="h-24 bg-white/5 rounded-xl border border-white/5 p-4">
                <div className="w-1/2 h-4 bg-white/20 rounded mb-2"></div>
                <div className="w-full h-10 bg-white/10 rounded"></div>
              </div>
              <div className="h-24 bg-white/5 rounded-xl border border-white/5 p-4">
                <div className="w-1/2 h-4 bg-white/20 rounded mb-2"></div>
                <div className="w-full h-10 bg-white/10 rounded"></div>
              </div>
            </div>
          </div>
          {/* Shine effect over mockup */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_3s_infinite]"></div>
        </div>

      </div>

      {/* Bento Grid Feature Section */}
      <div className="relative z-10 w-full max-w-7xl px-6 py-24 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-brand-blue font-semibold tracking-wide uppercase text-sm">Capabilities</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            A commanding view of public spending
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)]">
          {/* Feature 1 (Spans 2 columns) */}
          <div className="md:col-span-2 bg-white/[0.03] border border-white/10 rounded-3xl p-8 backdrop-blur-md hover:bg-white/[0.05] transition-colors relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/20 blur-[80px] rounded-full group-hover:bg-brand-blue/30 transition-colors"></div>
            <div className="relative z-10 flex flex-col h-full justify-end">
              <div className="h-12 w-12 rounded-xl bg-brand-blue/20 border border-brand-blue/30 flex items-center justify-center mb-6 text-brand-blue">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Real-time Analytics Engine</h3>
              <p className="text-slate-400 leading-relaxed max-w-lg">
                Interactive dashboards presenting visual insights across Ministries, Categories, and Geographies. Make data-driven decisions instantly.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 backdrop-blur-md hover:bg-white/[0.05] transition-colors relative overflow-hidden group">
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-500/10 blur-[60px] rounded-full group-hover:bg-purple-500/20 transition-colors"></div>
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="h-12 w-12 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75A6 6 0 1115.75 3a6 6 0 010 12zM15.75 15.75l-4.5 4.5" />
                </svg>
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-bold text-white mb-3">Advanced Search</h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  Pinpoint exact tenders with sophisticated filtering and instant results.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 backdrop-blur-md hover:bg-white/[0.05] transition-colors relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 blur-[60px] rounded-full group-hover:bg-emerald-500/10 transition-colors"></div>
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="h-12 w-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="mt-auto">
                <h3 className="text-xl font-bold text-white mb-3">Deadline Intelligence</h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  Never miss an opportunity with proactive pipeline tracking and closing alerts.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 4 (Spans 2 columns) */}
          <div className="md:col-span-2 bg-white/[0.03] border border-white/10 rounded-3xl p-8 backdrop-blur-md hover:bg-white/[0.05] transition-colors relative overflow-hidden group flex items-center">
            <div className="absolute left-0 top-0 w-full h-full bg-gradient-to-r from-transparent via-white/[0.02] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <div className="relative z-10 pr-8">
              <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-3">
                <span className="h-8 w-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </span>
                Fully Verified Data
              </h3>
              <p className="text-slate-400 leading-relaxed ml-11">
                Our data is directly sourced and enriched from the Central Public Procurement Portal, providing a transparent and compliant foundation for your bids.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
