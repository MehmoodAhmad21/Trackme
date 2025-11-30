interface MetricCardProps {
  label: string;
  value: string;
  target?: string;
  icon: React.ReactNode;
  color?: string;
  progress?: number;
}

export function MetricCard({ label, value, target, icon, color = 'teal', progress }: MetricCardProps) {
  return (
    <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 min-w-[160px]">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl bg-${color}-100 flex items-center justify-center`}>
          {icon}
        </div>
      </div>
      
      <div className="space-y-1">
        <p className="text-gray-600">{label}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-gray-900">{value}</span>
          {target && <span className="text-gray-400">/ {target}</span>}
        </div>
      </div>

      {progress !== undefined && (
        <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full bg-${color}-500 rounded-full transition-all`}
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      )}
    </div>
  );
}
