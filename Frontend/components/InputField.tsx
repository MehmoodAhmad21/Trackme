interface InputFieldProps {
  type?: string;
  placeholder: string;
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputField({ type = 'text', placeholder, label, value, onChange }: InputFieldProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-gray-700 mb-2 ml-1">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
      />
    </div>
  );
}
