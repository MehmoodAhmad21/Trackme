import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronRight, Target, Smartphone, Bell, FileText, LogOut, User } from 'lucide-react-native';
import { BottomNav } from './BottomNav';
import type { Screen } from '../App';

interface ProfileScreenProps {
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
}

export function ProfileScreen({ onNavigate, onLogout }: ProfileScreenProps) {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>

          {/* User Info */}
          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <User size={36} color="#fff" />
            </View>
            <View style={styles.userDetails}>
              <Text style={styles.userName}>Sarah Johnson</Text>
              <Text style={styles.userEmail}>sarah.j@email.com</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.editButton}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.content}>
          {/* Goals Section */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={[styles.iconContainer, { backgroundColor: '#ccfbf1' }]}>
                <Target size={20} color="#14b8a6" />
              </View>
              <Text style={styles.cardTitle}>Daily Goals</Text>
            </View>
            
            <View style={styles.list}>
              <View style={[styles.listItem, styles.listItemBorder]}>
                <View style={styles.listItemContent}>
                  <Text style={styles.listItemTitle}>Step Goal</Text>
                  <Text style={styles.listItemSubtitle}>Daily target</Text>
                </View>
                <View style={styles.listItemRight}>
                  <Text style={styles.listItemValue}>8,000</Text>
                  <ChevronRight size={20} color="#9ca3af" />
                </View>
              </View>

              <View style={[styles.listItem, styles.listItemBorder]}>
                <View style={styles.listItemContent}>
                  <Text style={styles.listItemTitle}>Calorie Target</Text>
                  <Text style={styles.listItemSubtitle}>Daily intake</Text>
                </View>
                <View style={styles.listItemRight}>
                  <Text style={styles.listItemValue}>2,000 kcal</Text>
                  <ChevronRight size={20} color="#9ca3af" />
                </View>
              </View>

              <View style={styles.listItem}>
                <View style={styles.listItemContent}>
                  <Text style={styles.listItemTitle}>Sleep Goal</Text>
                  <Text style={styles.listItemSubtitle}>Nightly target</Text>
                </View>
                <View style={styles.listItemRight}>
                  <Text style={styles.listItemValue}>8 hours</Text>
                  <ChevronRight size={20} color="#9ca3af" />
                </View>
              </View>
            </View>
          </View>

          {/* Connected Apps */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={[styles.iconContainer, { backgroundColor: '#dbeafe' }]}>
                <Smartphone size={20} color="#3b82f6" />
              </View>
              <Text style={styles.cardTitle}>Connected Apps & Devices</Text>
            </View>
            
            <View style={styles.list}>
              <View style={[styles.listItem, styles.listItemBorder]}>
                <View style={styles.listItemContent}>
                  <Text style={styles.listItemTitle}>Apple Health</Text>
                  <Text style={[styles.listItemSubtitle, { color: '#10b981' }]}>Connected</Text>
                </View>
                <ChevronRight size={20} color="#9ca3af" />
              </View>

              <View style={[styles.listItem, styles.listItemBorder]}>
                <View style={styles.listItemContent}>
                  <Text style={styles.listItemTitle}>Google Fit</Text>
                  <Text style={styles.listItemSubtitle}>Not connected</Text>
                </View>
                <ChevronRight size={20} color="#9ca3af" />
              </View>

              <View style={[styles.listItem, styles.listItemBorder]}>
                <View style={styles.listItemContent}>
                  <Text style={styles.listItemTitle}>Fitness Tracker</Text>
                  <Text style={[styles.listItemSubtitle, { color: '#10b981' }]}>Connected</Text>
                </View>
                <ChevronRight size={20} color="#9ca3af" />
              </View>

              <View style={styles.listItem}>
                <View style={styles.listItemContent}>
                  <Text style={styles.listItemTitle}>Glucose Monitor</Text>
                  <Text style={[styles.listItemSubtitle, { color: '#10b981' }]}>Connected</Text>
                </View>
                <ChevronRight size={20} color="#9ca3af" />
              </View>
            </View>
          </View>

          {/* Notifications */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={[styles.iconContainer, { backgroundColor: '#e9d5ff' }]}>
                <Bell size={20} color="#a855f7" />
              </View>
              <Text style={styles.cardTitle}>Notifications</Text>
            </View>
            
            <View style={styles.list}>
              <View style={[styles.listItem, styles.listItemBorder]}>
                <View style={styles.listItemContent}>
                  <Text style={styles.listItemTitle}>Meal Reminders</Text>
                  <Text style={styles.listItemSubtitle}>Breakfast, lunch, dinner</Text>
                </View>
                <View style={[styles.toggle, styles.toggleOn]}>
                  <View style={styles.toggleKnob} />
                </View>
              </View>

              <View style={[styles.listItem, styles.listItemBorder]}>
                <View style={styles.listItemContent}>
                  <Text style={styles.listItemTitle}>Step Reminders</Text>
                  <Text style={styles.listItemSubtitle}>Hourly activity nudges</Text>
                </View>
                <View style={[styles.toggle, styles.toggleOn]}>
                  <View style={styles.toggleKnob} />
                </View>
              </View>

              <View style={styles.listItem}>
                <View style={styles.listItemContent}>
                  <Text style={styles.listItemTitle}>Event Reminders</Text>
                  <Text style={styles.listItemSubtitle}>Upcoming tasks & events</Text>
                </View>
                <View style={[styles.toggle, styles.toggleOff]}>
                  <View style={styles.toggleKnob} />
                </View>
              </View>
            </View>
          </View>

          {/* Other Links */}
          <View style={styles.card}>
            <TouchableOpacity style={[styles.listItem, styles.listItemBorder]}>
              <View style={styles.linkContent}>
                <FileText size={20} color="#6b7280" />
                <Text style={styles.listItemTitle}>Privacy Policy</Text>
              </View>
              <ChevronRight size={20} color="#9ca3af" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onLogout}
              style={[styles.listItem, { paddingTop: 8 }]}
            >
              <View style={styles.linkContent}>
                <LogOut size={20} color="#ef4444" />
                <Text style={[styles.listItemTitle, { color: '#ef4444' }]}>Log out</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <BottomNav activeTab="profile" onNavigate={onNavigate} />
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
    marginBottom: 24,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: '#14b8a6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 15,
    color: '#6b7280',
  },
  editButton: {
    color: '#14b8a6',
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    gap: 24,
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
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  list: {
    gap: 0,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  listItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  listItemContent: {
    flex: 1,
  },
  listItemTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  listItemSubtitle: {
    fontSize: 13,
    color: '#6b7280',
  },
  listItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  listItemValue: {
    fontSize: 15,
    color: '#111827',
  },
  toggle: {
    width: 48,
    height: 28,
    borderRadius: 14,
    padding: 4,
  },
  toggleOn: {
    backgroundColor: '#14b8a6',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  toggleOff: {
    backgroundColor: '#d1d5db',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  toggleKnob: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  linkContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});
