# Running and Testing the Cheese Application

This document provides instructions on setting up, running, and testing the Cheese application, which includes both a React frontend and an Express backend, using Docker Compose. It also includes details on accessing the Swagger UI for API documentation.

### -- Hover over cheese for info

## Setup and Run the Application

### Using Docker Compose

Ensure Docker and Docker Compose are installed on your system. Then follow these steps:

1. **Start the application**
   Navigate to the root directory of your project where the `docker-compose.yml` file is located and run the following command:
   ```docker-compose up```

   This command will build and start both the frontend and backend services as defined in your Docker Compose configuration file.

## Accessing the Application

### Frontend

The React frontend will be accessible at:
```http://localhost:80```

### Backend

The Express backend will be accessible at:
```http://localhost:3000```

## API Documentation with Swagger

To access the Swagger UI for your API documentation, navigate to:
```http://localhost:3000/api-docs```

This endpoint will display the Swagger UI, where you can interact with the API endpoints directly.

## Running Tests

### Backend Tests

To run the backend tests, you can use the following command from within the backend service container:
```docker exec -it <container_name_or_id> npm test```

### Frontend Tests

To run the frontend tests, use the following command from within the frontend service container:
```docker exec -it <container_name_or_id> npm test```

This command will initiate the test runner in the interactive watch mode.

---

Ensure to replace `<container_name_or_id>` with the actual name or ID of your Docker containers, which you can find using ```docker ps``` command after the containers are running.


# Running Tests Manually for the Cheese Application

If you encounter issues running tests within Docker containers or prefer a more direct approach, you can manually execute the tests for both the backend and frontend. Below are the steps to run tests directly on your local machine.

## Prerequisites

Ensure that Node.js is installed on your system and that all project dependencies are installed. Navigate to the root directory of each part of your project (frontend and backend) in separate terminal windows.

## Backend Tests

1. **Navigate to the Backend Directory**
   Change into the backend directory:
   ```cd path/to/backend```

2. **Install Dependencies**
   If you haven't already, install all necessary dependencies:
   ```npm install```

3. **Set Environment Variables**
   Ensure any required environment variables are set up, especially if your tests depend on database connections or external services. This can be done by setting them in your terminal or through a `.env` file.

4. **Run the Tests**
   Execute the tests by running:
   ```npm test```

   This command runs the test suite defined in the `package.json` scripts section.

## Frontend Tests

1. **Navigate to the Frontend Directory**
   Change to the frontend directory:
   ```cd path/to/frontend```

2. **Install Dependencies**
   Similar to the backend, install all dependencies:
   ```npm install```

3. **Run the Tests**
   Start the test runner:
   ```npm test```

   This will typically launch the test runner in interactive watch mode, allowing you to see test results in real-time and rerun tests as necessary.

## Additional Tips

- **Troubleshooting**: If tests fail to run or produce unexpected results, check for version mismatches in Node.js or dependencies and ensure your environment closely matches the one expected by your project (e.g., Node.js version, OS-specific behavior).

By following these steps, you can manually execute tests for both the backend and frontend of your Cheese application without relying on Docker.


# Future Enhancements

Given more time, several enhancements and features could be implemented to improve the Cheese application both functionally and aesthetically. Below are some of the proposed improvements:

## Frontend Enhancements

1. **Enhanced Styling and User Interface**
   - Implement a more better design with advanced CSS and interactive elements using libraries like Tailwind CSS or Material-UI.
   - Improve responsiveness to offer a better user experience on various devices including tablets and smartphones.

2. **Additional Functionalities**
   - **Adding and Deleting Cheese**: Allow users to add new cheese types and delete existing ones directly from the UI, enhancing interactivity.
   - **Updating Cheese Stock**: Implement functionality to update the stock levels of different cheeses, reflecting real-time availability.
   - **Sorting and Filtering**: Enable users to sort and filter cheeses based on properties like price, color, or name.

## Backend Enhancements

1. **Database Integration**
   - Replace the in-memory array with a more robust database solution such as PostgreSQL or MongoDB for persistent data storage.


2. **API Functionality Expansion**
   - **Authentication and Authorization**: Add user authentication and authorization to manage access to different parts of the API.
   - **Rate Limiting**: Introduce API rate limiting to prevent abuse and ensure service availability for all users.
   - **Logging and Monitoring**: Set up logging and monitoring to track API usage and errors for better maintainability.

3. **Security Improvements**
   - Implement security best practices such as HTTPS, input validation, and secure headers to protect the API and its users from common vulnerabilities.

## Testing Enhancements

1. **Expanded Test Coverage**
   - Increase test coverage to include integration tests and end-to-end tests using tools like Cypress or Selenium.
   - Implement performance testing to ensure the application scales well under load.

2. **Automated Testing Pipeline**
   - Set up a Continuous Integration/Continuous Deployment (CI/CD) pipeline to automate testing and deployment processes, ensuring that new changes are tested and deployed efficiently.

These enhancements would significantly improve the functionality, usability, security, and maintainability of the Cheese application, making it more robust and user-friendly.
