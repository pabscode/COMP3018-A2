import { CorsOptions } from "node_modules/@types/cors";

// config/corsConfig.ts
export const getCorsOptions = (): CorsOptions => {
    const isDevelopment = process.env.NODE_ENV === "development";

    if (isDevelopment) {
        // Allow all origins in development for easy testing
        return {
            origin: true,
            credentials: true,
        };
    }

    // Production gets full security
    return {
        origin: process.env.ALLOWED_ORIGINS?.split(",") || [],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        maxAge: 36000,
    } as CorsOptions;
};
