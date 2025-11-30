@echo off

REM Trackme Frontend

REM Install dependencies if needed
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
)

REM Create .env if it doesn't exist
if not exist ".env" (
    echo EXPO_PUBLIC_API_URL=http://localhost:8000 > .env
    echo Created .env file
)

echo Starting frontend...
echo Make sure backend is running at http://localhost:8000
echo.

call npm start
