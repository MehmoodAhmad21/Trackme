import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { TrendingUp, Footprints, Moon, Sun, Utensils, Activity, Clock, Heart } from 'lucide-react-native';
import { BottomNav } from './BottomNav';
import type { Screen } from '../App';

interface InsightsScreenProps {
  onNavigate: (screen: Screen) => void;
}

const colorMap: Record<string, { bg: string; color: string }> = {
  teal: { bg: '#ccfbf1', color: '#14b8a6' },
  orange: { bg: '#ffedd5', color: '#f97316' },
  yellow: { bg: '#fef3c7', color: '#f59e0b' },
  purple: { bg: '#e9d5ff', color: '#a855f7' },
  blue: { bg: '#dbeafe', color: '#3b82f6' },
  red: { bg: '#fee2e2', color: '#ef4444' },
};

export function InsightsScreen({ onNavigate }: InsightsScreenProps) {
  const insights = [
    {
      icon: Footprints,
      color: 'teal',
      title: 'Almost there!',
      message: "You're close to your step goal. Take a 10-minute walk to reach 8,000 steps.",
      action: 'Add reminder',
    },
    {
      icon: Utensils,
      color: 'orange',
      title: 'Watch your carbs',
      message: "You've eaten high carbs today. Aim for a lighter, protein-rich dinner.",
      action: 'View meal plan',
    },
    {
      icon: Sun,
      color: 'yellow',
      title: 'Get some sun',
      message: "You haven't been outside much this week. Try a 15-minute outdoor walk today.",
      action: 'Add to plan',
    },
    {
      icon: Moon,
      color: 'purple',
      title: 'Sleep consistency',
      message: 'Your sleep schedule varies by 2+ hours. Try going to bed at the same time.',
      action: 'Set reminder',
    },
    {
      icon: Activity,
      color: 'blue',
      title: 'Great streak!',
      message: "You've hit your active minutes goal for 5 days straight. Keep it up!",
      action: null,
    },
    {
      icon: Heart,
      color: 'red',
      title: 'Heart rate trend',
      message: 'Your resting heart rate has improved by 3 bpm this month. Excellent progress!',
      action: null,
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Insights</Text>
          <Text style={styles.subtitle}>What Trackme suggests today</Text>
        </View>

        <View style={styles.content}>
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            const colors = colorMap[insight.color];
            return (
              <View key={index} style={styles.card}>
                <View style={styles.cardContent}>
                  <View style={[styles.iconContainer, { backgroundColor: colors.bg }]}>
                    <Icon size={24} color={colors.color} />
                  </View>
                  <View style={styles.textContent}>
                    <Text style={styles.insightTitle}>{insight.title}</Text>
                    <Text style={styles.insightMessage}>{insight.message}</Text>
                  </View>
                </View>
                
                {insight.action && (
                  <View style={styles.actions}>
                    <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
                      <Text style={styles.actionButtonText}>{insight.action}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.dismissButton} activeOpacity={0.7}>
                      <Text style={styles.dismissButtonText}>Dismiss</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            );
          })}

          {/* Weekly Summary */}
          <View style={styles.summaryCard}>
            <View style={styles.summaryHeader}>
              <View style={styles.summaryIconContainer}>
                <TrendingUp size={24} color="#fff" />
              </View>
              <Text style={styles.summaryTitle}>Weekly Summary</Text>
            </View>
            
            <View style={styles.summaryContent}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Average steps</Text>
                <Text style={styles.summaryValue}>6,840 / day</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Workouts completed</Text>
                <Text style={styles.summaryValue}>5 sessions</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Calories avg</Text>
                <Text style={styles.summaryValue}>1,850 kcal</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Sleep avg</Text>
                <Text style={styles.summaryValue}>7h 15m</Text>
              </View>
            </View>

            <View style={styles.summaryFooter}>
              <Text style={styles.summaryMessage}>
                You're doing great! Keep up the momentum this week.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <BottomNav activeTab="insights" onNavigate={onNavigate} />
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
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#6b7280',
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
  cardContent: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContent: {
    flex: 1,
    minWidth: 0,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  insightMessage: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    marginLeft: 64,
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#ccfbf1',
    borderRadius: 12,
  },
  actionButtonText: {
    color: '#14b8a6',
    fontSize: 14,
    fontWeight: '600',
  },
  dismissButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  dismissButtonText: {
    color: '#6b7280',
    fontSize: 14,
    fontWeight: '600',
  },
  summaryCard: {
    backgroundColor: '#14b8a6',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  summaryIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  summaryContent: {
    gap: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  summaryValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  summaryFooter: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  summaryMessage: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 20,
  },
});
