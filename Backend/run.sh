#!/bin/bash

# Trackme Backend

# Create virtual environment if needed
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install dependencies if needed
if ! python -c "import fastapi" 2>/dev/null; then
    echo "Installing dependencies..."
    pip install -q fastapi uvicorn[standard] sqlalchemy alembic python-jose[cryptography] passlib[bcrypt] python-multipart pydantic pydantic-settings python-dotenv httpx pytest pytest-asyncio email-validator
fi

# Create .env if it doesn't exist
if [ ! -f ".env" ]; then
    cat > .env << EOL
DATABASE_URL=sqlite:///./trackme.db
JWT_SECRET=$(python -c 'import secrets; print(secrets.token_urlsafe(32))')
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=10080
NUTRITION_API_KEY=
NUTRITION_API_URL=https://api.nutritionix.com/v1_1
PROJECT_NAME=Trackme
VERSION=1.0.0
DEBUG=True
CORS_ORIGINS=["http://localhost:8081","http://localhost:19006"]
EOL
    echo "Created .env file"
fi

echo "Starting backend..."
echo "API: http://localhost:8000/docs"
echo ""

uvicorn app.main:app --reload
