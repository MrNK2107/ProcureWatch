interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'emerald';
}

export default function StatCard({ title, value, icon, color = 'blue' }: StatCardProps) {
  const colorClasses = {
    blue: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    green: 'bg-green-500/20 text-green-400 border border-green-500/30',
    emerald: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
    purple: 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
    orange: 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
  };

  return (
    <div className="glass-card flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-slate-400 tracking-wide uppercase">{title}</p>
        <p className="text-3xl font-extrabold text-white mt-1">{value}</p>
      </div>
      <div className={`p-3 rounded-xl shadow-inner ${colorClasses[color]}`}>
        {icon}
      </div>
    </div>
  );
}
