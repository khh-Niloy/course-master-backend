# Course Master Backend

## Project Name & Description

**Course Master Backend** is a RESTful API backend for managing online courses, student enrollments, assessments, and progress tracking. This backend provides a complete solution for educational platforms that need to manage courses, batches, student enrollments, quizzes, assignments, and track student progress in a centralized system.

The system supports multiple user roles (Admin, Student, Instructor) with role-based access control, enabling secure and organized management of educational content and student activities.

## Live Demo

**Live Site:** https://course-master-backend-two.vercel.app/

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

## Installation & Run Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- MongoDB database (local or cloud instance)
- SMTP email service credentials (for email notifications)

### Installation Steps

1. **Clone the repository** (if applicable)
   ```bash
   git clone <repository-url>
   cd course-master-backend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   
   Create a `.env` file in the root directory. See the [Environment Variables](#environment-variables) section below for all required variables.

4. **Run Development Server**
   ```bash
   npm run dev
   ```
   
   The server will start on `http://localhost:5000` (or the port specified in your `.env` file).

### Production Build

1. **Build the project**
   ```bash
   npm run build
   ```
   
   This compiles TypeScript to JavaScript in the `dist` directory.

2. **Run the production server**
   ```bash
   node dist/server.js
   ```

### Available Scripts

- `npm run dev` - Start development server with hot reload (ts-node-dev)
- `npm run build` - Build TypeScript to JavaScript
- `npm run lint` - Run ESLint to check code quality

## Environment Variables

The following environment variables are required. Create a `.env` file in the root directory with these variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port number | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/course-master` |
| `NODE_ENV` | Environment mode | `development` or `production` |
| `BCRYPT_SALT_ROUND` | Number of salt rounds for password hashing | `10` |
| `JWT_ACCESS_SECRET` | Secret key for JWT access tokens | `your_access_secret_key` |
| `JWT_ACCESS_EXPIRES` | Access token expiration time | `15m` |
| `JWT_REFRESH_SECRET` | Secret key for JWT refresh tokens | `your_refresh_secret_key` |
| `JWT_REFRESH_EXPIRES` | Refresh token expiration time | `7d` |
| `ADMIN_EMAIL` | Email for the default admin user | `admin@example.com` |
| `ADMIN_PASSWORD` | Password for the default admin user | `your_admin_password` |
| `FRONTEND_URL` | Frontend application URL (for CORS) | `http://localhost:3000` |
| `SMTP_USER` | SMTP server username | `your_smtp_username` |
| `SMTP_PASS` | SMTP server password | `your_smtp_password` |
| `SMTP_PORT` | SMTP server port | `587` |
| `SMTP_HOST` | SMTP server hostname | `smtp.gmail.com` |
| `SMTP_FROM` | Email address to send from | `noreply@example.com` |

### Example `.env` file:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/course-master
NODE_ENV=development
BCRYPT_SALT_ROUND=10
JWT_ACCESS_SECRET=your_access_secret_key_here
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_SECRET=your_refresh_secret_key_here
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

## API Documentation

All API endpoints are prefixed with `/api/v1`. The API uses JWT authentication with role-based access control. Access tokens are sent via HTTP-only cookies.

### Base URL
```
http://localhost:5000/api/v1
```

### Authentication Endpoints (`/api/v1/auth`)

| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| `POST` | `/auth/login` | User login (returns JWT tokens in cookies) | Public |
| `GET` | `/auth/logout` | User logout (clears cookies) | All authenticated users |
| `GET` | `/auth/me` | Get current user information | All authenticated users |

### User Management (`/api/v1/users`)

| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| `POST` | `/users` | Create a new user | Public (or Admin) |

### Course Management (`/api/v1/courses`)

| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| `POST` | `/courses` | Create a new course | Admin |
| `GET` | `/courses` | Get all courses | All authenticated users |
| `GET` | `/courses/:slug` | Get course by slug | All authenticated users |
| `PUT` | `/courses/:slug` | Update course (full update) | Admin |
| `PATCH` | `/courses/:slug` | Update course (partial update) | Admin |
| `DELETE` | `/courses/:slug` | Delete a course | Admin |

### Batch Management (`/api/v1/batches`)

| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| `POST` | `/batches` | Create a new batch | Admin |
| `GET` | `/batches` | Get all batches | All authenticated users |
| `GET` | `/batches/course/:courseId` | Get batches by course ID | All authenticated users |
| `PATCH` | `/batches/:id` | Update batch (partial update) | Admin |

### Enrollment Management (`/api/v1/enrollments`)

| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| `POST` | `/enrollments` | Create a new enrollment | Admin, Student |
| `GET` | `/enrollments` | Get all enrollments | Admin |
| `GET` | `/enrollments/student/:studentId` | Get enrollments by student ID | All authenticated users |
| `GET` | `/enrollments/course/:courseId` | Get enrollments by course ID | Admin |

### Quiz Management (`/api/v1/quizzes`)

| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| `POST` | `/quizzes` | Create a new quiz | Admin |
| `GET` | `/quizzes` | Get all quizzes | Admin |
| `GET` | `/quizzes/:id` | Get quiz by ID | All authenticated users |
| `POST` | `/quizzes/:id/submit` | Submit quiz answers and get results | Student |
| `GET` | `/quizzes/:quizId/result` | Get quiz result for a student | Student |
| `PATCH` | `/quizzes/:id` | Update quiz (partial update) | Admin |

### Assignment Management (`/api/v1/assignments`)

| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| `POST` | `/assignments` | Create a new assignment | Admin |
| `GET` | `/assignments` | Get all assignments | Admin |
| `GET` | `/assignments/:id` | Get assignment by ID | All authenticated users |
| `POST` | `/assignments/:id/submit` | Submit an assignment | Student |
| `GET` | `/assignments/:assignmentId/submission` | Get assignment submission | Student |
| `GET` | `/assignments/submissions/all` | Get all assignment submissions | Admin |
| `PATCH` | `/assignments/:id` | Update assignment (partial update) | Admin |
| `PATCH` | `/assignments/submissions/:submissionId/review` | Review and grade an assignment submission | Admin |

### Progress Tracking (`/api/v1/progress`)

| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| `POST` | `/progress/lesson/:lessonId/complete` | Mark a lesson as complete | Student |
| `DELETE` | `/progress/lesson/:lessonId/complete` | Mark a lesson as incomplete | Student |
| `GET` | `/progress/lesson/:lessonId` | Get lesson progress status | Student |
| `GET` | `/progress/enrollment/:enrollmentId` | Get all progress for an enrollment | Admin, Student |
| `GET` | `/progress/enrollment/:enrollmentId/summary` | Get enrollment progress summary | Admin, Student |
| `GET` | `/progress/student/me` | Get student's overall progress | Student |

### Role-Based Access Control

The API uses three main roles:
- **Admin**: Full access to all endpoints for management
- **Student**: Access to view courses, submit quizzes/assignments, and track progress
- **Instructor**: (Reserved for future implementation)

### Authentication

- JWT tokens are stored in HTTP-only cookies
- Access tokens expire in 15 minutes (configurable)
- Refresh tokens expire in 7 days (configurable)
- Include cookies in requests for authenticated endpoints

