# Trackme Backend

Production-ready FastAPI backend for the Trackme life-tracking mobile application.

## Features

- **JWT Authentication** - Secure user registration and login
- **Task Management** - Create, update, and track tasks with due dates and tags
- **Event Calendar** - Schedule and manage events with location support
- **Diet Tracking** - Log meals with automatic nutrition data via external API
- **Health Integration** - Track steps, vitals, and activities (Apple HealthKit compatible)
- **Insights Engine** - AI-powered suggestions based on user data
- **Profile & Goals** - Customizable health and fitness goals

## Tech Stack

- **FastAPI** - Modern, fast web framework
- **SQLAlchemy** - SQL toolkit and ORM
- **PostgreSQL / SQLite** - Database (PostgreSQL for production, SQLite for local dev)
- **JWT** - Secure authentication
- **Pydantic** - Data validation
- **Pytest** - Testing framework

## Project Structure

```
backend/
├── app/
│   ├── api/
│   │   └── routes/          # API route modules
│   │       ├── auth.py      # Authentication endpoints
│   │       ├── tasks.py     # Task management
│   │       ├── events.py    # Event/calendar endpoints
│   │       ├── diet.py      # Meal tracking & nutrition
│   │       ├── health.py    # Health data (steps, vitals, activities)
│   │       ├── insights.py  # Insights/suggestions
│   │       └── profile.py   # User profile & goals
│   ├── core/
│   │   ├── config.py        # App configuration
│   │   └── security.py      # JWT & password handling
│   ├── db/
│   │   ├── base.py          # SQLAlchemy base
│   │   └── session.py       # Database session
│   ├── models/              # SQLAlchemy models
│   ├── schemas/             # Pydantic schemas
│   ├── services/            # Business logic
│   │   ├── nutrition_api.py # Nutrition API client
│   │   └── insights.py      # Insights engine
│   ├── tests/               # Test suite
│   └── main.py              # FastAPI app entry point
├── requirements.txt
├── .env.example
└── README.md
```

## Setup Instructions

### 1. Prerequisites

- Python 3.9+
- PostgreSQL (optional, for production)

### 2. Clone and Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 3. Configure Environment

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Edit `.env`:

```env
# Database - Use SQLite for local development
DATABASE_URL=sqlite:///./trackme.db

# Or PostgreSQL for production
# DATABASE_URL=postgresql://user:password@localhost:5432/trackme

# JWT Secret - Change this!
JWT_SECRET=your-secret-key-change-this-in-production
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=10080

# Nutrition API (optional - uses mock data if not configured)
NUTRITION_API_KEY=your-nutritionix-api-key
NUTRITION_API_URL=https://api.nutritionix.com/v1_1

# CORS - Add your frontend URLs
CORS_ORIGINS=http://localhost:8081,http://localhost:19006
```

### 4. Run the Server

```bash
# Development server with auto-reload
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at:
- API: http://localhost:8000
- Interactive docs: http://localhost:8000/docs
- Alternative docs: http://localhost:8000/redoc

### 5. Run Tests

```bash
pytest
```

## API Documentation

Once the server is running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Key Endpoints

#### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login and get JWT token
- `GET /api/v1/auth/me` - Get current user profile

#### Tasks
- `GET /api/v1/tasks` - List tasks
- `POST /api/v1/tasks` - Create task
- `PATCH /api/v1/tasks/{id}` - Update task
- `DELETE /api/v1/tasks/{id}` - Delete task

#### Events
- `GET /api/v1/events` - List events
- `POST /api/v1/events` - Create event
- `PATCH /api/v1/events/{id}` - Update event
- `DELETE /api/v1/events/{id}` - Delete event

#### Diet
- `GET /api/v1/diet/meals` - List meals
- `POST /api/v1/diet/meals` - Log meal (with auto nutrition lookup)
- `GET /api/v1/diet/summary` - Get daily nutrition summary

#### Health
- `POST /api/v1/health/steps` - Log daily steps
- `GET /api/v1/health/steps/summary` - Get step history
- `POST /api/v1/health/vitals` - Log vital (heart rate, blood glucose, etc.)
- `GET /api/v1/health/vitals/{type}` - Get vitals by type
- `POST /api/v1/health/activities` - Log activity/workout
- `GET /api/v1/health/activities` - Get activity history

#### Insights
- `GET /api/v1/insights/today` - Get current insights/suggestions
- `POST /api/v1/insights/{id}/dismiss` - Dismiss insight

#### Profile
- `GET /api/v1/profile` - Get user profile
- `PATCH /api/v1/profile` - Update profile
- `GET /api/v1/profile/goals` - Get user goals
- `PATCH /api/v1/profile/goals` - Update goals
- `GET /api/v1/profile/connections` - Get service connections
- `PATCH /api/v1/profile/connections` - Update connections

## Apple HealthKit Integration

The backend is designed to receive HealthKit data from the mobile app:

1. **Steps**: Mobile app pushes daily step count via `POST /api/v1/health/steps`
2. **Vitals**: Heart rate, sleep, blood glucose, etc. via `POST /api/v1/health/vitals`
3. **Activities**: Workouts via `POST /api/v1/health/activities`

All data is stored with timestamps and can be queried with date ranges.

## Nutrition API Integration

The backend integrates with nutrition APIs (Nutritionix, Edamam, etc.) to automatically fetch nutrition data when users log meals.

### Configuration

1. Sign up for a nutrition API (e.g., [Nutritionix](https://www.nutritionix.com/business/api))
2. Add your API key to `.env`:
   ```env
   NUTRITION_API_KEY=your-api-key
   ```

### Mock Mode

If no API key is configured, the system uses intelligent mock data for development.

## Insights Engine

The insights engine analyzes user data and generates personalized suggestions:

- **Movement**: Step goal tracking, inactivity alerts
- **Diet**: Calorie tracking, macro balance suggestions
- **Sleep**: Sleep duration monitoring
- **Outdoor**: Outdoor activity encouragement

Insights are generated automatically and refreshed when the user requests them.

## Database Migrations

The app uses SQLAlchemy's `create_all()` for simplicity. For production, consider setting up Alembic:

```bash
# Initialize Alembic
alembic init alembic

# Create migration
alembic revision --autogenerate -m "Initial migration"

# Apply migration
alembic upgrade head
```

## Frontend Integration

The frontend should:

1. **Base URL**: Point to `http://localhost:8000` (or your production URL)
2. **Authentication**: 
   - Store JWT token after login
   - Include in all requests: `Authorization: Bearer {token}`
3. **CORS**: Ensure your frontend URL is in `CORS_ORIGINS` in `.env`

Example API client setup (TypeScript):

```typescript
const API_BASE_URL = 'http://localhost:8000';

const apiClient = {
  async request(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    
    return response.json();
  },
  
  // Auth
  register: (data: any) => apiClient.request('/api/v1/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  login: (email: string, password: string) => 
    apiClient.request(`/api/v1/auth/login?email=${email}&password=${password}`, {
      method: 'POST',
    }),
  
  // Tasks
  getTasks: () => apiClient.request('/api/v1/tasks'),
  createTask: (data: any) => apiClient.request('/api/v1/tasks', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  // Add more endpoints as needed...
};
```

## Production Deployment

### Environment Variables

Ensure these are set in production:

- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Strong random secret key
- `CORS_ORIGINS` - Your production frontend URLs
- `NUTRITION_API_KEY` - Your nutrition API credentials

### Database

Use PostgreSQL in production:

```env
DATABASE_URL=postgresql://user:password@db-host:5432/trackme
```

### HTTPS

Always use HTTPS in production. Consider deploying behind a reverse proxy (nginx) or using a platform like:

- **Heroku**: Easy deployment with PostgreSQL add-on
- **AWS ECS/Fargate**: Container-based deployment
- **DigitalOcean App Platform**: Simple PaaS deployment
- **Railway**: Modern deployment platform

### Example Docker Deployment

```dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app ./app

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

```bash
docker build -t trackme-backend .
docker run -p 8000:8000 --env-file .env trackme-backend
```

## Troubleshooting

### Database Connection Errors

- **SQLite**: Ensure the directory is writable
- **PostgreSQL**: Check connection string, ensure PostgreSQL is running

### CORS Errors

Add your frontend URL to `CORS_ORIGINS` in `.env`

### Import Errors

Ensure all dependencies are installed:
```bash
pip install -r requirements.txt
```

### Authentication Errors

- Check JWT_SECRET is set
- Verify token is included in request headers
- Ensure token hasn't expired (default: 7 days)

## License

MIT

## Support

For issues or questions, please open an issue on the repository.

