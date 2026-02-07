@echo off
echo ========================================
echo E-Commerce Demo - Quick Start
echo ========================================
echo.

echo Step 1: Checking MongoDB...
net start MongoDB >nul 2>&1
if %errorlevel% equ 0 (
    echo MongoDB is running
) else (
    echo MongoDB service not found or already running
)
echo.

echo Step 2: Seeding database...
call npm run seed
echo.

echo Step 3: Starting backend server...
echo Backend will run on http://localhost:5000
start cmd /k "npm run server"
timeout /t 3 >nul
echo.

echo Step 4: Starting frontend...
echo Frontend will open at http://localhost:3000
start cmd /k "npm start"
echo.

echo ========================================
echo Application is starting!
echo ========================================
echo.
echo Two terminal windows will open:
echo 1. Backend server (port 5000)
echo 2. Frontend app (port 3000)
echo.
echo Press any key to exit this window...
pause >nul
