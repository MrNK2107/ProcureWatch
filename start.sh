#!/bin/bash

echo "==================================="
echo " ProcureWatch - Setup and Start"
echo "==================================="
echo ""

echo "[1/4] Installing Python dependencies..."
pip install -r requirements.txt
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install Python dependencies"
    exit 1
fi
echo ""

echo "[2/4] Installing frontend dependencies..."
cd frontend
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install frontend dependencies"
    exit 1
fi
cd ..
echo ""

echo "[3/4] Starting backend server..."
cd backend
python main.py &
BACKEND_PID=$!
cd ..
echo "Backend starting at http://localhost:8000 (PID: $BACKEND_PID)"
echo ""

sleep 3

echo "[4/4] Starting frontend server..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..
echo "Frontend will be available at http://localhost:5173 (PID: $FRONTEND_PID)"
echo ""

echo "==================================="
echo " ProcureWatch is running!"
echo "==================================="
echo ""
echo "Backend: http://localhost:8000"
echo "Frontend: http://localhost:5173"
echo "API Docs: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

# Wait for Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
