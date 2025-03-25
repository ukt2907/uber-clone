# User API Documentation

## Authentication Endpoints

### Register User
`POST /user/register`

Register a new user in the system.

**Request Body:**
```json
{
    "fullName": {
        "firstName": "string",
        "lastName": "string"
    },
    "email": "string",
    "password": "string"
}
```

**Response Codes:**
- `201`: User successfully created
- `400`: Invalid input data
- `409`: Email already exists

**Success Response:**
```json
{
    "message": "User created successfully",
    "token": "JWT_TOKEN",
    "userWithoutPassword": {
         "fullName": {
              "firstName": "string",
              "lastName": "string"
         },
         "email": "string",
         "_id": "string"
         // ...other fields
    }
}
```

### Login User
`POST /user/login`

Authenticate a user and receive a JWT token.

**Request Body:**
```json
{
    "email": "string",
    "password": "string"
}
```

**Response Codes:**
- `200`: Login successful
- `401`: Invalid credentials
- `400`: Invalid input data

**Success Response:**
```json
{
    "message": "Login successful",
    "token": "JWT_TOKEN",
    "userWithoutPassword": {
         "fullName": {
              "firstName": "string",
              "lastName": "string"
         },
         "email": "string",
         "_id": "string"
         // ...other fields
    }
}
```

### Get User Profile
`GET /user/profile`

Retrieve the authenticated user's profile information.

**Headers Required:**
- `Authorization`: Bearer {JWT_TOKEN}

**Response Codes:**
- `200`: Success
- `401`: Unauthorized
- `404`: User not found

**Success Response:**
```json
{
    "_id": "string",
    "fullName": {
         "firstName": "string",
         "lastName": "string"
    },
    "email": "string",
    "socketId": "string"
    // ...other fields
}
```

### Logout User
`POST /user/logout`

Logs out the authenticated user by clearing the token cookie and blacklisting the token.

**Response Codes:**
- `200`: Logout successful

**Success Response:**
```json
{
    "message": "Logged out successfully"
}
```

## Error Response Format
All error responses follow this format:
```json
{
    "error": "Error message description"
}
```
