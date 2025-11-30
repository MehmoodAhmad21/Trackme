@echo off
REM Trackme Backend Setup and Run Script for Windows

echo 🚀 Trackme Backend Setup
echo ========================

REM Check if virtual environment exists
if not exist "venv" (
    echo 📦 Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
echo 🔧 Activating virtual environment...
call venv\Scripts\activate.bat

REM Install dependencies
echo 📥 Installing dependencies...
pip install -r requirements.txt

REM Check if .env exists
if not exist ".env" (
    echo ⚙️  Creating .env file...
    (
        echo # Database
        echo DATABASE_URL=sqlite:///./trackme.db
        echo.
        echo # JWT Settings
        echo JWT_SECRET=your-secret-key-change-this-in-production
        echo JWT_ALGORITHM=HS256
        echo ACCESS_TOKEN_EXPIRE_MINUTES=10080
        echo.
        echo # Nutrition API
        echo NUTRITION_API_KEY=
        echo NUTRITION_API_URL=https://api.nutritionix.com/v1_1
        echo.
        echo # App Settings
        echo PROJECT_NAME=Trackme
        echo VERSION=1.0.0
        echo DEBUG=True
        echo.
        echo # CORS
        echo CORS_ORIGINS=http://localhost:8081,http://localhost:19006
    ) > .env
    echo ✅ Created .env file with default settings
    echo ⚠️  Note: Using SQLite database for development
    echo ⚠️  Note: Nutrition API key not set ^(will use mock data^)
) else (
    echo ✅ .env file already exists
)

REM Start the server
echo.
echo 🌟 Starting Trackme Backend...
echo ================================
echo 📍 API: http://localhost:8000
echo 📚 Docs: http://localhost:8000/docs
echo 🔍 Health: http://localhost:8000/health
echo.
echo Press Ctrl+C to stop the server
echo.

uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

