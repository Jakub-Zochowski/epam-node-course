import dotenv from 'dotenv';
dotenv.config();

import request from 'supertest';
import app from '../app';


describe("Test Authentication Path", () => {
  test("Requesting JWT should return an JWT token", () => {
    return request(app)
      .post("/auth/login")
			.send({
				"username": "test",
				"password": "password"
		})
      .then((response: { statusCode: number; text: string}) => {
        expect(response.statusCode).toBe(200);
				expect(response.text).toBeTruthy();
      });
  });
});