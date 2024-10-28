# MongoDB Atlas & Serverless Functions Take-Home Project

## Overview
This project documents existing MongoDB Atlas functions and triggers that implement a user management and product listing system. The system includes user registration, status management, and product listing functionalities along with automated event logging.

### Environment Variables
Create a `.env` file with the following variables:
```env
MONGODB_URI=your_mongodb_connection_string
DATABASE_NAME=your_database_name
```


## Installation & Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:
```bash
npm install
```

## Existing Functions & Implementations

### Task 1: MongoDB Atlas Function
 Existing function to fetch users by status (active/inactive)
```javascript
// getUsers function
exports = async function(status) {
  const collection = context.services
    .get("mongodb-atlas")
    .db("your_database")
    .collection("users");
    
  const query = status ? { status } : {};
  return await collection.find(query).toArray();
};
```

### Task 2: Atlas Trigger
 Existing trigger for new user registrations
```javascript
// userRegistrationTrigger
exports = async function(changeEvent) {
  const { fullDocument } = changeEvent;
  
  if (changeEvent.operationType === 'insert') {
    const logsCollection = context.services
      .get("mongodb-atlas")
      .db("your_database")
      .collection("audit_logs");
      
    await logsCollection.insertOne({
      event: "user_registration",
      userId: fullDocument._id,
      timestamp: new Date()
    });
  }
};
```

### Task 3: Serverless Function
 Existing HTTP endpoint for user registration
```javascript
// registerUser function
exports = async function(request) {
  const { email, name } = JSON.parse(request.body.text());
  const collection = context.services
    .get("mongodb-atlas")
    .db("your_database")
    .collection("users");
    
  const newUser = {
    email,
    name,
    age,
    status: "active",
    createdAt: new Date()
  };
  
  return await collection.insertOne(newUser);
};
```

## API Usage

### Get Users
```http
GET /users/status
```
Query Parameters:
- `status` (optional): "active" | "inactive"

### Register User
```http
POST /users
Content-Type: application/json

{
  "email": "user@example.com",
  "name": "John Doe",
  "age": 45
}
```

### Get Products
```http
GET /products
```

## Data Models

### User Collection
```javascript
{
  _id: ObjectId,
  email: String,
  name: String,
  status: String, // "active" or "inactive"
  age: Integer
  createdAt: Date
}
```

### Product Collection
```javascript
{
  _id: ObjectId,
  name: String,
  price: Number,
  description: String,
  stock: Number
}
```

### Audit Logs Collection
```javascript
{
  _id: ObjectId,
  operation: String,
  userId: String,
  userEmail: String,
  timestamp: Date
}
```

## Testing the Functions

You can test the functions directly in MongoDB Atlas:

1. Access Atlas Functions:
   - Log into MongoDB Atlas
   - Navigate to App Services
   - Select your application
   - Go to "Functions" section

2. Test getUsers function:
   - Click on the getUsers function
   - Use the "Console" tab
   - Test with:
   ```javascript
   exports("active")
   ```

3. Test registerUser function:
   - Use the "Console" tab
   - Test with:
   ```javascript
   const mockRequest = {
     body: {
       text: () => JSON.stringify({
         email: "test@example.com",
         name: "Test User",
         age: 40
       })
     }
   };
   exports(mockRequest)
   ```

## Monitoring & Logs

View existing function activity:
1. Go to MongoDB Atlas Dashboard
2. Navigate to App Services → Logs
3. Filter logs by:
   - Function name
   - Status code
   - Timestamp

Monitor triggers:
1. Go to App Services → Triggers
2. View trigger history and status
3. Check audit logs collection for registration events

## Common Issues & Troubleshooting

1. Authentication Issues:
   - Check function authentication settings in Atlas
   - Verify API key permissions
   - Ensure proper authentication headers in requests

2. Function Errors:
   - Check Atlas function logs for error messages
   - Verify database permissions
   - Test functions in Atlas console

## Function Locations in Atlas

Functions are located in:
- App Services → Functions
- App Services → Triggers → userRegistrationTrigger

## Additional Resources

- [MongoDB Atlas Functions Documentation](https://www.mongodb.com/docs/atlas/app-services/functions/)
- [Atlas Triggers Documentation](https://www.mongodb.com/docs/atlas/app-services/triggers/)
- [Atlas HTTP Endpoints](https://www.mongodb.com/docs/atlas/app-services/http/)
# Peppermint
