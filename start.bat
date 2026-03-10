@echo off
echo ===================================
echo  ProcureWatch - Setup and Start
echo ===================================
echo.

echo [1/4] Installing Python dependencies...
pip install -r requirements.txt
if errorlevel 1 (
    echo ERROR: Failed to install Python dependencies
    pause
    exit /b 1
)
echo.

echo [2/4] Installing frontend dependencies...
cd frontend
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install frontend dependencies
    pause
    exit /b 1
)
cd ..
echo.

echo [3/4] Starting backend server...
start "ProcureWatch Backend" cmd /k "cd backend && python main.py"
echo Backend starting at http://localhost:8000
echo.

timeout /t 3 /nobreak > nul

echo [4/4] Starting frontend server...
start "ProcureWatch Frontend" cmd /k "cd frontend && npm run dev"
echo Frontend will be available at http://localhost:5173
echo.

echo ===================================
echo  ProcureWatch is starting!
echo ===================================
echo.
echo Backend: http://localhost:8000
echo Frontend: http://localhost:5173
echo API Docs: http://localhost:8000/docs
echo.
echo Press any key to exit this window...
echo The servers will continue running in separate windows.
pause > nul
