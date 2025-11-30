import { useState } from 'react';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { BottomNav } from './BottomNav';
import { TaskItem } from './TaskItem';
import type { Screen } from '../App';

interface PlannerScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function PlannerScreen({ onNavigate }: PlannerScreenProps) {
  const [view, setView] = useState<'day' | 'week'>('day');
  const [selectedDay, setSelectedDay] = useState(3);

  const weekDays = [
    { date: 28, day: 'Mon' },
    { date: 29, day: 'Tue' },
    { date: 30, day: 'Wed' },
    { date: 1, day: 'Thu' },
    { date: 2, day: 'Fri' },
    { date: 3, day: 'Sat' },
    { date: 4, day: 'Sun' },
  ];

  return (
    <div className="h-full bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white px-6 pt-14 pb-4">
        <h1 className="text-gray-900 mb-6">Planner</h1>

        {/* View Switcher */}
        <div className="flex gap-2 bg-gray-100 p-1 rounded-xl mb-4">
          <button
            onClick={() => setView('day')}
            className={`flex-1 py-2 rounded-lg transition-all ${
              view === 'day'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600'
            }`}
          >
            Day
          </button>
          <button
            onClick={() => setView('week')}
            className={`flex-1 py-2 rounded-lg transition-all ${
              view === 'week'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600'
            }`}
          >
            Week
          </button>
        </div>

        {/* Week Calendar */}
        <div className="flex items-center gap-2">
          <button className="p-2">
            <ChevronLeft size={20} className="text-gray-600" />
          </button>
          <div className="flex-1 flex gap-1">
            {weekDays.map((item, index) => (
              <button
                key={index}
                onClick={() => setSelectedDay(index)}
                className={`flex-1 py-3 rounded-2xl transition-all ${
                  selectedDay === index
                    ? 'bg-teal-500 text-white shadow-sm'
                    : 'text-gray-600'
                }`}
              >
                <div className="text-xs mb-1">{item.day}</div>
                <div className={selectedDay === index ? '' : ''}>{item.date}</div>
              </button>
            ))}
          </div>
          <button className="p-2">
            <ChevronRight size={20} className="text-gray-600" />
          </button>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Tasks Section */}
        <div className="bg-white rounded-3xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900">Tasks</h3>
            <button className="w-8 h-8 bg-teal-500 rounded-xl flex items-center justify-center">
              <Plus size={18} className="text-white" strokeWidth={2.5} />
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
            <TaskItem
              title="Call mom"
              time="5:00 PM"
              tag="Personal"
              tagColor="green"
            />
          </div>
        </div>

        {/* Events Section */}
        <div className="bg-white rounded-3xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900">Events</h3>
            <button className="w-8 h-8 bg-teal-500 rounded-xl flex items-center justify-center">
              <Plus size={18} className="text-white" strokeWidth={2.5} />
            </button>
          </div>
          <div className="space-y-3">
            <div className="flex gap-3 items-start">
              <div className="text-center min-w-[60px] pt-1">
                <p className="text-teal-500">9:00 AM</p>
              </div>
              <div className="flex-1 p-3 bg-blue-50 rounded-2xl border border-blue-100">
                <p className="text-gray-900 mb-1">Team standup</p>
                <p className="text-gray-600">Conference Room A</p>
                <div className="mt-2 h-1 bg-blue-500 rounded-full w-full" />
              </div>
            </div>
            
            <div className="flex gap-3 items-start">
              <div className="text-center min-w-[60px] pt-1">
                <p className="text-teal-500">2:30 PM</p>
              </div>
              <div className="flex-1 p-3 bg-red-50 rounded-2xl border border-red-100">
                <p className="text-gray-900 mb-1">Doctor appointment</p>
                <p className="text-gray-600">City Medical Center</p>
                <div className="mt-2 h-1 bg-red-500 rounded-full w-full" />
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <div className="text-center min-w-[60px] pt-1">
                <p className="text-gray-500">6:00 PM</p>
              </div>
              <div className="flex-1 p-3 bg-purple-50 rounded-2xl border border-purple-100">
                <p className="text-gray-900 mb-1">Yoga class</p>
                <p className="text-gray-600">Wellness Studio</p>
                <div className="mt-2 h-1 bg-purple-500 rounded-full w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNav activeTab="planner" onNavigate={onNavigate} />
    </div>
  );
}
