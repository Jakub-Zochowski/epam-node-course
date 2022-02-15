import dotenv from "dotenv";
import { StatusCodes } from "http-status-codes";
dotenv.config();

import request from "supertest";
import app from "../app";

describe("Test Authentication Path", () => {
  test("Requesting JWT should return an JWT token", async () => {
    const data = await request(app).post("/auth/login").send({
      username: "test",
      password: "password",
    });
    expect(data.statusCode).toBe(StatusCodes.OK);
    expect(data.text).toBeTruthy();
  });
});
