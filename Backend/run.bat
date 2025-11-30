@echo off

REM Trackme Backend

REM Create virtual environment if needed
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
call venv\Scripts\activate.bat

REM Install dependencies
pip install -q fastapi uvicorn[standard] sqlalchemy alembic python-jose[cryptography] passlib[bcrypt] python-multipart pydantic pydantic-settings python-dotenv httpx pytest pytest-asyncio email-validator

REM Create .env if it doesn't exist
if not exist ".env" (
    (
        echo DATABASE_URL=sqlite:///./trackme.db
        echo JWT_SECRET=your-secret-key-change-this-in-production
        echo JWT_ALGORITHM=HS256
        echo ACCESS_TOKEN_EXPIRE_MINUTES=10080
        echo NUTRITION_API_KEY=
        echo NUTRITION_API_URL=https://api.nutritionix.com/v1_1
        echo PROJECT_NAME=Trackme
        echo VERSION=1.0.0
        echo DEBUG=True
        echo CORS_ORIGINS=["http://localhost:8081","http://localhost:19006"]
    ) > .env
    echo Created .env file
)

echo Starting backend...
echo API: http://localhost:8000/docs
echo.

uvicorn app.main:app --reload
