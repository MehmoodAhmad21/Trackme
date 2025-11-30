import { useState } from 'react';
import { ChevronRight, Heart, Calendar, Activity, Utensils } from 'lucide-react';
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
    <div className="h-full flex flex-col bg-gradient-to-b from-teal-50 to-white">
      <div className="flex-1 flex flex-col items-center justify-center px-8 pb-20">
        {/* Logo/Icon */}
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center mb-8 shadow-lg">
          <SlideIcon size={48} className="text-white" strokeWidth={2} />
        </div>

        {/* Title */}
        <h1 className="text-center text-gray-900 mb-3">
          {slide.title}
        </h1>

        {/* Subtitle */}
        <p className="text-center text-gray-600 mb-12 max-w-sm">
          {slide.subtitle}
        </p>

        {/* Features */}
        {slide.features.length > 0 && (
          <div className="space-y-4 w-full max-w-sm mb-8">
            {slide.features.map((feature, index) => {
              const FeatureIcon = feature.icon;
              return (
                <div key={index} className="flex items-center gap-4 bg-white rounded-2xl px-5 py-4 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center flex-shrink-0">
                    <FeatureIcon size={20} className="text-teal-600" />
                  </div>
                  <span className="text-gray-700">{feature.text}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="px-8 pb-12">
        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mb-8">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide
                  ? 'w-8 bg-teal-500'
                  : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>

        {currentSlide < slides.length - 1 ? (
          <button
            onClick={() => setCurrentSlide(currentSlide + 1)}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-teal-500 text-white shadow-sm transition-all active:scale-95"
          >
            <span>Next</span>
            <ChevronRight size={20} />
          </button>
        ) : (
          <div className="space-y-3">
            <Button onClick={onGetStarted} className="w-full">
              Get Started
            </Button>
            <button
              onClick={onGetStarted}
              className="w-full text-teal-600"
            >
              Log in
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
