import { useState } from 'react';
import { Footprints, Heart, Droplets, Moon, TrendingUp, ChevronRight, Dumbbell } from 'lucide-react';
import { BottomNav } from './BottomNav';
import type { Screen } from '../App';

interface HealthScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function HealthScreen({ onNavigate }: HealthScreenProps) {
  const [activeTab, setActiveTab] = useState<'activity' | 'vitals'>('activity');

  const stepsData = [5200, 7800, 6500, 8200, 6342, 4800, 7100];
  const maxSteps = Math.max(...stepsData);

  return (
    <div className="h-full bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white px-6 pt-14 pb-4">
        <h1 className="text-gray-900 mb-6">Health</h1>

        {/* Tab Switcher */}
        <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('activity')}
            className={`flex-1 py-2 rounded-lg transition-all ${
              activeTab === 'activity'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600'
            }`}
          >
            Activity
          </button>
          <button
            onClick={() => setActiveTab('vitals')}
            className={`flex-1 py-2 rounded-lg transition-all ${
              activeTab === 'vitals'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600'
            }`}
          >
            Vitals
          </button>
        </div>
      </div>

      {activeTab === 'activity' ? (
        <div className="px-6 py-6 space-y-6">
          {/* Steps Progress */}
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-teal-100 rounded-2xl flex items-center justify-center">
                <Footprints size={24} className="text-teal-500" />
              </div>
              <div className="flex-1">
                <p className="text-gray-600 mb-1">Steps Today</p>
                <p className="text-gray-900">6,342 / 8,000</p>
              </div>
            </div>
            
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-teal-500 rounded-full transition-all"
                style={{ width: '79.3%' }}
              />
            </div>
            <p className="text-gray-500">1,658 steps to go</p>
          </div>

          {/* Weekly Steps Chart */}
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h3 className="text-gray-900 mb-6">Last 7 Days</h3>
            <div className="flex items-end justify-between gap-2 h-40">
              {stepsData.map((steps, index) => {
                const height = (steps / maxSteps) * 100;
                const isToday = index === 4;
                return (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex items-end justify-center flex-1">
                      <div
                        className={`w-full rounded-t-lg transition-all ${
                          isToday ? 'bg-teal-500' : 'bg-gray-200'
                        }`}
                        style={{ height: `${height}%` }}
                      />
                    </div>
                    <p className={`text-xs ${isToday ? 'text-teal-500' : 'text-gray-500'}`}>
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Workouts */}
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h3 className="text-gray-900 mb-4">Recent Workouts</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-2xl border border-purple-100">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                  <Dumbbell size={24} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 mb-1">Strength Training</p>
                  <p className="text-gray-600">45 minutes • 280 kcal</p>
                </div>
                <p className="text-gray-500">Today</p>
              </div>

              <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-2xl border border-orange-100">
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                  <Footprints size={24} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 mb-1">Running</p>
                  <p className="text-gray-600">30 minutes • 320 kcal</p>
                </div>
                <p className="text-gray-500">Yesterday</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="px-6 py-6 space-y-4">
          {/* Vitals Grid */}
          <div className="grid grid-cols-2 gap-4">
            <VitalCard
              icon={<Heart size={24} className="text-red-500" />}
              label="Heart Rate"
              value="72"
              unit="bpm"
              time="10 min ago"
              color="red"
              trend={[68, 70, 72, 71, 72]}
            />
            <VitalCard
              icon={<Droplets size={24} className="text-blue-500" />}
              label="Blood Glucose"
              value="95"
              unit="mg/dL"
              time="2h ago"
              color="blue"
              trend={[92, 94, 98, 96, 95]}
            />
            <VitalCard
              icon={<Moon size={24} className="text-purple-500" />}
              label="Sleep"
              value="7h 32m"
              unit=""
              time="Last night"
              color="purple"
              trend={[6.5, 7, 7.5, 7.2, 7.5]}
            />
            <VitalCard
              icon={<TrendingUp size={24} className="text-teal-500" />}
              label="Weight"
              value="148"
              unit="lbs"
              time="This morning"
              color="teal"
              trend={[150, 149, 149, 148, 148]}
            />
          </div>

          {/* Blood Pressure */}
          <div className="bg-white rounded-3xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                  <Heart size={24} className="text-green-500" />
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Blood Pressure</p>
                  <p className="text-gray-900">120/80 mmHg</p>
                </div>
              </div>
              <button className="text-teal-500">
                <ChevronRight size={20} />
              </button>
            </div>
            <p className="text-gray-500">2 hours ago</p>
          </div>
        </div>
      )}

      <BottomNav activeTab="health" onNavigate={onNavigate} />
    </div>
  );
}

interface VitalCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  unit: string;
  time: string;
  color: string;
  trend: number[];
}

function VitalCard({ icon, label, value, unit, time, color, trend }: VitalCardProps) {
  const max = Math.max(...trend);
  const min = Math.min(...trend);
  const range = max - min || 1;

  return (
    <div className={`bg-white rounded-3xl p-4 shadow-sm border border-${color}-100`}>
      <div className={`w-10 h-10 bg-${color}-100 rounded-xl flex items-center justify-center mb-3`}>
        {icon}
      </div>
      <p className="text-gray-600 mb-1">{label}</p>
      <p className="text-gray-900 mb-1">
        {value} {unit && <span className="text-gray-500">{unit}</span>}
      </p>
      
      {/* Mini trend line */}
      <div className="flex items-end gap-0.5 h-8 mb-2">
        {trend.map((val, index) => {
          const height = ((val - min) / range) * 100;
          return (
            <div
              key={index}
              className={`flex-1 bg-${color}-500 rounded-sm`}
              style={{ height: `${Math.max(height, 20)}%` }}
            />
          );
        })}
      </div>
      
      <p className="text-gray-400">{time}</p>
    </div>
  );
}
