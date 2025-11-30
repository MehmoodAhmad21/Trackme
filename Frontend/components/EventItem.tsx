import { View, Text, StyleSheet } from 'react-native';

interface EventItemProps {
  title: string;
  time: string;
  location?: string;
  color?: string;
}

const colorMap: Record<string, string> = {
  teal: '#ccfbf1',
  blue: '#dbeafe',
  purple: '#e9d5ff',
  red: '#fee2e2',
};

export function EventItem({ title, time, location, color = 'teal' }: EventItemProps) {
  const bgColor = colorMap[color] || colorMap.teal;

  return (
    <View style={styles.container}>
      <View style={styles.timeContainer}>
        <Text style={styles.time}>{time}</Text>
      </View>
      <View style={[styles.content, { backgroundColor: bgColor }]}>
        <Text style={styles.title}>{title}</Text>
        {location && <Text style={styles.location}>{location}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  timeContainer: {
    minWidth: 60,
    paddingTop: 4,
  },
  time: {
    textAlign: 'center',
    color: '#14b8a6',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  title: {
    color: '#111827',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  location: {
    color: '#6b7280',
    fontSize: 13,
  },
});
