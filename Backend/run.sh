#!/bin/bash

# Trackme Backend Setup and Run Script

echo "🚀 Trackme Backend Setup"
echo "========================"

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "📥 Installing dependencies..."
pip install -r requirements.txt

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚙️  Creating .env file..."
    cat > .env << EOL
# Database
DATABASE_URL=sqlite:///./trackme.db

# JWT Settings
JWT_SECRET=$(python -c 'import secrets; print(secrets.token_urlsafe(32))')
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=10080

# Nutrition API
NUTRITION_API_KEY=
NUTRITION_API_URL=https://api.nutritionix.com/v1_1

# App Settings
PROJECT_NAME=Trackme
VERSION=1.0.0
DEBUG=True

# CORS
CORS_ORIGINS=http://localhost:8081,http://localhost:19006
EOL
    echo "✅ Created .env file with default settings"
    echo "⚠️  Note: Using SQLite database for development"
    echo "⚠️  Note: Nutrition API key not set (will use mock data)"
else
    echo "✅ .env file already exists"
fi

# Start the server
echo ""
echo "🌟 Starting Trackme Backend..."
echo "================================"
echo "📍 API: http://localhost:8000"
echo "📚 Docs: http://localhost:8000/docs"
echo "🔍 Health: http://localhost:8000/health"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

