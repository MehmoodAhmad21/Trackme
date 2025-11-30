interface SuggestionCardProps {
  message: string;
  icon: React.ReactNode;
  color?: string;
}

export function SuggestionCard({ message, icon, color = 'teal' }: SuggestionCardProps) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 min-w-[280px] flex gap-3">
      <div className={`w-10 h-10 rounded-xl bg-${color}-100 flex items-center justify-center flex-shrink-0`}>
        {icon}
      </div>
      <p className="text-gray-700 flex-1">{message}</p>
    </div>
  );
}
