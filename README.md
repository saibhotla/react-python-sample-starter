
# React Python Sample Starter

This project is a starter template for a web application built with React and a Python generator.

## Installation (without Docker)

1. Navigate to the `backend` directory: `cd ./backend`
2. Install the Python dependencies: `pip install -r requirements.txt`
3. Navigate to the `aicrxn` directory: `cd ./aicrxn`
4. Build the React application: `npm run build`
5. Start the application (React is statically served): `python ./backend/test.py`

## Installation (with Docker)

1. Build the Docker containers: `docker-compose build --no-cache`
2. Start the Docker containers: `docker-compose up -d`

