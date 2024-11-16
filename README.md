# Project Description
School Management API

- This project is a backend API for managing school data, built with Node.js, Express, and MongoDB. It includes role-based access control (RBAC) using JWT authentication..

# Roles and Permissions:
- Master: Can add, update, and remove principals, teachers, and students.
- Principal: Can manage teachers and students.
- Teacher: Can manage students.
- Student: Can view their own details.
  
# Features
- Role-based access control (RBAC)
- CRUD operations for school roles
- JWT for secure authentication and authorization
- MongoDB as the database

# How to Run the Project
1. Clone the Repository
  - git clone <repository-url>
    ```
    cd <project-folder>
2. Install Dependencies
    ```
    npm install
3. Set Up Environment Variables
` Create a .env file in the root directory and add:

- env
  ```
  PORT=5000
  JWT_SECRET=your_jwt_secret
  
- Replace your_jwt_secret with your credentials.

4. Start the Server
   ```
   npm start
5. Test with Postman

### Notes
- Ensure MongoDB is running or accessible through the provided `MONGO_URI`.
- Replace `<JWT_TOKEN>` with the token received after login.
- Update the URLs as needed to match your API structure.
