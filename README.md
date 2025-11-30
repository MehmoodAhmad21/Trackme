# Trackme

Trackme is a React Native mobile app that helps you stay on top of your life by tracking everything that matters such as your tasks, events, diet, exercise, and health vitals. It connects to Apple HealthKit to pull in real health data like steps and heart rate, then uses AI to give you personalized suggestions based on your habits and goals.

When you log meals, the app automatically looks up nutrition information so you don't have to. It analyzes your activity patterns and gives you helpful nudges when you're falling behind on your goals or could use a boost.

**Tech Stack:**

- Frontend: React Native with Expo (TypeScript) + Apple HealthKit integration
- Backend: FastAPI (Python) + SQLite database
- API Integrations: Nutritionix/Edamam for automatic meal nutrition lookup

**How to Access:**

**Backend Setup:**

In the `/Backend` directory:

1. Set up a Python virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate
   ```

2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Run the backend server:
   ```
   ./run.sh
   ```
   
   The API will be available at http://localhost:8000 with docs at http://localhost:8000/docs

**Frontend Setup:**

In the `/Frontend` directory:

1. Install dependencies:
   ```
   npm install
   ```

2. Run the app:
   ```
   npm start
   ```

The mobile app communicates with the backend via REST API, pulling in data from HealthKit and nutrition databases to give you a complete picture of your health and productivity. The AI insights engine automatically analyzes your patterns and sends you personalized suggestions to help you improve.
