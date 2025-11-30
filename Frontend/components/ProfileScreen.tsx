import { ChevronRight, Target, Smartphone, Bell, FileText, LogOut, User } from 'lucide-react';
import { BottomNav } from './BottomNav';
import type { Screen } from '../App';

interface ProfileScreenProps {
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
}

export function ProfileScreen({ onNavigate, onLogout }: ProfileScreenProps) {
  return (
    <div className="h-full bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white px-6 pt-14 pb-6">
        <h1 className="text-gray-900 mb-6">Profile</h1>

        {/* User Info */}
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-blue-500 rounded-3xl flex items-center justify-center">
            <User size={36} className="text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-gray-900 mb-1">Sarah Johnson</h2>
            <p className="text-gray-600">sarah.j@email.com</p>
          </div>
          <button className="text-teal-500">Edit</button>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Goals Section */}
        <div className="bg-white rounded-3xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
              <Target size={20} className="text-teal-500" />
            </div>
            <h3 className="text-gray-900">Daily Goals</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="text-gray-900 mb-1">Step Goal</p>
                <p className="text-gray-500">Daily target</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-900">8,000</span>
                <ChevronRight size={20} className="text-gray-400" />
              </div>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="text-gray-900 mb-1">Calorie Target</p>
                <p className="text-gray-500">Daily intake</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-900">2,000 kcal</span>
                <ChevronRight size={20} className="text-gray-400" />
              </div>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-gray-900 mb-1">Sleep Goal</p>
                <p className="text-gray-500">Nightly target</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-900">8 hours</span>
                <ChevronRight size={20} className="text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Connected Apps */}
        <div className="bg-white rounded-3xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Smartphone size={20} className="text-blue-500" />
            </div>
            <h3 className="text-gray-900">Connected Apps & Devices</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="text-gray-900 mb-1">Apple Health</p>
                <p className="text-green-600">Connected</p>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="text-gray-900 mb-1">Google Fit</p>
                <p className="text-gray-400">Not connected</p>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="text-gray-900 mb-1">Fitness Tracker</p>
                <p className="text-green-600">Connected</p>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-gray-900 mb-1">Glucose Monitor</p>
                <p className="text-green-600">Connected</p>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-3xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <Bell size={20} className="text-purple-500" />
            </div>
            <h3 className="text-gray-900">Notifications</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="text-gray-900 mb-1">Meal Reminders</p>
                <p className="text-gray-500">Breakfast, lunch, dinner</p>
              </div>
              <div className="w-12 h-7 bg-teal-500 rounded-full p-1 flex items-center justify-end">
                <div className="w-5 h-5 bg-white rounded-full" />
              </div>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="text-gray-900 mb-1">Step Reminders</p>
                <p className="text-gray-500">Hourly activity nudges</p>
              </div>
              <div className="w-12 h-7 bg-teal-500 rounded-full p-1 flex items-center justify-end">
                <div className="w-5 h-5 bg-white rounded-full" />
              </div>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-gray-900 mb-1">Event Reminders</p>
                <p className="text-gray-500">Upcoming tasks & events</p>
              </div>
              <div className="w-12 h-7 bg-gray-200 rounded-full p-1 flex items-center justify-start">
                <div className="w-5 h-5 bg-white rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Other Links */}
        <div className="bg-white rounded-3xl p-5 shadow-sm">
          <button className="flex items-center justify-between w-full py-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <FileText size={20} className="text-gray-500" />
              <span className="text-gray-900">Privacy Policy</span>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </button>

          <button
            onClick={onLogout}
            className="flex items-center gap-3 w-full py-3 mt-2"
          >
            <LogOut size={20} className="text-red-500" />
            <span className="text-red-500">Log out</span>
          </button>
        </div>
      </div>

      <BottomNav activeTab="profile" onNavigate={onNavigate} />
    </div>
  );
}
