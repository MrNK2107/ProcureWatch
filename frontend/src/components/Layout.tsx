import { ReactNode } from 'react';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 w-full">
        {children}
      </main>
      <footer className="border-t border-slate-800 mt-12 bg-[#0f172a] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-slate-500 text-sm">
            ProcureWatch — Transparency in Public Procurement • Data from Central Public Procurement Portal
          </p>
        </div>
      </footer>
    </div>
  );
}
