import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronLeft, ChevronRight, Plus, TrendingUp } from 'lucide-react-native';
import { BottomNav } from './BottomNav';
import type { Screen } from '../App';

interface DietScreenProps {
  onBack: () => void;
}

export function DietScreen({ onBack }: DietScreenProps) {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack}>
            <ChevronLeft size={24} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.title}>Diet</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Date Navigation */}
        <View style={styles.dateNav}>
          <TouchableOpacity>
            <ChevronLeft size={20} color="#6b7280" />
          </TouchableOpacity>
          <Text style={styles.dateText}>Today, Nov 15</Text>
          <TouchableOpacity>
            <ChevronRight size={20} color="#6b7280" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {/* Calories Summary */}
          <View style={styles.summaryCard}>
            <View style={styles.calorieRow}>
              <View style={styles.calorieBlock}>
                <Text style={styles.calorieLabel}>Consumed</Text>
                <Text style={styles.calorieValue}>1,250</Text>
              </View>
              <View style={styles.calorieBlock}>
                <Text style={styles.calorieLabel}>Remaining</Text>
                <Text style={[styles.calorieValue, { color: '#14b8a6' }]}>750</Text>
              </View>
              <View style={styles.calorieBlock}>
                <Text style={styles.calorieLabel}>Goal</Text>
                <Text style={styles.calorieValue}>2,000</Text>
              </View>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '62.5%' }]} />
            </View>

            {/* Macros */}
            <View style={styles.macrosRow}>
              <View style={styles.macroItem}>
                <Text style={styles.macroLabel}>Carbs</Text>
                <Text style={styles.macroValue}>120g</Text>
              </View>
              <View style={styles.macroItem}>
                <Text style={styles.macroLabel}>Protein</Text>
                <Text style={styles.macroValue}>65g</Text>
              </View>
              <View style={styles.macroItem}>
                <Text style={styles.macroLabel}>Fat</Text>
                <Text style={styles.macroValue}>42g</Text>
              </View>
            </View>
          </View>

          {/* Meals */}
          {['Breakfast', 'Lunch', 'Dinner'].map((meal, index) => (
            <View key={meal} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{meal}</Text>
                <Text style={styles.calories}>{[420, 580, 250][index]} kcal</Text>
              </View>
              <Text style={styles.mealDescription}>
                {['Oatmeal with berries, Coffee', 'Grilled chicken salad, Water', 'Salmon with vegetables'][index]}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.fab} activeOpacity={0.8}>
        <Plus size={28} color="#fff" strokeWidth={2.5} />
      </TouchableOpacity>

      <View style={{ height: 88, backgroundColor: '#f9fafb' }} />
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  dateNav: {
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  dateText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  content: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    gap: 16,
    paddingBottom: 120,
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  calorieRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  calorieBlock: {
    alignItems: 'center',
  },
  calorieLabel: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 4,
  },
  calorieValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 20,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#14b8a6',
    borderRadius: 4,
  },
  macrosRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  macroItem: {
    alignItems: 'center',
  },
  macroLabel: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 4,
  },
  macroValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  calories: {
    fontSize: 16,
    fontWeight: '600',
    color: '#14b8a6',
  },
  mealDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
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
