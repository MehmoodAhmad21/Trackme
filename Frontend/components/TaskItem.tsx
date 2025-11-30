import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Check } from 'lucide-react-native';

interface TaskItemProps {
  title: string;
  time?: string;
  completed?: boolean;
  tag?: string;
  tagColor?: string;
  onToggle?: () => void;
}

export function TaskItem({ title, time, completed = false, tag, tagColor = '#3b82f6', onToggle }: TaskItemProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onToggle}
        style={[
          styles.checkbox,
          completed && styles.checkboxCompleted
        ]}
      >
        {completed && <Check size={16} color="#fff" strokeWidth={3} />}
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={[styles.title, completed && styles.titleCompleted]}>
          {title}
        </Text>
        {time && (
          <Text style={styles.time}>{time}</Text>
        )}
      </View>

      {tag && (
        <View style={[styles.tag, { backgroundColor: tagColor + '20' }]}>
          <Text style={[styles.tagText, { color: tagColor }]}>
            {tag}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#d1d5db',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxCompleted: {
    backgroundColor: '#14b8a6',
    borderColor: '#14b8a6',
  },
  content: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    fontSize: 15,
    color: '#111827',
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: '#9ca3af',
  },
  time: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 2,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
