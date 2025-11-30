import { View, Text, StyleSheet } from 'react-native';

interface VitalCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  unit?: string;
  color?: string;
}

const colorMap: Record<string, string> = {
  teal: '#ccfbf1',
  red: '#fee2e2',
  blue: '#dbeafe',
  purple: '#e9d5ff',
  green: '#d1fae5',
};

export function VitalCard({ icon, label, value, unit, color = 'teal' }: VitalCardProps) {
  const bgColor = colorMap[color] || colorMap.teal;

  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: bgColor }]}>
        {icon}
      </View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.valueContainer}>
        <Text style={styles.value}>{value}</Text>
        {unit && <Text style={styles.unit}>{unit}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  value: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  unit: {
    fontSize: 14,
    color: '#6b7280',
  },
});
