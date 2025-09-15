/// <reference types="jest" />

process.env.DATABASE_URL =
  "postgresql://postgres:postgres@localhost:5432/postgres?schema=public";

import request from "supertest";
import app from "../src/index";
import { prisma } from "../src/db";

describe("Users API", () => {
  beforeAll(async () => {
    // Ensuring DB is connected
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    // Clean up users table before each test
    await prisma.user.deleteMany();
  });

  describe("POST /users", () => {
    it("should insert a valid user", async () => {
      const userData = {
        user_name: "John Doe",
        date_of_birth: "1990-01-01",
        email: "john@example.com",
        password: "Password123",
      };

      const response = await request(app)
        .post("/users")
        .send(userData)
        .expect(201);

      expect(response.body).toHaveProperty("id");
      expect(response.body.user_name).toBe(userData.user_name);
      expect(response.body.email).toBe(userData.email);
    });

    it("should fail with duplicate email", async () => {
      const userData = {
        user_name: "John Doe",
        date_of_birth: "1990-01-01",
        email: "john@example.com",
        password: "Password123",
      };

      // Insert first
      await request(app).post("/users").send(userData).expect(201);

      // Try duplicate
      const response = await request(app)
        .post("/users")
        .send(userData)
        .expect(400);

      expect(response.body.error).toBe("DUPLICATE_EMAIL");
    });

    it("should fail with invalid name (empty)", async () => {
      const userData = {
        user_name: "",
        date_of_birth: "1990-01-01",
        email: "john@example.com",
        password: "password123",
      };

      const response = await request(app)
        .post("/users")
        .send(userData)
        .expect(400);

      expect(response.body.error).toBe("INVALID_NAME");
    });

    it("should fail with invalid date of birth", async () => {
      const userData = {
        user_name: "John Doe",
        date_of_birth: "invalid-date",
        email: "john@example.com",
        password: "password123",
      };

      const response = await request(app)
        .post("/users")
        .send(userData)
        .expect(400);

      expect(response.body.error).toBe("INVALID_DATE_OF_BIRTH");
    });

    it("should fail with invalid email", async () => {
      const userData = {
        user_name: "John Doe",
        date_of_birth: "1990-01-01",
        email: "invalid-email",
        password: "password123",
      };

      const response = await request(app)
        .post("/users")
        .send(userData)
        .expect(400);

      expect(response.body.error).toBe("INVALID_EMAIL");
    });

    it("should fail with invalid password (too short)", async () => {
      const userData = {
        user_name: "John Doe",
        date_of_birth: "1990-01-01",
        email: "john@example.com",
        password: "123",
      };

      const response = await request(app)
        .post("/users")
        .send(userData)
        .expect(400);

      expect(response.body.error).toBe("INVALID_PASSWORD");
    });
  });
});
