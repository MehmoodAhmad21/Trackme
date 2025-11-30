# Frontend Integration Guide

This guide explains how to connect your Trackme frontend to the backend API.

## Setup

### 1. Install Dependencies

The API client uses the standard Fetch API, which is built into React Native. No additional dependencies needed!

### 2. Configure API URL

Create a `.env` file in your Frontend directory:

```bash
EXPO_PUBLIC_API_URL=http://localhost:8000
```

For physical device testing, use your computer's IP address:
```bash
EXPO_PUBLIC_API_URL=http://192.168.1.100:8000
```

### 3. Import API Client

The API client is available at `Frontend/api/client.ts`:

```typescript
import api from './api/client';
```

## Usage Examples

### Authentication

```typescript
// Register
try {
  const user = await api.register('John Doe', 'john@example.com', 'password123');
  console.log('Registered:', user);
} catch (error) {
  console.error('Registration failed:', error);
}

// Login
try {
  const response = await api.login('john@example.com', 'password123');
  // Token is automatically stored in the client
  console.log('Logged in, token:', response.access_token);
} catch (error) {
  console.error('Login failed:', error);
}

// Get current user
const user = await api.getCurrentUser();
```

### Tasks

```typescript
// Get all tasks
const tasks = await api.getTasks();

// Get tasks for a specific date
const todayTasks = await api.getTasks({ date: '2025-11-30' });

// Create task
const newTask = await api.createTask({
  title: 'Buy groceries',
  description: 'Milk, bread, eggs',
  status: 'todo',
  tag: 'personal',
  due_datetime: '2025-12-01T10:00:00Z'
});

// Update task
await api.updateTask(taskId, { status: 'done' });

// Delete task
await api.deleteTask(taskId);
```

### Events/Calendar

```typescript
// Get events in date range
const events = await api.getEvents({
  from: '2025-11-01T00:00:00Z',
  to: '2025-11-30T23:59:59Z'
});

// Create event
const newEvent = await api.createEvent({
  title: 'Team Meeting',
  description: 'Weekly sync',
  start_datetime: '2025-12-01T14:00:00Z',
  end_datetime: '2025-12-01T15:00:00Z',
  location: 'Conference Room A'
});
```

### Diet/Meals

```typescript
// Log meal with automatic nutrition lookup
const meal = await api.createMeal({
  name: 'Breakfast',
  meal_type: 'breakfast',
  datetime: new Date().toISOString(),
  food_name: 'chicken salad',
  quantity: '200g'
});

// Log meal with manual nutrition data
const manualMeal = await api.createMeal({
  name: 'Lunch',
  meal_type: 'lunch',
  datetime: new Date().toISOString(),
  calories: 500,
  carbs: 60,
  protein: 30,
  fat: 15
});

// Get today's meals
const todayMeals = await api.getMeals({ date: '2025-11-30' });

// Get diet summary
const summary = await api.getDietSummary({
  from: '2025-11-24',
  to: '2025-11-30'
});
```

### Health Data

```typescript
// Log steps (from Apple HealthKit)
await api.createOrUpdateSteps({
  date: '2025-11-30',
  step_count: 8542,
  source: 'apple_healthkit'
});

// Get step history
const steps = await api.getStepSummary({
  from: '2025-11-24',
  to: '2025-11-30'
});

// Log vital (heart rate, blood glucose, etc.)
await api.createVital({
  type: 'heart_rate',
  value: 72,
  unit: 'bpm',
  recorded_at: new Date().toISOString()
});

// Get vitals by type
const heartRates = await api.getVitalsByType('heart_rate', {
  from: '2025-11-01T00:00:00Z',
  to: '2025-11-30T23:59:59Z'
});

// Log activity/workout
await api.createActivity({
  type: 'run',
  duration_minutes: 30,
  distance_km: 5.0,
  calories_burned: 300,
  datetime: new Date().toISOString(),
  notes: 'Morning run in the park'
});
```

### Insights

