# Uber Clone Backend API Documentation

## Overview

This document provides comprehensive technical documentation for the Uber Clone Backend API. The backend is built using Node.js, Express, TypeScript, and MongoDB, offering a robust and scalable solution for a ride-sharing application.

## Architecture

The application follows a modular architecture with clear separation of concerns:

- **Controllers**: Handle HTTP requests and responses
- **Services**: Implement business logic
- **Models**: Define data structures and database schemas
- **Middleware**: Process requests before they reach route handlers
- **Validation**: Ensure data integrity and format
- **Routes**: Define API endpoints

## Technology Stack

| Technology | Purpose |
|------------|---------|
| Node.js | JavaScript runtime environment |
| Express | Web application framework |
| TypeScript | Static type checking |
| MongoDB | NoSQL database |
| Mongoose | MongoDB object modeling tool |
| JWT | Authentication mechanism |
| Zod | Schema validation library |
| Socket.IO | Real-time bidirectional event-based communication |

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- MongoDB (v4.0 or higher)
- npm (v6.0.0 or higher)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/uber-clone.git
cd uber-clone/backend
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables by creating a `.env` file:
```
MONGODB_URI=mongodb://localhost:27017/uber-clone
JWT_SECRET=your_secure_jwt_secret
PORT=3000
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

4. Start the development server
```bash
npm run dev
```

## API Reference

### Authentication

#### User Authentication

| Endpoint | Method | Description | Request Body | Response |
|----------|--------|-------------|--------------|----------|
| `/api/auth/register` | POST | Register a new user | `{ fullName: { firstName: string, lastName: string }, email: string, password: string }` | `{ message: string, token: string, user: object }` |
| `/api/auth/login` | POST | Login a user | `{ email: string, password: string }` | `{ message: string, token: string, user: object }` |
| `/api/auth/logout` | POST | Logout a user | None | `{ message: string }` |
| `/api/auth/profile` | GET | Get user profile | None | `{ user: object }` |

#### Captain Authentication

| Endpoint | Method | Description | Request Body | Response |
|----------|--------|-------------|--------------|----------|
| `/api/captain/register` | POST | Register a new captain | `{ fullName: { firstName: string, lastName: string }, email: string, password: string, vehicle: object }` | `{ message: string, token: string, captain: object }` |
| `/api/captain/login` | POST | Login a captain | `{ email: string, password: string }` | `{ message: string, token: string, captain: object }` |
| `/api/captain/logout` | POST | Logout a captain | None | `{ message: string }` |

### Rides

| Endpoint | Method | Description | Request Body/Params | Response |
|----------|--------|-------------|---------------------|----------|
| `/api/rides` | POST | Create a new ride request | `{ pickup: string, destination: string, vehicleType: string }` | `{ message: string, ride: object }` |
| `/api/rides/:id` | GET | Get ride details | `id: string` (route param) | `{ ride: object }` |
| `/api/rides/:id/accept` | PUT | Accept a ride (captain) | `id: string` (route param) | `{ message: string, ride: object }` |
| `/api/rides/:id/complete` | PUT | Complete a ride | `id: string` (route param) | `{ message: string, ride: object }` |
| `/api/rides/:id/cancel` | PUT | Cancel a ride | `id: string` (route param) | `{ message: string, ride: object }` |

## Data Models

### User Model

```typescript
interface IUser extends Document {
    _id: mongoose.Types.ObjectId;
    fullName: {
        firstName: string;
        lastName: string;
    };
    email: string;
    password: string;
    socketId?: string;
    generateAuthToken(): string;
    comparePassword(password: string): Promise<boolean>;
}
```

### Captain Model

```typescript
interface ICaptain extends Document {
    _id: mongoose.Types.ObjectId;
    fullName: {
        firstName: string;
        lastName: string;
    };
    email: string;
    password: string;
    vehicle: {
        vehicleType: string;
        color: string;
        plate: string;
        capacity: number;
        location?: {
            ltd: number;
            lng: number;
        };
    };
    socketId?: string;
    generateAuthToken(): string;
    comparePassword(password: string): Promise<boolean>;
}
```

### Ride Model

```typescript
interface IRide {
    userId: mongoose.Types.ObjectId;
    captainId?: mongoose.Types.ObjectId;
    pickup: string;
    destination: string;
    fare: number;
    distance?: number;
    duration?: number;
    status: "pending" | "accepted" | "onGoing" | "completed" | "cancelled";
    paymentId?: string;
    orderId?: string;
    signature?: string;
    otp: string;
}
```

## Error Handling

The API uses standard HTTP status codes for error handling:

- `400 Bad Request`: Invalid request format or validation error
- `401 Unauthorized`: Authentication failure
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server-side errors

## Authentication & Authorization

The API uses JWT (JSON Web Tokens) for authentication:

1. User/Captain registers or logs in and receives a JWT token
2. Subsequent requests include the token in the Authorization header
3. Protected routes use middleware to verify the token and attach the user/captain info to the request object

## Project Structure

```
src/
  ├── config/          # Configuration files
  │   └── config.ts    # Environment variables and app configuration
  ├── controllers/     # Request handlers
  │   ├── user-controller.ts
  │   ├── captain-controller.ts
  │   └── ride-controller.ts
  ├── middleware/      # Express middleware
  │   └── auth-middleware.ts
  ├── models/          # Mongoose models
  │   ├── user-model.ts
  │   ├── captain-model.ts
  │   ├── ride-model.ts
  │   └── blacklist-token.ts
  ├── routes/          # Route definitions
  │   ├── user-routes.ts
  │   ├── captain-routes.ts
  │   └── ride-routes.ts
  ├── services/        # Business logic
  │   ├── user-services.ts
  │   ├── captain-services.ts
  │   ├── ride-services.ts
  │   └── maps-services.ts
  ├── validation/      # Zod validation schemas
  │   └── auth-validation.ts
  ├── app.ts           # Express app setup
  └── index.ts         # Entry point
```

## Development

### Running Tests
```bash
npm test
```

### Linting
```bash
npm run lint
```

### Building for Production
```bash
npm run build
```

## Deployment

The API can be deployed to various platforms:

### Docker
```bash
docker build -t uber-clone-backend .
docker run -p 3000:3000 uber-clone-backend
```

### Heroku
```bash
git push heroku main
```

## License

MIT License
