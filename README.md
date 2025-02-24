# Let's Talk Web-App

A collaborative platform for team communication and issue tracking.

## Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [API Endpoints & Test Cases](#api-endpoints--test-cases)
    1. [Authentication Endpoints (Done)](#1-authentication-endpoints-done)
    2. [Service Issues API (Testing in Progress)](#2-service-issues-api-testing-in-progress)
    3. [Press Releases API (Testing in Progress)](#3-press-releases-api-testing-in-progress)
    4. [Government Services API (Testing in Progress)](#4-government-services-api-testing-in-progress)
    5. [Dashboard API (Testing in Progress)](#5-dashboard-api-testing-in-progress)
    6. [User Preferences API (Optional – Testing in Progress)](#6-user-preferences-api-optional--testing-in-progress)
- [Postman Collection & Environment Setup](#postman-collection--environment-setup)
- [Additional Resources](#additional-resources)
- [License](#license)

## Overview

This document details the backend API endpoints for the Let's Talk Web-App along with comprehensive Postman test cases. Authentication (login & registration) is fully implemented and tested. The following API endpoints are currently under testing:
- Service Issues
- Press Releases
- Government Services
- Dashboard
- User Preferences

## Project Structure

Root Project Name: `letstalk-app\webapp`

```
letstalk-app\webapp>
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── dashboardController.js
│   │   ├── govServiceController.js
│   │   ├── pressReleaseController.js
│   │   ├── serviceIssueController.js
│   │   └── user.controller.js
│   ├── middlewares/
│   │   └── auth.js
│   ├── models/
│   │   └── User.js
│   ├── public/
│   │   ├── login.html
│   │   └── signup.html
│   ├── routes/
│   │   ├── auth.js
│   │   ├── serviceIssues.js
│   │   ├── pressReleases.js
│   │   ├── govServices.js
│   │   └── dashboard.js
│   └── server.js
├── .env
├── package.json
└── README.md
```

## Backend Setup

### Prerequisites

- Node.js v16+
- PostgreSQL (or your chosen DB)

### Installation

```bash
cd letstalk-app/webapp/backend
npm install
```

### Configuration

Create a `.env` file in the root directory with the following variables (adjust as needed):

```
PORT=3000
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=LocalGovDB
JWT_SECRET=your_jwt_secret
```

### Running the Server

- Development Mode: `npm run dev`
- Production Mode: `npm start`

## Frontend Setup

### Frontend Architecture

```bash
cd letstalk-app/webapp/frontend/
```

```
├── public/          # Static assets and entry HTML
├── src/
│   ├── api/         # API service layer
│   ├── components/  # Reusable UI components
│   ├── features/    # Feature-based modules
│   ├── hooks/       # Custom React hooks
│   ├── store/       # State management (Redux/Zustand)
│   ├── styles/      # Global styling
│   ├── utils/       # Helper functions
│   └── App.js       # Root component
├── .env.example     # Environment template
├── package.json     # Dependency management
└── tsconfig.json    # TypeScript configuration
```

Ensure your frontend configuration points to the correct backend API URL if applicable.

## Environment Variables (for Postman)

Create a Postman environment named "Localhost - SA" with the following variables:

- `base_url`: `http://localhost:3000`
- `jwt_token`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzQwMTI1NjA3LCJleHAiOjE3NDAxMjkyMDd9.O0OBtGlSQUY_qRJmo3IBJuI0Wu-g_lvkZiU7RONRS-8`

Use `{{base_url}}` in your request URLs and `{{jwt_token}}` in the Authorization header.

## API Endpoints & Test Cases

### 1. Authentication Endpoints (Done)

#### A. Login

- **Method**: POST
- **URL**: `{{base_url}}/api/auth/login`
- **Headers**: `Content-Type: application/json`
- **Body (raw JSON)**:

```json
{
    "email": "user@example.com",
    "password": "your_password"
}
```

- **Test Script (Postman Tests tab)**:

```
const response = pm.response.json();
pm.test("Status code is 200", function () {
        pm.response.to.have.status(200);
});
if (response.token) {
        pm.environment.set("jwt_token", response.token);
}
```

- **Expected Outcome**: Login successful, HTTP 200, and a JWT token is returned.

#### B. Signup

- **Method**: POST
- **URL**: `{{base_url}}/api/auth/signup`
- **Headers**: `Content-Type: application/json`
- **Body (raw JSON)**:

```json
{
    "email": "newuser@example.com",
    "password": "new_password",
    "username": "new_user"
}
```

- **Expected Outcome**: User created successfully with an HTTP 201/200 response and a JWT token or a redirect to /dashboard.

### 2. Service Issues API (Testing in Progress)

#### A. Fetch All Service Issues

- **Method**: GET
- **URL**: `{{base_url}}/api/service-issues`
- **Headers**: `Authorization: Bearer {{jwt_token}}`
- **Test Script**:

```
pm.test("Status code is 200", function () {
        pm.response.to.have.status(200);
});
pm.test("Response is an array", function () {
        let jsonData = pm.response.json();
        pm.expect(jsonData).to.be.an('array');
});
```

- **Expected Outcome**: A JSON array listing all service issues.

#### B. Fetch a Specific Service Issue

- **Method**: GET
- **URL**: `{{base_url}}/api/service-issues/1` (Replace 1 with a valid issue ID)
- **Headers**: `Authorization: Bearer {{jwt_token}}`
- **Test Script**:

```
pm.test("Status code is 200", function () {
        pm.response.to.have.status(200);
});
let jsonData = pm.response.json();
pm.test("Response has issue ID 1", function () {
        pm.expect(jsonData.id).to.eql(1);
});
```

- **Expected Outcome**: A JSON object representing the service issue with the specified ID.

#### C. Create a Service Issue

- **Method**: POST
- **URL**: `{{base_url}}/api/service-issues`
- **Headers**: `Content-Type: application/json`, `Authorization: Bearer {{jwt_token}}`
- **Body (raw JSON)**:

```json
{
    "location": "Mthatha",
    "description": "Water supply disrupted",
    "image": "base64_image_data"
}
```

- **Test Script**:

```
pm.test("Status code is 201", function () {
        pm.response.to.have.status(201);
});
let jsonData = pm.response.json();
pm.test("Response contains new issue ID", function () {
        pm.expect(jsonData).to.have.property("id");
});
```

- **Expected Outcome**: HTTP 201 with a JSON object of the newly created service issue.

### 3. Press Releases API (Testing in Progress)

#### Fetch Press Releases

- **Method**: GET
- **URL**: `{{base_url}}/api/press-releases`
- **Headers**: `Authorization: Bearer {{jwt_token}}`
- **Test Script**:

```
pm.test("Status code is 200", function () {
        pm.response.to.have.status(200);
});
pm.test("Response is an array", function () {
        let jsonData = pm.response.json();
        pm.expect(jsonData).to.be.an('array');
});
```

- **Expected Outcome**: A JSON array listing all press releases.

### 4. Government Services API (Testing in Progress)

#### Check Service Status

- **Method**: GET
- **URL**: `{{base_url}}/api/government-services?type=water`
- **Headers**: `Authorization: Bearer {{jwt_token}}`
- **Test Script**:

```
pm.test("Status code is 200", function () {
        pm.response.to.have.status(200);
});
let jsonData = pm.response.json();
pm.test("Response is an object", function () {
        pm.expect(jsonData).to.be.an('object');
});
```

- **Expected Outcome**: A JSON object (or array) with details about water-related government services.

### 5. Dashboard API (Testing in Progress)

#### Fetch Dashboard Data

- **Method**: GET
- **URL**: `{{base_url}}/api/dashboard`
- **Headers**: `Authorization: Bearer {{jwt_token}}`
- **Test Script**:

```
pm.test("Status code is 200", function () {
        pm.response.to.have.status(200);
});
let jsonData = pm.response.json();
pm.test("Response is an object", function () {
        pm.expect(jsonData).to.be.an('object');
});
```

- **Expected Outcome**: A JSON payload containing dashboard statistics/data.

### 6. User Preferences API (Optional – Testing in Progress)

#### Update Preferences

- **Method**: PUT
- **URL**: `{{base_url}}/api/user/preferences`
- **Headers**: `Content-Type: application/json`, `Authorization: Bearer {{jwt_token}}`
- **Body (raw JSON)**:

```json
{
    "language": "es",
    "notifications": true
}
```

- **Test Script**:

```
pm.test("Status code is 200", function () {
        pm.response.to.have.status(200);
});
let jsonData = pm.response.json();
pm.test("Preferences updated successfully", function () {
        pm.expect(jsonData.message).to.eql("Preferences updated successfully");
});
```

- **Expected Outcome**: A confirmation message indicating the preferences have been updated.

## Postman Collection & Environment Setup

- **Collection Name**: "Let's Talk Web App API Testing Suite"
- **Environment**: "Localhost - SA"

### Environment Variables

- `base_url`: `http://localhost:3000`
- `jwt_token`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzQwMTI1NjA3LCJleHAiOjE3NDAxMjkyMDd9.O0OBtGlSQUY_qRJmo3IBJuI0Wu-g_lvkZiU7RONRS-8`

### Steps to Use in Postman

1. **Import/Create the Collection**:
     - Create a new collection in Postman titled "Let's Talk Web App API Testing Suite" and add all the endpoints listed above.
2. **Set Up the Environment**:
     - Create an environment called "Localhost - SA" with the above variables. Ensure that the environment is active when sending requests.
3. **Run Authentication Endpoints**:
     - Test the Login endpoint first.
     - Ensure the Tests script extracts and sets the `jwt_token` variable automatically.
4. **Test Protected Endpoints**:
     - For endpoints under Service Issues, Press Releases, Government Services, Dashboard, and User Preferences, include the following header in each request:
         ```css
         Authorization: Bearer {{jwt_token}}
         ```
     - Validate responses using the test scripts provided.
5. **Validate Responses**:
     - Check for the expected HTTP status codes and JSON payloads in the response body.

## Additional Resources

For further details and troubleshooting, please refer to:
- Detailed Postman API Testing Guide[https://bit.ly/4kbQHKA]

## License

Distributed under the MIT License. See the LICENSE file for more information.
