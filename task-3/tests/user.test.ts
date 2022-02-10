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
  test.each([
    {
      path: "/user/suggested?login=test",
      expected: 400,
    },
    {
      path: "/user/suggested?limit=3",
      expected: 400,
    },
    {
      path: "/user/suggested?limit=3&login=test",
      expected: 200,
    },
  ])("Requesting suggested user", async ({ path, expected }) => {
    const suggestedUsers: any[] = await UserService.getSuggestedUsers({
      login: "test",
      limit: 3,
    });
    const data = await request(app)
      .get(path)
      .set("Authorization", "Bearer " + jwtToken);

    if (expected === 200) {
      expect(Array.isArray(data.body)).toBeTruthy();
      expect(data.body[0].id).toBe(suggestedUsers[0].id);
      expect(data.body[0].login).toBe(suggestedUsers[0].login);
      expect(data.body[0].password).toBe(suggestedUsers[0].password);
      expect(data.body[0].age).toBe(suggestedUsers[0].age);
      expect(data.body[0].is_deleted).toBe(suggestedUsers[0].is_deleted);
    }

    expect(data.statusCode).toBe(expected);
  });

  test.each([
    {
      id: "2",
      expected: 200,
    },
    {
      id: "999999",
      expected: 404,
    },
  ])("Requesting a user", async ({ id, expected }) => {
    const testUser: any = await UserService.findUser(id);
    const data = await request(app)
      .get(`/user/${id}`)
      .set("Authorization", "Bearer " + jwtToken);

    if (expected === 200) {
      expect(data.body.id).toBe(testUser.id);
      expect(data.body.login).toBe(testUser.login);
      expect(data.body.password).toBe(testUser.password);
      expect(data.body.age).toBe(testUser.age);
      expect(data.body.is_deleted).toBe(testUser.is_deleted);
    }

    expect(data.statusCode).toBe(expected);
  });

  test.each([
    {
      user: {
        id: 2,
        login: "atestUser3",
        password: "myPassword3",
        age: "43",
      },
      expected: 200,
    },
    {
      user: {
        login: "atestUser99",
        password: "myPassword3",
        age: "37",
      },
      expected: 400,
    },
  ])("Updating a user", async ({ user, expected }) => {
    const data = await request(app)
      .put("/user/")
      .send(user)
      .set("Authorization", "Bearer " + jwtToken);

    expect(data.statusCode).toBe(expected);
  });

  test.each([
    {
      user: {
        login: "atestUser99",
        password: "myPassword3",
        age: "37",
      },
      expected: 201,
    },
    {
      user: {
        login: "atestUser99",
        password: "myPassword3",
      },
      expected: 400,
    },
  ])("Creating a user", async ({ user, expected }) => {
    const data = await request(app)
      .post("/user/")
      .send(user)
      .set("Authorization", "Bearer " + jwtToken);

    expect(data.statusCode).toBe(expected);
  });

  test.each([
    {
      user: {
        id: "99",
      },
      expected: 200,
    },
    {
      user: {
        username: "testuser99",
      },
      expected: 400,
    },
  ])("Deleting a user", async ({ user, expected }) => {
    const data = await request(app)
      .delete("/user/")
      .send(user)
      .set("Authorization", "Bearer " + jwtToken);

    expect(data.statusCode).toBe(expected);
  });
});
