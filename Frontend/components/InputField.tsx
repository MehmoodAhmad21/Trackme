import { View, Text, TextInput, StyleSheet } from 'react-native';

interface InputFieldProps {
  placeholder: string;
  label?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
}

export function InputField({ 
  placeholder, 
  label, 
  value, 
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default'
}: InputFieldProps) {
  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>
          {label}
        </Text>
      )}
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        style={styles.input}
        placeholderTextColor="#9ca3af"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    color: '#374151',
    marginBottom: 8,
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '500',
  },
  input: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 16,
    fontSize: 16,
  },
});
