# User Management Frontend

This is the frontend application for the User Management System built with Angular. It provides a modern, responsive user interface for managing users, authentication, and authorization.

## Features

- User authentication and authorization
- User management interface
- Role-based access control
- Responsive design
- Integration with RESTful backend APIs

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- Angular CLI

## Installation

1. Clone the repository
2. Navigate to the project directory:
   ```bash
   cd front-user-management
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Development Server

Run `ng serve` for a development server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Project Structure

```
src/
├── app/                 # Main application code
│   ├── components/      # Reusable UI components
│   ├── services/        # API and business logic services
│   ├── models/          # Data models and interfaces
│   ├── guards/          # Route guards for authentication
│   └── shared/          # Shared utilities and components
├── assets/             # Static assets (images, icons)
├── environments/       # Environment configuration
└── styles/            # Global styles and themes
```

## Features Implementation

### Authentication
- Login/Logout functionality
- JWT token management
- Protected routes

### User Management
- User listing with pagination
- User creation and editing
- User deletion
- Role assignment

### Role Management
- Role listing
- Role creation
- Permission assignment

## Code Style Guidelines

- Follow Angular style guide
- Use TypeScript features appropriately
- Implement proper error handling
- Write unit tests for components and services

## Testing

- Run `ng test` to execute unit tests via Karma
- Run `ng e2e` to execute end-to-end tests

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Integration with Backend

The frontend application communicates with the Spring Boot backend through RESTful APIs. Ensure the backend server is running on `http://localhost:8080` for proper functionality.

## Security Considerations

- Implement proper input validation
- Use secure HTTP headers
- Follow OWASP security guidelines
- Implement proper session management

## License

This project is licensed under the MIT License.
