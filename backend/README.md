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

# Captain API Documentation

## Authentication Endpoints

### Register Captain
`POST /captain/register`

Register a new captain in the system.

**Request Body:**
```json
{
    "fullName": {
        "firstName": "string",
        "lastName": "string"
    },
    "email": "string",
    "password": "string",
    "vehicle": {
        "color": "string",
        "plate": "string",
        "capacity": "number",
        "type": "car" | "van" | "truck",
        "vehicleType": "car" | "motorcycle" | "auto",
        "location": {
            "ltd": "number",
            "lng": "number"
        }
    }
}
```

**Response Codes:**
- `201`: Captain successfully created
- `400`: Invalid input data

**Success Response:**
```json
{
    "message": "Captain created successfully",
    "captain": {
        "fullName": {
            "firstName": "string",
            "lastName": "string"
        },
        "email": "string",
        "status": "inactive",
        "vehicle": {
            "color": "string",
            "plate": "string",
            "capacity": "number",
            "type": "string",
            "vehicleType": "string",
            "location": {
                "ltd": "number",
                "lng": "number"
            }
        }
    },
    "token": "JWT_TOKEN"
}
```

### Login Captain
`POST /captain/login`

Authenticate a captain and receive a JWT token.

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
- `404`: Captain not found
- `400`: Invalid input data

**Success Response:**
```json
{
    "message": "Captain logged in successfully",
    "captain": {
        // captain object
    },
    "token": "JWT_TOKEN"
}
```

### Get Captain Profile
`GET /captain/profile`

Retrieve the authenticated captain's profile information.

**Headers Required:**
- `Authorization`: Bearer {JWT_TOKEN}

**Response Codes:**
- `200`: Success
- `401`: Unauthorized

**Success Response:**
```json
{
    "message": "Captain profile",
    "captain": {
        // captain profile data
    }
}
```

### Logout Captain
`GET /captain/logout`

Logs out the captain by clearing the token cookie and blacklisting the token.

**Headers Required:**
- `Authorization`: Bearer {JWT_TOKEN}

**Response Codes:**
- `200`: Success
- `401`: Unauthorized

**Success Response:**
```json
{
    "message": "Captain logged out successfully"
}
```
