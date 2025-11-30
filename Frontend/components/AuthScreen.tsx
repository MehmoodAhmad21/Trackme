import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Heart } from 'lucide-react-native';
import { Button } from './Button';
import { InputField } from './InputField';

interface AuthScreenProps {
  onLogin: () => void;
}

export function AuthScreen({ onLogin }: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Logo */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Heart size={40} color="#fff" strokeWidth={2} />
          </View>
          <Text style={styles.title}>Trackme</Text>
          <Text style={styles.subtitle}>
            {isLogin ? 'Welcome back' : 'Create your account'}
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <InputField
            placeholder="Email"
            label="Email"
            keyboardType="email-address"
          />
          <InputField
            placeholder="Password"
            label="Password"
            secureTextEntry
          />
          {!isLogin && (
            <InputField
              placeholder="Confirm Password"
              label="Confirm Password"
              secureTextEntry
            />
          )}
        </View>

        {isLogin && (
          <View style={styles.forgotPassword}>
            <TouchableOpacity>
              <Text style={styles.forgotPasswordText}>
                Forgot password?
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.actions}>
          <Button onPress={onLogin} style={styles.button}>
            {isLogin ? 'Log in' : 'Create account'}
          </Button>
          <Button 
            onPress={() => setIsLogin(!isLogin)} 
            variant="secondary" 
            style={styles.button}
          >
            {isLogin ? 'Create account' : 'Log in instead'}
          </Button>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          By continuing, you agree to our Terms of Service and Privacy Policy
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 32,
  },
  header: {
    alignItems: 'center',
    paddingTop: 80,
    marginBottom: 48,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: '#14b8a6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 8,
  },
  form: {
    gap: 16,
    marginBottom: 24,
  },
  forgotPassword: {
    alignItems: 'flex-end',
    marginBottom: 32,
  },
  forgotPasswordText: {
    color: '#14b8a6',
    fontSize: 14,
    fontWeight: '600',
  },
  actions: {
    gap: 12,
    marginBottom: 24,
  },
  button: {
    width: '100%',
  },
  footer: {
    textAlign: 'center',
    color: '#9ca3af',
    fontSize: 12,
    paddingVertical: 48,
  },
});
