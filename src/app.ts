// import the express application and type definition
import express, { Express } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import { getHelmetConfig } from "config/helmetConfig";

// Load environment variables before internal imports
dotenv.config();

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
app.use(helmet());
app.use(helmet(getHelmetConfig()));

// Adding custom security headers beyond Helmet defaults
app.use(helmet());

// Add custom security headers
app.use((req, res, next) => {
    // Prevent caching of sensitive endpoints
    if (req.path.includes("/admin") || req.path.includes("/user")) {
        res.setHeader(
            "Cache-Control",
            "no-store, no-cache, must-revalidate, private"
        );
        res.setHeader("Pragma", "no-cache");
        res.setHeader("Expires", "0");
    }

    // Add rate limiting information
    res.setHeader("X-RateLimit-Policy", "100-per-hour");

    next();
});
app.use(cors());
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