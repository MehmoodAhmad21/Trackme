import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react-native';
import { BottomNav } from './BottomNav';
import { TaskItem } from './TaskItem';
import { EventItem } from './EventItem';
import type { Screen } from '../App';

interface PlannerScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function PlannerScreen({ onNavigate }: PlannerScreenProps) {
  const [selectedDay, setSelectedDay] = useState(15);
  const days = Array.from({ length: 7 }, (_, i) => 13 + i);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <TouchableOpacity>
              <ChevronLeft size={24} color="#111827" />
            </TouchableOpacity>
            <Text style={styles.title}>November 2024</Text>
            <TouchableOpacity>
              <ChevronRight size={24} color="#111827" />
            </TouchableOpacity>
          </View>

          {/* Week Days */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.daysContainer}>
              {days.map((day) => (
                <TouchableOpacity
                  key={day}
                  style={[styles.dayButton, selectedDay === day && styles.dayButtonActive]}
                  onPress={() => setSelectedDay(day)}
                >
                  <Text style={[styles.dayLabel, selectedDay === day && styles.dayLabelActive]}>
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][day - 13]}
                  </Text>
                  <Text style={[styles.dayNumber, selectedDay === day && styles.dayNumberActive]}>
                    {day}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        <View style={styles.content}>
          {/* Tasks */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Tasks</Text>
            <TaskItem title="Team standup" time="9:00 AM" tag="Work" tagColor="#3b82f6" completed />
            <View style={styles.separator} />
            <TaskItem title="Review Q4 reports" time="2:00 PM" tag="Work" tagColor="#3b82f6" />
            <View style={styles.separator} />
            <TaskItem title="Grocery shopping" tag="Personal" tagColor="#10b981" />
          </View>

          {/* Events */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Events</Text>
            <EventItem title="Doctor appointment" time="2:30 PM" location="City Medical Center" color="teal" />
            <View style={{ height: 12 }} />
            <EventItem title="Yoga class" time="6:00 PM" location="Wellness Studio" />
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.fab} activeOpacity={0.8}>
        <Plus size={28} color="#fff" strokeWidth={2.5} />
      </TouchableOpacity>

      <BottomNav activeTab="planner" onNavigate={onNavigate} />
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
    paddingTop: 56,
    paddingBottom: 16,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  daysContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 8,
  },
  dayButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: 'center',
    minWidth: 60,
  },
  dayButtonActive: {
    backgroundColor: '#14b8a6',
  },
  dayLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  dayLabelActive: {
    color: '#fff',
  },
  dayNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  dayNumberActive: {
    color: '#fff',
  },
  content: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    gap: 16,
    paddingBottom: 120,
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
  separator: {
    height: 1,
    backgroundColor: '#f3f4f6',
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
