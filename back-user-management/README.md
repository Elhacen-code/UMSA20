# User Management Backend

This is the backend application for the User Management System built with Spring Boot. It provides RESTful APIs for user management, authentication, and authorization.

## Features

- RESTful API endpoints for user management
- JWT-based authentication
- Role-based authorization
- Spring Security integration
- Database persistence with JPA

## Prerequisites

- Java 11 or higher
- Maven
- MySQL/PostgreSQL database

## Installation

1. Clone the repository
2. Navigate to the project directory:
   ```bash
   cd back-user-management
   ```
3. Configure database settings in `application.properties`
4. Build the project:
   ```bash
   mvn clean install
   ```

## Configuration

### Database Configuration

Update `src/main/resources/application.properties` with your database settings:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/user_management
spring.datasource.username=your_username
spring.datasource.password=your_password
```

## API Endpoints

### Authentication
- POST `/api/auth/login` - User login
- POST `/api/auth/register` - User registration

### User Management
- GET `/api/users` - Get all users
- GET `/api/users/{id}` - Get user by ID
- PUT `/api/users/{id}` - Update user
- DELETE `/api/users/{id}` - Delete user

### Role Management
- GET `/api/roles` - Get all roles
- POST `/api/roles` - Create new role

## Project Structure

```
src/
├── main/
│   ├── java/
│   │   └── com/example/springusermanagement/
│   │       ├── config/      # Configuration classes
│   │       ├── controller/  # REST controllers
│   │       ├── model/       # Entity classes
│   │       ├── repository/  # Data repositories
│   │       └── service/     # Business logic
│   └── resources/
│       └── application.properties  # Application configuration
```

## Security

- JWT-based authentication
- Password encryption using BCrypt
- Role-based access control
- Secure session management

## Running Tests

```bash
mvn test
```

## Deployment

1. Build the JAR file:
   ```bash
   mvn clean package
   ```
2. Run the application:
   ```bash
   java -jar target/spring-user-management-0.0.1-SNAPSHOT.jar
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.