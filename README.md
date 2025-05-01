<<<<<<< HEAD
# Property Unification Platform

A unified property search platform that integrates urban and rural property data from various sources into a single system.

## Features

- Unified search interface for both urban and rural properties
- Location-based search with MapMyIndia integration
- Comprehensive property information display
- Loan status and ownership details
- Responsive design for all devices

## Project Structure

- `/frontend` - React.js frontend application
- `/backend` - Express.js backend API server

## Setup Instructions

### Prerequisites

- Node.js (v14+ recommended)
- npm (v6+ recommended)

### Installation

1. Clone the repository
```
git clone <repository-url>
cd <repository-directory>
```

2. Install backend dependencies
```
cd backend
npm install
```

3. Install frontend dependencies
```
cd frontend/asset
npm install
```

### Running the Application

#### Option 1: Using the start script (Windows)

Simply run the `start.bat` file by double-clicking it or running it from the command line:
```
start.bat
```

This will start both the backend and frontend servers.

#### Option 2: Manual startup

1. Start the backend server
```
cd backend
npm run dev
```

2. In a separate terminal, start the frontend server
```
cd frontend/asset
npm start
```

3. Access the application at http://localhost:3000

## API Endpoints

The backend provides the following API endpoints:

- `POST /api/urban-properties/search` - Search for urban properties
- `POST /api/rural-properties/search` - Search for rural properties
- `GET /api/property/:id` - Get details for a specific property

## Technologies Used

- Frontend: React.js, Bootstrap 5
- Backend: Node.js, Express.js
- APIs: MapMyIndia for location services

## Development Notes

- The application is configured to work with mock data by default
- The `.env` file in the backend contains configuration variables
- To use real MapMyIndia API, replace the API key in the frontend services 
=======
# Hackathon-Project
This is a project that we've build in our first hackathon Udaan 2.0
>>>>>>> db2183feaa0bd4f27b199c8dd7f3f9c7c7a19b4b