```typescript
// Get today's insights
const insights = await api.getTodayInsights();

// Dismiss an insight
await api.dismissInsight(insightId);
```

### Profile & Goals

```typescript
// Get profile
const profile = await api.getProfile();

// Update profile
await api.updateProfile({
  name: 'John Smith'
});

// Get goals
const goals = await api.getGoals();

// Update goals
await api.updateGoals({
  daily_step_goal: 12000,
  daily_calorie_goal: 2200
});

// Get service connections
const connections = await api.getConnections();

// Update connections
await api.updateConnections({
  apple_health_connected: true
});
```

## Apple HealthKit Integration

To integrate Apple HealthKit data:

1. Request HealthKit permissions in your React Native app
2. Fetch data from HealthKit
3. Push to backend using the API:

```typescript
import AppleHealthKit from 'react-native-health';

// Example: Sync steps to backend
const syncStepsToBackend = async (date: Date) => {
  const options = {
    date: date.toISOString(),
    includeManuallyAdded: true,
  };
  
  AppleHealthKit.getStepCount(options, async (err, results) => {
    if (!err) {
      await api.createOrUpdateSteps({
        date: date.toISOString().split('T')[0],
        step_count: results.value,
        source: 'apple_healthkit'
      });
    }
  });
};

// Example: Sync heart rate
const syncHeartRateToBackend = async () => {
  const options = {
    startDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date().toISOString(),
  };
  
  AppleHealthKit.getHeartRateSamples(options, async (err, results) => {
    if (!err) {
      for (const sample of results) {
        await api.createVital({
          type: 'heart_rate',
          value: sample.value,
          unit: 'bpm',
          recorded_at: sample.startDate
        });
      }
    }
  });
};
```

## Error Handling

The API client throws errors on failure. Always wrap calls in try-catch:

```typescript
try {
  const tasks = await api.getTasks();
  // Handle success
} catch (error) {
  if (error instanceof Error) {
    console.error('API Error:', error.message);
    // Show error to user
  }
}
```

## Authentication State Management

Store the token in AsyncStorage for persistence:

```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api/client';

// On app start
const loadToken = async () => {
  const token = await AsyncStorage.getItem('auth_token');
  if (token) {
    api.setToken(token);
  }
};

// After login
const handleLogin = async (email: string, password: string) => {
  try {
    const response = await api.login(email, password);
    await AsyncStorage.setItem('auth_token', response.access_token);
    // Navigate to home screen
  } catch (error) {
    // Handle error
  }
};

// On logout
const handleLogout = async () => {
  api.setToken(null);
  await AsyncStorage.removeItem('auth_token');
  // Navigate to login screen
};
```

## Testing the Connection

1. Start the backend:
   ```bash
   cd backend
   uvicorn app.main:app --reload
   ```

2. Test in your frontend:
   ```typescript
   // Test health check
   const testConnection = async () => {
     try {
       const response = await fetch('http://localhost:8000/health');
       const data = await response.json();
       console.log('Backend status:', data);
     } catch (error) {
       console.error('Cannot connect to backend:', error);
     }
   };
   ```

## Production Deployment

When deploying to production:

1. Update `EXPO_PUBLIC_API_URL` to your production backend URL
2. Ensure HTTPS is used
3. Update CORS settings in backend `.env`

Example production `.env`:
```bash
EXPO_PUBLIC_API_URL=https://api.trackme.com
```

## Common Issues

### CORS Errors
- Add your frontend URL to `CORS_ORIGINS` in backend `.env`

### Network Request Failed
- On physical device, use your computer's IP instead of localhost
- Ensure backend is running
- Check firewall settings

### Authentication Errors
- Ensure token is being sent in headers
- Check token hasn't expired (default: 7 days)
- Verify JWT_SECRET matches between requests

## Next Steps

1. Implement authentication flow in your app
2. Replace mock data in screens with API calls
3. Add loading states and error handling
4. Implement data caching/offline support if needed
5. Set up Apple HealthKit sync

For full API documentation, visit http://localhost:8000/docs when the backend is running.

