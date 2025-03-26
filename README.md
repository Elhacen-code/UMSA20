# User Management System

A full-stack user management application built with Spring Boot (backend) and Angular (frontend).

## Project Overview

This project consists of two main components:
- **Frontend**: Angular-based web application
- **Backend**: Spring Boot REST API

## Prerequisites

### Backend Requirements
- Java JDK 17 or higher
- Maven 3.9.x or higher
- Postgresql

### Frontend Requirements
- Node.js 22.x or higher
- npm 10.x or higher
- Angular CLI

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd back-user-management
   ```

2. Install dependencies:
   ```bash
   mvn clean install
   ```

3. Run the application:
   ```bash
   mvn spring-boot:run
   ```

The backend server will start on `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd front-user-management
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   ng serve
   ```

The frontend application will be available at `http://localhost:4200`

## Features

- User authentication and authorization
- User management (CRUD operations)
- Role-based access control
- Responsive UI design
- RESTful API endpoints

## Project Structure

```
├── back-user-management/    # Backend Spring Boot application
│   ├── src/                # Source files
│   ├── pom.xml            # Maven configuration
│   └── README.md          # Backend documentation
│
└── front-user-management/  # Frontend Angular application
    ├── src/               # Source files
    ├── package.json       # npm configuration
    └── README.md          # Frontend documentation
```

## Development

### Backend Development

The backend is built with:
- Spring Boot
- Spring Security
- Spring Data JPA
- MySQL Database

### Frontend Development

The frontend is built with:
- Angular 14+
- Angular Material
- RxJS
- SCSS for styling

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Demo
