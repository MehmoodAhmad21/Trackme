import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { ChevronRight, Heart, Calendar, Activity, Utensils } from 'lucide-react-native';
import { Button } from './Button';

interface OnboardingScreenProps {
  onGetStarted: () => void;
}

export function OnboardingScreen({ onGetStarted }: OnboardingScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'Welcome to Trackme',
      subtitle: 'Track your life. Improve every day.',
      icon: Heart,
      features: [],
    },
    {
      title: 'All Your Data in One Place',
      subtitle: 'Everything you need to stay healthy and productive',
      icon: Activity,
      features: [
        { icon: Utensils, text: 'Track meals & calories' },
        { icon: Calendar, text: 'Manage tasks & events' },
        { icon: Activity, text: 'Monitor steps & workouts' },
        { icon: Heart, text: 'Record health vitals' },
      ],
    },
    {
      title: 'Smart Suggestions',
      subtitle: 'Get personalized insights to improve your health and habits',
      icon: Activity,
      features: [],
    },
  ];

  const slide = slides[currentSlide];
  const SlideIcon = slide.icon;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Logo/Icon */}
        <View style={styles.iconContainer}>
          <SlideIcon size={48} color="#fff" strokeWidth={2} />
        </View>

        {/* Title */}
        <Text style={styles.title}>
          {slide.title}
        </Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          {slide.subtitle}
        </Text>

        {/* Features */}
        {slide.features.length > 0 && (
          <View style={styles.featuresContainer}>
            {slide.features.map((feature, index) => {
              const FeatureIcon = feature.icon;
              return (
                <View key={index} style={styles.featureItem}>
                  <View style={styles.featureIconContainer}>
                    <FeatureIcon size={20} color="#14b8a6" />
                  </View>
                  <Text style={styles.featureText}>{feature.text}</Text>
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomContainer}>
        {/* Dots Indicator */}
        <View style={styles.dotsContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentSlide ? styles.dotActive : styles.dotInactive
              ]}
            />
          ))}
        </View>

        {currentSlide < slides.length - 1 ? (
          <TouchableOpacity
            onPress={() => setCurrentSlide(currentSlide + 1)}
            style={styles.nextButton}
            activeOpacity={0.8}
          >
            <Text style={styles.nextButtonText}>Next</Text>
            <ChevronRight size={20} color="#fff" />
          </TouchableOpacity>
        ) : (
          <View style={styles.finalActions}>
            <Button onPress={onGetStarted} style={styles.getStartedButton}>
              Get Started
            </Button>
            <TouchableOpacity onPress={onGetStarted}>
              <Text style={styles.loginText}>Log in</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fdfa',
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingBottom: 80,
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 24,
    backgroundColor: '#14b8a6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    color: '#111827',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#6b7280',
    marginBottom: 48,
    maxWidth: 320,
  },
  featuresContainer: {
    width: '100%',
    maxWidth: 320,
    marginBottom: 32,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  featureIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#ccfbf1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: {
    flex: 1,
    color: '#374151',
    fontSize: 15,
  },
  bottomContainer: {
    paddingHorizontal: 32,
    paddingBottom: 48,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 32,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    width: 32,
    backgroundColor: '#14b8a6',
  },
  dotInactive: {
    width: 8,
    backgroundColor: '#d1d5db',
  },
  nextButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: '#14b8a6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  finalActions: {
    gap: 12,
  },
  getStartedButton: {
    width: '100%',
  },
  loginText: {
    textAlign: 'center',
    color: '#14b8a6',
    fontSize: 16,
    fontWeight: '600',
    paddingVertical: 12,
  },
});
