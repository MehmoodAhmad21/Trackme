import { useState } from 'react';
import { View, SafeAreaView, StatusBar } from 'react-native';
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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" />
      <View style={{ flex: 1 }}>
        {renderScreen()}
      </View>
    </SafeAreaView>
  );
}
