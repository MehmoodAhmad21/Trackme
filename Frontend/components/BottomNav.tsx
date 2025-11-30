import { Home, Calendar, Activity, Lightbulb, User } from 'lucide-react';
import type { Screen } from '../App';

interface BottomNavProps {
  activeTab: Screen;
  onNavigate: (screen: Screen) => void;
}

export function BottomNav({ activeTab, onNavigate }: BottomNavProps) {
  const tabs = [
    { id: 'home' as Screen, label: 'Home', icon: Home },
    { id: 'planner' as Screen, label: 'Planner', icon: Calendar },
    { id: 'health' as Screen, label: 'Health', icon: Activity },
    { id: 'insights' as Screen, label: 'Insights', icon: Lightbulb },
    { id: 'profile' as Screen, label: 'Profile', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 pb-6 pt-2">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className="flex flex-col items-center gap-1 px-4 py-2 min-w-[60px] transition-colors"
            >
              <Icon 
                size={24} 
                className={isActive ? 'text-teal-500' : 'text-gray-400'}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className={`text-xs ${isActive ? 'text-teal-500' : 'text-gray-500'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
