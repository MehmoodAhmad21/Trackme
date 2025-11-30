import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Footprints, Heart, Droplets, Moon, TrendingUp, ChevronRight, Dumbbell } from 'lucide-react-native';
import { BottomNav } from './BottomNav';
import { VitalCard } from './VitalCard';
import type { Screen } from '../App';

interface HealthScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function HealthScreen({ onNavigate }: HealthScreenProps) {
  const [selectedTab, setSelectedTab] = useState<'vitals' | 'activity'>('vitals');

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Health</Text>
          
          {/* Tabs */}
          <View style={styles.tabs}>
            <TouchableOpacity
              style={[styles.tab, selectedTab === 'vitals' && styles.tabActive]}
              onPress={() => setSelectedTab('vitals')}
            >
              <Text style={[styles.tabText, selectedTab === 'vitals' && styles.tabTextActive]}>
                Vitals
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, selectedTab === 'activity' && styles.tabActive]}
              onPress={() => setSelectedTab('activity')}
            >
              <Text style={[styles.tabText, selectedTab === 'activity' && styles.tabTextActive]}>
                Activity
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.content}>
          {selectedTab === 'vitals' ? (
            <>
              {/* Vitals Grid */}
              <View style={styles.grid}>
                <VitalCard icon={<Heart size={20} color="#ef4444" />} label="Heart Rate" value="72" unit="bpm" color="red" />
                <VitalCard icon={<Droplets size={20} color="#3b82f6" />} label="Glucose" value="95" unit="mg/dL" color="blue" />
                <VitalCard icon={<Moon size={20} color="#a855f7" />} label="Sleep" value="7h 32m" color="purple" />
                <VitalCard icon={<TrendingUp size={20} color="#14b8a6" />} label="Weight" value="148" unit="lbs" color="teal" />
              </View>

              {/* Recent Readings */}
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Recent Readings</Text>
                {['Heart Rate - 72 bpm', 'Blood Glucose - 95 mg/dL', 'Sleep Duration - 7h 32m'].map((reading, index) => (
                  <View key={index}>
                    <View style={styles.readingRow}>
                      <Text style={styles.readingText}>{reading}</Text>
                      <Text style={styles.readingTime}>{['2 hours ago', '5 hours ago', 'Yesterday'][index]}</Text>
                    </View>
                    {index < 2 && <View style={styles.separator} />}
                  </View>
                ))}
              </View>
            </>
          ) : (
            <>
              {/* Steps Card */}
              <View style={styles.stepsCard}>
                <View style={styles.stepsIcon}>
                  <Footprints size={32} color="#14b8a6" />
                </View>
                <Text style={styles.stepsLabel}>Today's Steps</Text>
                <Text style={styles.stepsValue}>6,342</Text>
                <Text style={styles.stepsGoal}>of 8,000 goal</Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: '79%' }]} />
                </View>
              </View>

              {/* Recent Activities */}
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Recent Activities</Text>
                {['Morning run - 3.2 km', 'Yoga session - 45 min', 'Evening walk - 2.1 km'].map((activity, index) => (
                  <View key={index}>
                    <View style={styles.activityRow}>
                      <View style={styles.activityIcon}>
                        <Dumbbell size={20} color="#14b8a6" />
                      </View>
                      <View style={styles.activityContent}>
                        <Text style={styles.activityText}>{activity}</Text>
                        <Text style={styles.activityTime}>{['Today 7:00 AM', 'Yesterday 6:00 PM', '2 days ago'][index]}</Text>
                      </View>
                      <ChevronRight size={20} color="#9ca3af" />
                    </View>
                    {index < 2 && <View style={styles.separator} />}
                  </View>
                ))}
              </View>
            </>
          )}
        </View>
      </ScrollView>

      <BottomNav activeTab="health" onNavigate={onNavigate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scroll: {
    flex: 1,
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 20,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabActive: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  tabText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6b7280',
  },
  tabTextActive: {
    color: '#111827',
  },
  content: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    gap: 16,
    paddingBottom: 120,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  readingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  readingText: {
    fontSize: 15,
    color: '#111827',
  },
  readingTime: {
    fontSize: 13,
    color: '#6b7280',
  },
  separator: {
    height: 1,
    backgroundColor: '#f3f4f6',
  },
  stepsCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  stepsIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#ccfbf1',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  stepsLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  stepsValue: {
    fontSize: 48,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  stepsGoal: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#14b8a6',
    borderRadius: 4,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#ccfbf1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 13,
    color: '#6b7280',
  },
});
