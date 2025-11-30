import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Home, Calendar, Activity, Lightbulb, User } from 'lucide-react-native';
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
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <TouchableOpacity
              key={tab.id}
              onPress={() => onNavigate(tab.id)}
              style={styles.tab}
              activeOpacity={0.7}
            >
              <Icon 
                size={24} 
                color={isActive ? '#14b8a6' : '#9ca3af'}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <Text style={[styles.label, isActive && styles.labelActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingHorizontal: 8,
    paddingBottom: 24,
    paddingTop: 8,
  },
  tabsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tab: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    minWidth: 60,
  },
  label: {
    fontSize: 12,
    color: '#6b7280',
  },
  labelActive: {
    color: '#14b8a6',
    fontWeight: '600',
  },
});
