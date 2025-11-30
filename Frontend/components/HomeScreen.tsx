import { Flame, Footprints, Zap, Plus, ChevronRight, Heart, Droplets, Moon, TrendingUp, Utensils } from 'lucide-react';
import { BottomNav } from './BottomNav';
import { MetricCard } from './MetricCard';
import { TaskItem } from './TaskItem';
import { SuggestionCard } from './SuggestionCard';
import type { Screen } from '../App';

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const today = new Date();
  const timeOfDay = today.getHours() < 12 ? 'morning' : today.getHours() < 18 ? 'afternoon' : 'evening';

  return (
    <div className="h-full bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white px-6 pt-14 pb-6">
        <h2 className="text-gray-900 mb-1">Good {timeOfDay}, Sarah</h2>
        <p className="text-gray-600">
          {today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Metrics Row */}
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-6 px-6">
          <MetricCard
            label="Calories"
            value="1,250"
            target="2,000"
            icon={<Flame size={20} className="text-orange-500" />}
            color="orange"
            progress={62.5}
          />
          <MetricCard
            label="Steps"
            value="6,342"
            target="8,000"
            icon={<Footprints size={20} className="text-teal-500" />}
            color="teal"
            progress={79.3}
          />
          <MetricCard
            label="Active mins"
            value="28"
            target="30"
            icon={<Zap size={20} className="text-purple-500" />}
            color="purple"
            progress={93.3}
          />
        </div>

        {/* Today's Tasks */}
        <div className="bg-white rounded-3xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900">Today's Tasks</h3>
            <button className="text-teal-500 flex items-center gap-1">
              <span>View all</span>
              <ChevronRight size={16} />
            </button>
          </div>
          <div className="divide-y divide-gray-100">
            <TaskItem
              title="Team standup"
              time="9:00 AM"
              tag="Work"
              tagColor="blue"
              completed
            />
            <TaskItem
              title="Review Q4 reports"
              time="2:00 PM"
              tag="Work"
              tagColor="blue"
            />
            <TaskItem
              title="Grocery shopping"
              tag="Personal"
              tagColor="green"
            />
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-3xl p-5 shadow-sm">
          <h3 className="text-gray-900 mb-4">Upcoming Events</h3>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="text-center min-w-[60px]">
                <p className="text-teal-500">2:30 PM</p>
              </div>
              <div className="flex-1 p-3 bg-teal-50 rounded-2xl border border-teal-100">
                <p className="text-gray-900 mb-1">Doctor appointment</p>
                <p className="text-gray-600">City Medical Center</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="text-center min-w-[60px]">
                <p className="text-gray-500">6:00 PM</p>
              </div>
              <div className="flex-1 p-3 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-gray-900 mb-1">Yoga class</p>
                <p className="text-gray-600">Wellness Studio</p>
              </div>
            </div>
          </div>
        </div>

        {/* Vitals Snapshot */}
        <div className="bg-white rounded-3xl p-5 shadow-sm">
          <h3 className="text-gray-900 mb-4">Vitals Snapshot</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-red-50 rounded-2xl border border-red-100">
              <Heart size={20} className="text-red-500 mb-2" />
              <p className="text-gray-600 mb-1">Heart Rate</p>
              <p className="text-gray-900">72 bpm</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-2xl border border-blue-100">
              <Droplets size={20} className="text-blue-500 mb-2" />
              <p className="text-gray-600 mb-1">Glucose</p>
              <p className="text-gray-900">95 mg/dL</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-2xl border border-purple-100">
              <Moon size={20} className="text-purple-500 mb-2" />
              <p className="text-gray-600 mb-1">Sleep</p>
              <p className="text-gray-900">7h 32m</p>
            </div>
            <div className="p-3 bg-teal-50 rounded-2xl border border-teal-100">
              <TrendingUp size={20} className="text-teal-500 mb-2" />
              <p className="text-gray-600 mb-1">Weight</p>
              <p className="text-gray-900">148 lbs</p>
            </div>
          </div>
        </div>

        {/* Suggestions */}
        <div>
          <h3 className="text-gray-900 mb-4 px-1">Suggestions for you</h3>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-6 px-6">
            <SuggestionCard
              icon={<Footprints size={20} className="text-teal-500" />}
              message="You're close to your step goal. Take a 10-minute walk."
              color="teal"
            />
            <SuggestionCard
              icon={<Utensils size={20} className="text-orange-500" />}
              message="You've eaten high carbs today. Aim for a lighter dinner."
              color="orange"
            />
          </div>
        </div>
      </div>

      {/* Floating Add Button */}
      <button className="fixed bottom-28 right-6 w-14 h-14 bg-teal-500 rounded-full shadow-lg flex items-center justify-center active:scale-95 transition-all">
        <Plus size={28} className="text-white" strokeWidth={2.5} />
      </button>

      <BottomNav activeTab="home" onNavigate={onNavigate} />
    </div>
  );
}
