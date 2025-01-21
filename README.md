# Task Management App

A collaborative task management application that allows users to create, assign, track, and manage tasks in a team environment.

## Features

### Admin Users

- Add new team members.
- Assign tasks to users.
- View task progress for each user.

### Non-Admin Users

- View only their assigned tasks.
- Update task status.

## Sample Credentials

### Admin Credentials

- **Email Address**: admin@gmail.com
- **Password**: Sushant@123

### User Credentials

- **Email**: user1@gmail.com
  **Password**: Sushant@123

- **Email**: user2@gmail.com
  **Password**: Sushant@123

## Frontend URL

[Visit the Application](https://task-management-app-live.netlify.app)



## Project Setup Instructions

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- A .env file with the following variables:
  ```env
  REACT_APP_API_URL=https://task-manager-backend-7nni.onrender.com
  ```

### Steps to Run Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Sushantshekharzz/task-manager-frontend.git
   cd task-manager-frontend
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the development server**:
   ```bash
   npm start
   ```
4. Open `http://localhost:3000` in your browser.

### Build for Production

```bash
npm run build
```

### Run Tests

```bash
npm test
```

## Deployment Link

[Visit the Deployed Application](https://task-management-app-live.netlify.app)

---

## Additional Notes

- Ensure the API server is running for the application to fetch data.
- For any issues, please open a GitHub issue or contact the maintainer.

