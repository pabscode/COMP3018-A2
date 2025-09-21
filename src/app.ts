// import the express application and type definition
import express, { Express } from "express";
import morgan from "morgan";

import employeeRoutes from "./api/v1/routes/employeesRoutes";
import branchesRoutes from "./api/v1/routes/branchesRoutes";

// initialize the express application
const app: Express = express();

// Interface for health check response
// An interface in TypeScript defines the structure or "shape" of an object.
interface HealthCheckResponse {
    status: string;
    uptime: number;
    timestamp: string;
    version: string;
}
// Middleware START
app.use(morgan("combined"));

// Ensures incoming body is correctly parsed to JSON, otherwise req.body would be undefined
app.use(express.json());

// Middleware END

// respond to GET request at endpoint "/" with message
app.get("/", (req, res) => {
    res.send("Welcome Client");
});

/**
 * Health check endpoint that returns server status information
 * @returns JSON response with server health metrics
 */
app.get("/health", (req, res) => {
    const healthData: HealthCheckResponse = {
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    };

    res.json(healthData);
});


//ROUTE IMPORTS
app.use("/api/v1/employee", employeeRoutes);
app.use("/api/v1/branches", branchesRoutes);


export default app;