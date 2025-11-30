import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Flame, Footprints, Zap, Plus, ChevronRight, Heart, Droplets, Moon, TrendingUp, Utensils } from 'lucide-react-native';
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
    <View style={styles.container}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Good {timeOfDay}, Sarah</Text>
          <Text style={styles.date}>
            {today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </Text>
        </View>

        <View style={styles.content}>
          {/* Metrics Row */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.metricsRow}>
            <View style={styles.metricsContainer}>
              <MetricCard
                label="Calories"
                value="1,250"
                target="2,000"
                icon={<Flame size={20} color="#f97316" />}
                color="#f97316"
                progress={62.5}
              />
              <MetricCard
                label="Steps"
                value="6,342"
                target="8,000"
                icon={<Footprints size={20} color="#14b8a6" />}
                color="#14b8a6"
                progress={79.3}
              />
              <MetricCard
                label="Active mins"
                value="28"
                target="30"
                icon={<Zap size={20} color="#a855f7" />}
                color="#a855f7"
                progress={93.3}
              />
            </View>
          </ScrollView>

          {/* Today's Tasks */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Today's Tasks</Text>
              <TouchableOpacity style={styles.viewAllButton}>
                <Text style={styles.viewAllText}>View all</Text>
                <ChevronRight size={16} color="#14b8a6" />
              </TouchableOpacity>
            </View>
            <View style={styles.divider}>
              <TaskItem
                title="Team standup"
                time="9:00 AM"
                tag="Work"
                tagColor="#3b82f6"
                completed
              />
              <View style={styles.separator} />
              <TaskItem
                title="Review Q4 reports"
                time="2:00 PM"
                tag="Work"
                tagColor="#3b82f6"
              />
              <View style={styles.separator} />
              <TaskItem
                title="Grocery shopping"
                tag="Personal"
                tagColor="#10b981"
              />
            </View>
          </View>

          {/* Upcoming Events */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Upcoming Events</Text>
            <View style={styles.eventsContainer}>
              <View style={styles.eventRow}>
                <View style={styles.eventTime}>
                  <Text style={styles.eventTimeText}>2:30 PM</Text>
                </View>
                <View style={[styles.eventCard, { backgroundColor: '#ccfbf1' }]}>
                  <Text style={styles.eventTitle}>Doctor appointment</Text>
                  <Text style={styles.eventLocation}>City Medical Center</Text>
                </View>
              </View>
              <View style={styles.eventRow}>
                <View style={styles.eventTime}>
                  <Text style={[styles.eventTimeText, { color: '#6b7280' }]}>6:00 PM</Text>
                </View>
                <View style={[styles.eventCard, { backgroundColor: '#f9fafb' }]}>
                  <Text style={styles.eventTitle}>Yoga class</Text>
                  <Text style={styles.eventLocation}>Wellness Studio</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Vitals Snapshot */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Vitals Snapshot</Text>
            <View style={styles.vitalsGrid}>
              <View style={[styles.vitalCard, { backgroundColor: '#fee2e2' }]}>
                <Heart size={20} color="#ef4444" style={{ marginBottom: 8 }} />
                <Text style={styles.vitalLabel}>Heart Rate</Text>
                <Text style={styles.vitalValue}>72 bpm</Text>
              </View>
              <View style={[styles.vitalCard, { backgroundColor: '#dbeafe' }]}>
                <Droplets size={20} color="#3b82f6" style={{ marginBottom: 8 }} />
                <Text style={styles.vitalLabel}>Glucose</Text>
                <Text style={styles.vitalValue}>95 mg/dL</Text>
              </View>
              <View style={[styles.vitalCard, { backgroundColor: '#e9d5ff' }]}>
                <Moon size={20} color="#a855f7" style={{ marginBottom: 8 }} />
                <Text style={styles.vitalLabel}>Sleep</Text>
                <Text style={styles.vitalValue}>7h 32m</Text>
              </View>
              <View style={[styles.vitalCard, { backgroundColor: '#ccfbf1' }]}>
                <TrendingUp size={20} color="#14b8a6" style={{ marginBottom: 8 }} />
                <Text style={styles.vitalLabel}>Weight</Text>
                <Text style={styles.vitalValue}>148 lbs</Text>
              </View>
            </View>
          </View>

          {/* Suggestions */}
          <View style={styles.suggestionsContainer}>
            <Text style={styles.suggestionsTitle}>Suggestions for you</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.suggestionsRow}>
                <SuggestionCard
                  icon={<Footprints size={20} color="#14b8a6" />}
                  message="You're close to your step goal. Take a 10-minute walk."
                  color="#14b8a6"
                />
                <SuggestionCard
                  icon={<Utensils size={20} color="#f97316" />}
                  message="You've eaten high carbs today. Aim for a lighter dinner."
                  color="#f97316"
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </ScrollView>

      {/* Floating Add Button */}
      <TouchableOpacity style={styles.fab} activeOpacity={0.8}>
        <Plus size={28} color="#fff" strokeWidth={2.5} />
      </TouchableOpacity>

      <BottomNav activeTab="home" onNavigate={onNavigate} />
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
    paddingBottom: 24,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  date: {
    fontSize: 15,
    color: '#6b7280',
  },
  content: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    gap: 24,
    paddingBottom: 120,
  },
  metricsRow: {
    marginHorizontal: -24,
  },
  metricsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
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
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewAllText: {
    color: '#14b8a6',
    fontSize: 14,
    fontWeight: '600',
  },
  divider: {
    gap: 0,
  },
  separator: {
    height: 1,
    backgroundColor: '#f3f4f6',
  },
  eventsContainer: {
    gap: 12,
  },
  eventRow: {
    flexDirection: 'row',
    gap: 12,
  },
  eventTime: {
    minWidth: 60,
    alignItems: 'center',
  },
  eventTimeText: {
    color: '#14b8a6',
    fontSize: 14,
    fontWeight: '600',
  },
  eventCard: {
    flex: 1,
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  eventTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  eventLocation: {
    fontSize: 13,
    color: '#6b7280',
  },
  vitalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  vitalCard: {
    width: '48%',
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  vitalLabel: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 4,
  },
  vitalValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  suggestionsContainer: {
    gap: 16,
  },
  suggestionsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    paddingLeft: 4,
  },
  suggestionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  fab: {
    position: 'absolute',
    bottom: 112,
    right: 24,
    width: 56,
    height: 56,
    backgroundColor: '#14b8a6',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
