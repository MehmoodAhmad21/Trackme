interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'text';
  className?: string;
}

export function Button({ children, onClick, variant = 'primary', className = '' }: ButtonProps) {
  const baseClasses = 'px-6 py-3.5 rounded-2xl transition-all active:scale-95';
  
  const variantClasses = {
    primary: 'bg-teal-500 text-white shadow-sm',
    secondary: 'bg-white text-teal-600 border-2 border-teal-500',
    text: 'bg-transparent text-teal-600',
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
