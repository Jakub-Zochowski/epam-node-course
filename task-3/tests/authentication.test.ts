import dotenv from "dotenv";
dotenv.config();

import request from "supertest";
import app from "../app";

describe("Test Authentication Path", () => {
  test("Requesting JWT should return an JWT token", async () => {
		const data = await request(app)
		.post("/auth/login")
		.send({
			username: "test",
			password: "password",
		})
    expect(data.statusCode).toBe(200);
    expect(data.text).toBeTruthy();
  });
});
