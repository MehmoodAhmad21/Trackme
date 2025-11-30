interface VitalCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  unit?: string;
  color?: string;
}

export function VitalCard({ icon, label, value, unit, color = 'teal' }: VitalCardProps) {
  const colorClasses = {
    teal: 'bg-teal-100',
    red: 'bg-red-100',
    blue: 'bg-blue-100',
    purple: 'bg-purple-100',
    green: 'bg-green-100',
  };

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <div className={`w-10 h-10 rounded-xl ${colorClasses[color as keyof typeof colorClasses] || colorClasses.teal} flex items-center justify-center mb-3`}>
        {icon}
      </div>
      <p className="text-gray-600 mb-1">{label}</p>
      <div className="flex items-baseline gap-1">
        <span className="text-gray-900">{value}</span>
        {unit && <span className="text-gray-500">{unit}</span>}
      </div>
    </div>
  );
}
