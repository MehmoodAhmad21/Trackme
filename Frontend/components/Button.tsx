import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'text';
  style?: any;
}

export function Button({ children, onPress, variant = 'primary', style }: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.base, variant === 'text' ? styles.textVariant : styles[variant], style]}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, styles[`${variant}Text`]]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: '#14b8a6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  secondary: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#14b8a6',
  },
  textVariant: {
    backgroundColor: 'transparent',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    color: '#fff',
  },
  secondaryText: {
    color: '#14b8a6',
  },
  textText: {
    color: '#14b8a6',
  },
});
