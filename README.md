# Tutor Platform - Full Stack Application

This is a full-stack tutor platform project built with the **MERN** stack (MongoDB, Express, React, Node.js), along with **Socket.io** for real-time communication. It includes both the **frontend** (React) and **backend** (Node.js with Express) in a single repository.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack) 
3. [Installation](#installation)
    - [Backend Setup](#backend-setup)
    - [Frontend Setup](#frontend-setup)
4. [Environment Variables](#environment-variables)
5. [Usage](#usage)
    - [Running the Backend](#running-the-backend)
    - [Running the Frontend](#running-the-frontend)
6. [API Documentation](#api-documentation)
7. [Socket.io](#socketio)
8. [License](#license)

---

## Project Overview

This project is designed for a **tutor-student platform** with real-time messaging functionality. The backend API is built with **Node.js**, **Express**, and **PostgreSQL**. The frontend is a **React** app with **Context API** for state management, **Axios** for HTTP requests, and **Bootstrap** for styling.

- **Backend**: Handles user authentication, management, and real-time communication.
- **Frontend**: Provides a responsive user interface for registration, login, and real-time chat between tutors and students.

---

## Tech Stack

- **Frontend**: React, Context API, Axios, Bootstrap
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **Real-time Communication**: Socket.io
- **Authentication**: JWT (JSON Web Tokens)

---

## Project Structure

This is the overall folder structure of the project:

```
.
├── backend/                    # Backend API (Node.js + Express)
│   ├── controllers/            # Logic for handling requests
│   ├── routes/                 # API route definitions
│   ├── server.js               # Entry point for backend
│   └── .env                    # Environment variables for the backend
│   ├── seeders/                # Database seeders
|
├── frontend/                   # Frontend React app
│   ├── src/                    # Source code for React app
│   ├── .env                    # Environment variables for the frontend
│   └── package.json            # Project dependencies (frontend)
│
├── .gitignore                  # Git ignore file for node_modules, env files, etc.
├── package.json                # Project dependencies (root-level)
└── README.md                   # Main README file (this one)
```

---

## Installation

To get started, you’ll need to set up both the **backend** and **frontend**. Follow the instructions below:

### Backend Setup

1. Navigate to the `backend` directory:

    ```bash
    cd backend
    ```

2. Install backend dependencies:

    ```bash
    npm install
    ```

3. Set up your environment variables by creating a `.env` file in the `backend` directory. Example:

    ```bash
    PORT=5000
    DATABASE_URL=postgresql://user:password@localhost:5432/mydatabase
    JWT_SECRET=mysecretkey
    SOCKET_SERVER_URL=http://localhost:5000
    ```

4. Run the backend server:

    ```bash
    npm run dev
    ```

    The backend will be available on `http://localhost:5000` by default.

### Frontend Setup

1. Navigate to the `frontend` directory:

    ```bash
    cd frontend
    ```

2. Install frontend dependencies:

    ```bash
    npm install
    ```

3. Set up your environment variables by creating a `.env` file in the `frontend` directory. Example:

    ```bash
    REACT_APP_API_URL=http://localhost:5000/api  # URL for backend API
    REACT_APP_SOCKET_URL=http://localhost:5000  # URL for Socket.io server
    ```

4. Run the frontend React app:

    ```bash
    npm start
    ```

    The frontend will be available on `http://localhost:3000` by default.

---

## Environment Variables

Both the **backend** and **frontend** require environment variables to be set up for proper communication.

### Backend Environment Variables (`backend/.env`)

- `PORT`: Port where the backend server runs (default: 5000).
- `DATABASE_URL`: PostgreSQL connection string.
- `JWT_SECRET`: Secret key for JWT authentication.
- `SOCKET_SERVER_URL`: URL of the Socket.io server.

### Frontend Environment Variables (`frontend/.env`)

- `REACT_APP_API_URL`: Base URL for backend API (default: `http://localhost:5000/api`).
- `REACT_APP_SOCKET_URL`: Socket.io server URL (default: `http://localhost:5000`).

---

## Usage

### Running the Backend

To start the backend, navigate to the `backend` directory and run:

```bash
npm run dev
```

This will start the backend server on `http://localhost:5000`.

### Running the Frontend

To start the frontend, navigate to the `frontend` directory and run:

```bash
npm start
```

This will start the frontend React app on `http://localhost:3000`.

---

## API Documentation

The backend API provides various endpoints for user authentication and management. You can find more detailed information about the available routes in the **[backend README](backend/README.md)**.

Example:

- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Login an existing user.

---

## Socket.io

This project uses **Socket.io** for real-time communication between the client and server. The frontend communicates with the backend via WebSockets for live chat and messaging.

To enable Socket.io, the frontend connects to the Socket server as specified in the `.env` file:

```javascript
const socket = io(REACT_APP_SOCKET_URL);
```

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
