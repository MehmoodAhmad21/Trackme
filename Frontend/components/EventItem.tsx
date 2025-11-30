interface EventItemProps {
  title: string;
  time: string;
  location?: string;
  color?: string;
}

export function EventItem({ title, time, location, color = 'teal' }: EventItemProps) {
  const colorClasses = {
    teal: 'bg-teal-50 border-teal-100',
    blue: 'bg-blue-50 border-blue-100',
    purple: 'bg-purple-50 border-purple-100',
    red: 'bg-red-50 border-red-100',
  };

  return (
    <div className="flex gap-3 items-start">
      <div className="text-center min-w-[60px] pt-1">
        <p className="text-teal-500">{time}</p>
      </div>
      <div className={`flex-1 p-3 rounded-2xl border ${colorClasses[color as keyof typeof colorClasses] || colorClasses.teal}`}>
        <p className="text-gray-900 mb-1">{title}</p>
        {location && <p className="text-gray-600">{location}</p>}
      </div>
    </div>
  );
}
