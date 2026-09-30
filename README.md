# Travel Agency Web Application

Travel Agency is a full-stack web application for discovering and booking tours. The platform allows users to create accounts, browse available tours, make bookings, leave reviews, and manage their reservations, while administrators can manage tours, bookings, and users through a dedicated admin interface.

## Features

### User Features

- User registration and login
- Secure authentication using JSON Web Tokens (JWT)
- Browse available tours
- Search and explore tour details
- Book tours
- View personal bookings
- Leave reviews and ratings
- User account management

### Admin Features

- Administrative dashboard
- Create, edit, and delete tours
- Manage bookings
- Manage registered users
- View and maintain tour information

## Tech Stack

### Frontend

- **React**
- **JavaScript**
- **HTML**
- **CSS**

### Backend

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **REST API**
- **JWT Authentication**
- **bcrypt** for password hashing

## Application Structure

The project is organized into separate frontend and backend applications:

- `frontend/` – React client application
- `backend/` – Node.js and Express server with application logic, REST APIs, and database integration

The backend manages the main application entities, including:

- Users
- Tours
- Bookings
- Reviews

## Authentication and Authorization

The application uses JWT-based authentication to manage authenticated sessions.

Passwords are securely hashed using bcrypt before being stored in the database. Role-based authorization separates regular user functionality from administrative functionality.

## REST API

The backend exposes REST endpoints for managing the application's core resources, including users, tours, bookings, and reviews.

The API supports operations required by both the customer-facing application and the administrative interface.

## Screenshots

Application screenshots will be added here.

## Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- MongoDB

### Installation

1. Clone the repository:

```bash
git clone https://github.com/NikolinaAzasevac/TravelAgencyProject.git
```

2. Navigate to the project directory:

```bash
cd TravelAgencyProject
```

3. Install the required dependencies:

```bash
npm install
```

4. Install frontend dependencies:

```bash
cd frontend
npm install
```

5. Install backend dependencies:

```bash
cd ../backend
npm install
```

6. Configure the required environment variables for the database connection and JWT authentication.

7. Start the backend and frontend applications using their configured npm scripts.

## Author

**Nikolina Azaševac**

Information Systems Engineering Student  
University of Novi Sad – Faculty of Technical Sciences
