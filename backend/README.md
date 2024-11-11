

# Server Backend Tutor

A backend server for a real-time tutor application built using Node.js, Express, PostgreSQL, and Socket.io. It handles user authentication, management, and real-time communication between tutors and students.


# Table of Contents

1. [Tech Stack](#tech-stack)
2. [Installation](#installation)
3. [Environment Variables](#environment-variables)
4. [Project Structure](#project-structure)
5. [API Routes](#api-routes)
6. [Socket.io](#socketio)
7. [Seeding Database](#seeding-database)
8. [Testing](#testing)
9. [Usage](#usage)
10. [Contributing](#contributing)
11. [License](#license)

---

## Tech Stack

- **Frontend**: React, Context API, Axios
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **Real-time Communication**: Socket.io
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Bootstrap (for frontend, if applicable)

---

## Installation

Follow these steps to set up the backend locally:

1. **Clone the repository**:

    ```bash
    git clone https://github.com/your-username/server-backend-tutor.git
    cd server-backend-tutor
    ```

2. **Install dependencies**:

    Ensure you have **Node.js** and **npm** installed. Then run:

    ```bash
    npm install
    ```

3. **Set up environment variables**:

    Create a `.env` file in the root directory (you can copy `.env.example` if available) and add the following configuration:

    ```bash
    PORT=5000
    DATABASE_URL=postgresql://user:password@localhost:5432/mydatabase
    JWT_SECRET=mysecretkey
    SOCKET_SERVER_URL=http://localhost:5000
    ```

---

## Environment Variables

Make sure to configure the following environment variables in your `.env` file:

- `PORT`: The port on which the backend server will run.
- `DATABASE_URL`: PostgreSQL connection string to your database.
- `JWT_SECRET`: Secret key used for generating JWT tokens.
- `SOCKET_SERVER_URL`: URL for the Socket.io server (typically the same as the backend).

---

## Project Structure

Here is an overview of the folder structure:

```
.
├── controllers/                # Business logic for handling requests
│   ├── authController.js       # Authentication-related logic
│   ├── userController.js       # User-related logic
├── routes/                     # API route definitions
│   ├── authRoutes.js           # Routes for authentication
│   ├── userRoutes.js           # Routes for user management
├── server.js                   # Entry point for the application
├── database/                   # Database configuration
│   ├── db.js                   # Sequelize configuration
├── .env                        # Environment variables (not committed to version control)
├── package.json                # Project dependencies and scripts
└── LICENSE                     # Project license
├── seeders/                    # Database seed files
   ├── userSeeder.js           # Seeder for populating users 

---

### Authentication Routes

- **`POST /api/auth/register`**: Register a new user.

  **Request Body**:

  ```json
  {
    "username": "john_doe",
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```

  **Response**:

  ```json
  {
    "message": "User registered successfully",
    "token": "JWT_TOKEN"
  }
  ```

- **`POST /api/auth/login`**: Login an existing user.

  **Request Body**:

  ```json
  {
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```

  **Response**:

  ```json
  {
    "message": "Login successful",
    "token": "JWT_TOKEN"
  }
  ```

### User Routes

- **`GET /api/users`**: Get a list of all users.
- **`GET /api/users/:id`**: Get details of a specific user.

---

## Socket.io

This project uses **Socket.io** for real-time communication. It allows for messaging between tutors and students.

### Events:

- **`connection`**: Triggered when a client connects to the server.
- **`disconnect`**: Triggered when a client disconnects.
- **`message`**: Used for sending messages in real-time between clients.

**Example**:

```javascript
socket.emit('message', { user: 'john_doe', message: 'Hello, tutor!' });
```

---

## Seeding Database

To populate the database with initial mock data, you can run the seed script:

```bash
node seed.js
```

This will execute the `userSeeder.js` file and insert mock user data into the PostgreSQL database.

---

## Testing

Unit and integration tests for the project are written using [Jest](https://jestjs.io/).

To run the tests:

```bash
npm test
```

Ensure all tests pass before submitting pull requests or pushing changes.

---

## Usage

To start the backend server locally, run:

```bash
npm run dev
```

This will start the server on the port defined in the `.env` file (default: `5000`).

---

## Contributing

We welcome contributions! If you'd like to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to your branch (`git push origin feature-branch`).
6. Create a Pull Request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

### Notes

- Make sure to update the `.env` file with the correct credentials for your local PostgreSQL database.
- For more advanced configurations (e.g., production environment), refer to the configuration files or documentation specific to your setup.
