import { TrendingUp, Footprints, Moon, Sun, Utensils, Activity, Clock, Heart } from 'lucide-react';
import { BottomNav } from './BottomNav';
import type { Screen } from '../App';

interface InsightsScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function InsightsScreen({ onNavigate }: InsightsScreenProps) {
  const insights = [
    {
      icon: Footprints,
      color: 'teal',
      title: 'Almost there!',
      message: "You're close to your step goal. Take a 10-minute walk to reach 8,000 steps.",
      action: 'Add reminder',
    },
    {
      icon: Utensils,
      color: 'orange',
      title: 'Watch your carbs',
      message: "You've eaten high carbs today. Aim for a lighter, protein-rich dinner.",
      action: 'View meal plan',
    },
    {
      icon: Sun,
      color: 'yellow',
      title: 'Get some sun',
      message: "You haven't been outside much this week. Try a 15-minute outdoor walk today.",
      action: 'Add to plan',
    },
    {
      icon: Moon,
      color: 'purple',
      title: 'Sleep consistency',
      message: 'Your sleep schedule varies by 2+ hours. Try going to bed at the same time.',
      action: 'Set reminder',
    },
    {
      icon: Activity,
      color: 'blue',
      title: 'Great streak!',
      message: "You've hit your active minutes goal for 5 days straight. Keep it up!",
      action: null,
    },
    {
      icon: Heart,
      color: 'red',
      title: 'Heart rate trend',
      message: 'Your resting heart rate has improved by 3 bpm this month. Excellent progress!',
      action: null,
    },
  ];

  return (
    <div className="h-full bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white px-6 pt-14 pb-6">
        <h1 className="text-gray-900 mb-2">Insights</h1>
        <p className="text-gray-600">What Trackme suggests today</p>
      </div>

      <div className="px-6 py-6 space-y-4">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <div key={index} className="bg-white rounded-3xl p-5 shadow-sm">
              <div className="flex gap-4 mb-3">
                <div className={`w-12 h-12 bg-${insight.color}-100 rounded-2xl flex items-center justify-center flex-shrink-0`}>
                  <Icon size={24} className={`text-${insight.color}-500`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-gray-900 mb-1">{insight.title}</h3>
                  <p className="text-gray-600">{insight.message}</p>
                </div>
              </div>
              
              {insight.action && (
                <div className="flex gap-2 ml-16">
                  <button className="px-4 py-2 bg-teal-50 text-teal-600 rounded-xl transition-all active:scale-95">
                    {insight.action}
                  </button>
                  <button className="px-4 py-2 text-gray-500 rounded-xl transition-all active:scale-95">
                    Dismiss
                  </button>
                </div>
              )}
            </div>
          );
        })}

        {/* Weekly Summary */}
        <div className="bg-gradient-to-br from-teal-500 to-blue-500 rounded-3xl p-6 shadow-lg text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <TrendingUp size={24} className="text-white" />
            </div>
            <h3>Weekly Summary</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-white/90">Average steps</span>
              <span>6,840 / day</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/90">Workouts completed</span>
              <span>5 sessions</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/90">Calories avg</span>
              <span>1,850 kcal</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/90">Sleep avg</span>
              <span>7h 15m</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/20">
            <p className="text-white/90">
              You're doing great! Keep up the momentum this week.
            </p>
          </div>
        </div>
      </div>

      <BottomNav activeTab="insights" onNavigate={onNavigate} />
    </div>
  );
}
