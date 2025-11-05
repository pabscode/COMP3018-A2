# Employee Directory & Branches Management API

## Project Overview 

- This API helps manage employee records and branch details for organizations. 

### Key Features

- Employee Management: Create, update, delete employee details. You can filter employees by: 
    - Department Name
    - Employee ID
    - Branch Name
- Branch Management: Create, update and delete branch records and read branch details using Branch ID
- Data Validation: Input validation and error handling 

### Why Use This API?

- This API makes it easier to:

    - Keep all employee and branch information in one place
    - Quickly find employees by department, ID, or branch
    - Keep your employee and branch data organized

## Installation Instructions

1. Clone the code into your desired directory by running this in your terminal:
    - git clone https://github.com/pabscode/COMP3018-A2.git
    - cd COMP3018-A2
2. Install the necessary dependencies and packages (Terminal):
    - npm install
3. Create an .env file in the root of your project file:
    - NODE_ENV=development
    - PORT=3000
    - SWAGGER_SERVER_URL=http://localhost:3000/api/v1

    ### The Following should be your Firebase Configurations, found in your firebase service account json file: 
    - FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
    - FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nINSERT_YOUR_KEY\n-----END PRIVATE KEY-----\n"
    - FIREBASE_CLIENT_EMAIL=INSERT_CLIENT_EMAIL

## API Request Example

### Example 1: Get Employee By ID

    Endpoint: GET /api/v1/employee/:id
    id = HC3mXN6Dxyg4eaSjhBxY in this scenario

    JavaScript Fetch:

    const requestOptions = {
    method: "GET",
    redirect: "follow"
    };

    fetch("http://localhost:3000/api/v1/employee/HC3mXN6Dxyg4eaSjhBxY", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

### Example 2: Create Branch
    
    Endpoint: POST /api/v1/branches

    JavaScript Fetch:

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "address": "1300 Burrard St, Vancouver, BC, V6Z 2C7",
        "name": "Vancouver Branch",
        "phone": "604-456-0022"
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("http://localhost:3000/api/v1/branches", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));

## Link to Public API Documentation: 

- https://pabscode.github.io/COMP3018-A2/

## How to view Documentation locally:

- When your server is running, you can view the documentation via Swagger UI: 
    - http://localhost:3000/api-docs 