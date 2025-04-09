# 🚗 Uber Clone Backend

A robust, scalable backend system for a ride-sharing application built with modern technologies and best practices. This project demonstrates expertise in building production-ready microservices with TypeScript, Node.js, and MongoDB.

## ⭐ Key Features

- **Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (User/Captain)
  - Token blacklisting for secure logout

- **Real-time Communication**
  - WebSocket integration using Socket.IO
  - Live location tracking
  - Real-time ride status updates

- **Google Maps Integration**
  - Location autocomplete
  - Distance and fare calculation
  - Route optimization

- **Secure Payment Processing**
  - OTP verification
  - Fare calculation based on distance and time
  - Multiple vehicle type support

## 🛠️ Technical Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Real-time Communication**: Socket.IO
- **Authentication**: JWT (JSON Web Tokens)
- **API Documentation**: OpenAPI/Swagger
- **Input Validation**: Zod
- **Testing**: Jest (unit tests) & Supertest (integration tests)

## 🏗️ Architecture

- Clean Architecture principles
- MVC pattern with service layer
- Middleware-based request processing
- Type-safe development with TypeScript
- Error handling middleware
- Request validation middleware
- Authentication middleware

## 💻 Local Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/uber-clone.git
cd uber-clone/backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start MongoDB:
```bash
# Make sure MongoDB is running locally
```

5. Start the development server:
```bash
npm run dev
```

## 📚 API Documentation

### User Endpoints

```typescript
POST /user/register   // Register new user
POST /user/login      // Authenticate user
GET  /user/profile    // Get user profile
POST /user/logout     // Logout user
```

### Captain Endpoints

```typescript
POST /captain/register   // Register new captain
POST /captain/login      // Authenticate captain
GET  /captain/profile    // Get captain profile
POST /captain/logout     // Logout captain
```

### Ride Endpoints

```typescript
POST /ride/create     // Create new ride
GET  /ride/fare      // Calculate ride fare
```

### Maps Endpoints

```typescript
GET /map/get-coordinates    // Get coordinates for address
GET /map/get-distance-time  // Calculate distance and time
GET /map/get-suggestions    // Get location suggestions
```

[View detailed API documentation](./API.md)

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token encryption
- Request rate limiting
- Input sanitization
- CORS configuration
- Environment variable protection
- Token blacklisting

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run integration tests
npm run test:integration

# Generate coverage report
npm run test:coverage
```

## 🚀 Deployment

The application is configured for easy deployment to various platforms:

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 📈 Performance Optimizations

- Connection pooling for MongoDB
- Request caching
- Optimized database queries
- Efficient error handling
- WebSocket connection management

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

For more information, please contact:
