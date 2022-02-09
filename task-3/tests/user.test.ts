import dotenv from "dotenv";
dotenv.config();

import request from "supertest";
import app from "../app";

import { AuthService } from "../services/authentication";
import { UserService } from "../services/user";

const jwtToken = AuthService.generateAccessToken({
  username: "newUser123",
  password: "somePassword",
});

describe("Test User Path", () => {
  test("Requesting suggested users should return users.", async () => {
    const suggestedUsers: any[] = await UserService.getSuggestedUsers({
      login: "test",
      limit: 3,
    });
    return request(app)
      .get("/user/suggested?limit=3&login=test")
      .set("Authorization", "Bearer " + jwtToken)
      .then((response: { statusCode: number; body: any }) => {
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body[0].id).toBe(suggestedUsers[0].id);
        expect(response.body[0].login).toBe(suggestedUsers[0].login);
        expect(response.body[0].password).toBe(suggestedUsers[0].password);
        expect(response.body[0].age).toBe(suggestedUsers[0].age);
        expect(response.body[0].is_deleted).toBe(suggestedUsers[0].is_deleted);
      });
  });

  test("Requesting suggested users without providing limit should fail", () => {
    return request(app)
      .get("/user/suggested?login=test")
      .set("Authorization", "Bearer " + jwtToken)
      .then((response: { statusCode: number }) => {
        expect(response.statusCode).toBe(400);
      });
  });

  test("Requesting suggested users without providing username should fail", () => {
    return request(app)
      .get("/user/suggested?login=test")
      .set("Authorization", "Bearer " + jwtToken)
      .then((response: { statusCode: number }) => {
        expect(response.statusCode).toBe(400);
      });
  });

  test("Requesting a user with a valid id should return a user", async () => {
    const testUser: any = await UserService.findUser("2");
    return request(app)
      .get("/user/2")
      .set("Authorization", "Bearer " + jwtToken)
      .then((response: { statusCode: number; body: any }) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(testUser.id);
        expect(response.body.login).toBe(testUser.login);
        expect(response.body.password).toBe(testUser.password);
        expect(response.body.age).toBe(testUser.age);
        expect(response.body.is_deleted).toBe(testUser.is_deleted);
      });
  });

  test("Requesting a user with an non existing id", () => {
    return request(app)
      .get("/user/999999")
      .set("Authorization", "Bearer " + jwtToken)
      .then((response: { statusCode: number }) => {
        expect(response.statusCode).toBe(404);
      });
  });

  test("Updating a user with correct data should update the user", () => {
    return request(app)
      .put("/user/")
      .send({
        id: 2,
        login: "atestUser3",
        password: "myPassword3",
        age: "43",
      })
      .set("Authorization", "Bearer " + jwtToken)
      .then((response: { statusCode: number }) => {
        expect(response.statusCode).toBe(200);
      });
  });

  test("Creating the user with correct data should succeed", () => {
    return request(app)
      .post("/user/")
      .send({
        login: "atestUser99",
        password: "myPassword3",
        age: "37",
      })
      .set("Authorization", "Bearer " + jwtToken)
      .then((response: { statusCode: number }) => {
        expect(response.statusCode).toBe(201);
      });
  });

  test("Creating the user with incorrect data should fail", () => {
    return request(app)
      .post("/user/")
      .send({
        login: "atestUser99",
        password: "myPassword3",
      })
      .set("Authorization", "Bearer " + jwtToken)
      .then((response: { statusCode: number }) => {
        expect(response.statusCode).toBe(400);
      });
  });

  test("Deleting a user should succeed", () => {
    return request(app)
      .delete("/user/")
      .send({
        id: "99",
      })
      .set("Authorization", "Bearer " + jwtToken)
      .then((response: { statusCode: number }) => {
        expect(response.statusCode).toBe(200);
      });
  });

  test("Deleting a user without providing id should fail", () => {
    return request(app)
      .delete("/user/")
      .send({
        username: "testuser99",
      })
      .set("Authorization", "Bearer " + jwtToken)
      .then((response: { statusCode: number }) => {
        expect(response.statusCode).toBe(400);
      });
  });
});
