import { useState } from 'react';
import { OnboardingScreen } from './components/OnboardingScreen';
import { AuthScreen } from './components/AuthScreen';
import { HomeScreen } from './components/HomeScreen';
import { PlannerScreen } from './components/PlannerScreen';
import { DietScreen } from './components/DietScreen';
import { HealthScreen } from './components/HealthScreen';
import { InsightsScreen } from './components/InsightsScreen';
import { ProfileScreen } from './components/ProfileScreen';

export type Screen = 'onboarding' | 'auth' | 'home' | 'planner' | 'diet' | 'health' | 'insights' | 'profile';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'onboarding':
        return <OnboardingScreen onGetStarted={() => setCurrentScreen('auth')} />;
      case 'auth':
        return <AuthScreen onLogin={() => setCurrentScreen('home')} />;
      case 'home':
        return <HomeScreen onNavigate={setCurrentScreen} />;
      case 'planner':
        return <PlannerScreen onNavigate={setCurrentScreen} />;
      case 'diet':
        return <DietScreen onBack={() => setCurrentScreen('home')} />;
      case 'health':
        return <HealthScreen onNavigate={setCurrentScreen} />;
      case 'insights':
        return <InsightsScreen onNavigate={setCurrentScreen} />;
      case 'profile':
        return <ProfileScreen onNavigate={setCurrentScreen} onLogout={() => setCurrentScreen('onboarding')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* Phone Frame */}
      <div className="relative w-[390px] h-[844px] bg-white rounded-[3rem] shadow-2xl overflow-hidden border-8 border-gray-800">
        {/* Phone Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-gray-800 rounded-b-2xl z-50" />
        
        {/* App Content */}
        <div className="h-full overflow-auto bg-white">
          {renderScreen()}
        </div>
      </div>
    </div>
  );
}
