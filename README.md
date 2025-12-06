# Course Master Backend

A RESTful API backend for managing online courses, student enrollments, assessments, and progress tracking.

## Problem Solved

This backend provides a complete solution for educational platforms that need to manage courses, batches, student enrollments, quizzes, assignments, and track student progress in a centralized system.

## Key Features

- **User Authentication & Authorization** - JWT-based authentication with role-based access control (Admin, Student, Instructor)
- **Course Management** - Create, update, and manage courses
- **Batch Management** - Organize students into batches
- **Enrollment System** - Handle student course enrollments with status tracking
- **Quiz System** - Create quizzes and track quiz results
- **Assignment System** - Manage assignments and student submissions
- **Progress Tracking** - Monitor student progress across courses
- **Email Notifications** - Send emails using Nodemailer
- **Data Validation** - Request validation using Zod
- **Error Handling** - Global error handling middleware

## Technologies

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcryptjs
- **Validation:** Zod
- **Email:** Nodemailer
- **Other:** cookie-parser, CORS, dotenv

## How to Run on Localhost

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set Up Environment Variables**
   
   Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   NODE_ENV=development
   BCRYPT_SALT_ROUND=10
   JWT_ACCESS_SECRET=your_access_secret
   JWT_ACCESS_EXPIRES=15m
   JWT_REFRESH_SECRET=your_refresh_secret
   JWT_REFRESH_EXPIRES=7d
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=your_admin_password
   FRONTEND_URL=http://localhost:3000
   SMTP_USER=your_smtp_username
   SMTP_PASS=your_smtp_password
   SMTP_PORT=587
   SMTP_HOST=smtp.gmail.com
   SMTP_FROM=noreply@example.com
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:5000` (or the port specified in your `.env` file).

## API Endpoints

The API is organized under `/api/v1` with the following routes:
- `/api/v1/auth` - Authentication endpoints
- `/api/v1/users` - User management
- `/api/v1/courses` - Course management
- `/api/v1/batches` - Batch management
- `/api/v1/enrollments` - Enrollment management
- `/api/v1/quizzes` - Quiz management
- `/api/v1/assignments` - Assignment management
- `/api/v1/progress` - Progress tracking

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm run lint` - Run ESLint
