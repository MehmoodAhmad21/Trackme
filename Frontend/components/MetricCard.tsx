import { View, Text, StyleSheet } from 'react-native';

interface MetricCardProps {
  label: string;
  value: string;
  target?: string;
  icon: React.ReactNode;
  color?: string;
  progress?: number;
}

export function MetricCard({ label, value, target, icon, color = '#14b8a6', progress }: MetricCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
          {icon}
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.valueContainer}>
          <Text style={styles.value}>{value}</Text>
          {target && <Text style={styles.target}>/ {target}</Text>}
        </View>
      </View>

      {progress !== undefined && (
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${Math.min(progress, 100)}%`, backgroundColor: color }
            ]}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    minWidth: 160,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    gap: 4,
  },
  label: {
    fontSize: 14,
    color: '#6b7280',
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
  target: {
    fontSize: 16,
    color: '#9ca3af',
  },
  progressBar: {
    marginTop: 12,
    height: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
});
