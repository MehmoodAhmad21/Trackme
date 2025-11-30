import { useState } from 'react';
import { Heart } from 'lucide-react';
import { Button } from './Button';
import { InputField } from './InputField';

interface AuthScreenProps {
  onLogin: () => void;
}

export function AuthScreen({ onLogin }: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="h-full flex flex-col bg-white px-8">
      {/* Logo */}
      <div className="flex flex-col items-center pt-20 mb-12">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center mb-4 shadow-lg">
          <Heart size={40} className="text-white" strokeWidth={2} />
        </div>
        <h1 className="text-gray-900">Trackme</h1>
        <p className="text-gray-600 mt-2">
          {isLogin ? 'Welcome back' : 'Create your account'}
        </p>
      </div>

      {/* Form */}
      <div className="space-y-4 mb-6">
        <InputField
          type="email"
          placeholder="Email"
          label="Email"
        />
        <InputField
          type="password"
          placeholder="Password"
          label="Password"
        />
        {!isLogin && (
          <InputField
            type="password"
            placeholder="Confirm Password"
            label="Confirm Password"
          />
        )}
      </div>

      {isLogin && (
        <div className="flex justify-end mb-8">
          <button className="text-teal-600">
            Forgot password?
          </button>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-3 mb-6">
        <Button onClick={onLogin} className="w-full">
          {isLogin ? 'Log in' : 'Create account'}
        </Button>
        <Button 
          onClick={() => setIsLogin(!isLogin)} 
          variant="secondary" 
          className="w-full"
        >
          {isLogin ? 'Create account' : 'Log in instead'}
        </Button>
      </div>

      {/* Footer */}
      <div className="flex-1" />
      <p className="text-center text-gray-500 text-sm pb-12">
        By continuing, you agree to our Terms of Service and Privacy Policy
      </p>
    </div>
  );
}
