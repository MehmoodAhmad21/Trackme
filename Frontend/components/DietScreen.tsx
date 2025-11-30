import { ChevronLeft, ChevronRight, Plus, TrendingUp } from 'lucide-react';

interface DietScreenProps {
  onBack: () => void;
}

export function DietScreen({ onBack }: DietScreenProps) {
  const totalCalories = 1250;
  const goalCalories = 2000;
  const progress = (totalCalories / goalCalories) * 100;

  const meals = [
    {
      name: 'Breakfast',
      items: [
        { name: 'Oatmeal with berries', calories: 280 },
        { name: 'Greek yogurt', calories: 120 },
      ],
    },
    {
      name: 'Lunch',
      items: [
        { name: 'Grilled chicken salad', calories: 380 },
        { name: 'Apple', calories: 95 },
      ],
    },
    {
      name: 'Dinner',
      items: [
        { name: 'Salmon with vegetables', calories: 375 },
      ],
    },
    {
      name: 'Snacks',
      items: [],
    },
  ];

  return (
    <div className="h-full bg-gray-50 overflow-auto">
      {/* Header */}
      <div className="bg-white px-6 pt-14 pb-6">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={onBack} className="p-2 -ml-2">
            <ChevronLeft size={24} className="text-gray-900" />
          </button>
          <h1 className="text-gray-900 flex-1">Nutrition</h1>
        </div>

        {/* Date Picker */}
        <div className="flex items-center justify-between mb-6">
          <button className="p-2">
            <ChevronLeft size={20} className="text-gray-600" />
          </button>
          <p className="text-gray-900">Today, Dec 3</p>
          <button className="p-2">
            <ChevronRight size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Calorie Progress Circle */}
        <div className="flex justify-center mb-6">
          <div className="relative w-48 h-48">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="88"
                fill="none"
                stroke="#f3f4f6"
                strokeWidth="12"
              />
              <circle
                cx="96"
                cy="96"
                r="88"
                fill="none"
                stroke="#14b8a6"
                strokeWidth="12"
                strokeDasharray={`${2 * Math.PI * 88}`}
                strokeDashoffset={`${2 * Math.PI * 88 * (1 - progress / 100)}`}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-gray-900">{totalCalories}</p>
              <p className="text-gray-500">of {goalCalories} kcal</p>
            </div>
          </div>
        </div>

        {/* Macros */}
        <div className="flex gap-4 justify-center">
          <div className="text-center">
            <div className="w-3 h-3 rounded-full bg-orange-500 mx-auto mb-1" />
            <p className="text-gray-600 mb-1">Carbs</p>
            <p className="text-gray-900">142g</p>
          </div>
          <div className="text-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mx-auto mb-1" />
            <p className="text-gray-600 mb-1">Protein</p>
            <p className="text-gray-900">68g</p>
          </div>
          <div className="text-center">
            <div className="w-3 h-3 rounded-full bg-yellow-500 mx-auto mb-1" />
            <p className="text-gray-600 mb-1">Fat</p>
            <p className="text-gray-900">42g</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-4">
        {/* Meals */}
        {meals.map((meal, index) => (
          <div key={index} className="bg-white rounded-3xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-gray-900">{meal.name}</h3>
              <button className="text-teal-500 flex items-center gap-1">
                <Plus size={18} />
                <span>Add</span>
              </button>
            </div>
            
            {meal.items.length > 0 ? (
              <div className="space-y-2">
                {meal.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex justify-between items-center py-2">
                    <p className="text-gray-700">{item.name}</p>
                    <p className="text-gray-500">{item.calories} kcal</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 py-2">No items logged</p>
            )}
          </div>
        ))}

        {/* Insight */}
        <div className="bg-teal-50 rounded-2xl p-4 border border-teal-100 flex gap-3">
          <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <TrendingUp size={20} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="text-gray-900 mb-1">Great job!</p>
            <p className="text-gray-600">You're on track with your calorie goal. Keep it up!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
