import { Check } from 'lucide-react';

interface TaskItemProps {
  title: string;
  time?: string;
  completed?: boolean;
  tag?: string;
  tagColor?: string;
  onToggle?: () => void;
}

export function TaskItem({ title, time, completed = false, tag, tagColor = 'blue', onToggle }: TaskItemProps) {
  return (
    <div className="flex items-center gap-3 py-3">
      <button
        onClick={onToggle}
        className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all ${
          completed
            ? 'bg-teal-500 border-teal-500'
            : 'border-gray-300 bg-white'
        }`}
      >
        {completed && <Check size={16} className="text-white" strokeWidth={3} />}
      </button>

      <div className="flex-1 min-w-0">
        <p className={`${completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
          {title}
        </p>
        {time && (
          <p className="text-gray-500">{time}</p>
        )}
      </div>

      {tag && (
        <span className={`px-3 py-1 bg-${tagColor}-100 text-${tagColor}-700 rounded-full text-xs flex-shrink-0`}>
          {tag}
        </span>
      )}
    </div>
  );
}
