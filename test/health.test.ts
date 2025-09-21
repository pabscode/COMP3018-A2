import request, {Response} from "supertest";
import app from "../src/app";

// Health Test Checkpoint

describe("GET /health", () => {
  it("should return server health status", async () => {
    const response: Response = await request(app).get("/health");

        expect(response.body.status).toBe("OK");
        expect(response.body).toHaveProperty("uptime");
        expect(response.body).toHaveProperty("timestamp");
        expect(response.body).toHaveProperty("version");
  });
});
