const request = require("supertest");
const app = require("./index");

describe("Node.js API", () => {
  describe("GET /", () => {
    it("should return application information", async () => {
      const response = await request(app).get("/");

      expect(response.statusCode).toBe(200);

      expect(response.body).toHaveProperty("message");
      expect(response.body).toHaveProperty("environment");
      expect(response.body).toHaveProperty("timestamp");
      expect(response.body).toHaveProperty("hostname");
    });
  });

  describe("GET /health", () => {
    it("should return healthy status", async () => {
      const response = await request(app).get("/health");

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        status: "healthy",
      });
    });
  });

  describe("GET /version", () => {
    it("should return API version", async () => {
      const response = await request(app).get("/version");

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        version: "v2",
      });
    });
  });

  describe("Unknown routes", () => {
    it("should return 404", async () => {
      const response = await request(app).get("/does-not-exist");

      expect(response.statusCode).toBe(404);
    });
  });
});
