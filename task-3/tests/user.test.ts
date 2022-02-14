import dotenv from "dotenv";
dotenv.config();

import { StatusCodes } from "http-status-codes";

import request from "supertest";
import app from "../app";

import { AuthService } from "../services/authentication";
import { UserService } from "../services/user";

const jwtToken = AuthService.generateAccessToken({
  username: "newUser123",
  password: "somePassword",
});

// USER ID
const VALID_USER_ID = '2';
const INVALID_USER_ID = '99';

//USER LOGIN
const USER_LOGIN = 'atestUser3';

//USER PASSWORD
const USER_PASSWORD = 'myPassword3';

//USET AGE
const USER_AGE = '39'

describe("Test User Path", () => {
  test.each([
    {
      path: "/user/suggested?login=test",
      expected: StatusCodes.BAD_REQUEST,
    },
    {
      path: "/user/suggested?limit=3",
      expected: StatusCodes.BAD_REQUEST,
    },
    {
      path: "/user/suggested?limit=3&login=test",
      expected: StatusCodes.OK,
    },
  ])("Requesting suggested user", async ({ path, expected }) => {
    const suggestedUsers: any[] = await UserService.getSuggestedUsers({
      login: "test",
      limit: 3,
    });
    const data = await request(app)
      .get(path)
      .set("Authorization", "Bearer " + jwtToken);

    if (expected === StatusCodes.OK) {
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
      id: VALID_USER_ID,
      expected: StatusCodes.OK,
    },
    {
      id: INVALID_USER_ID,
      expected: StatusCodes.NOT_FOUND,
    },
  ])("Requesting a user", async ({ id, expected }) => {
    const testUser: any = await UserService.findUser(id);
    const data = await request(app)
      .get(`/user/${id}`)
      .set("Authorization", "Bearer " + jwtToken);

    if (expected === StatusCodes.OK) {
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
        id: VALID_USER_ID,
        login: USER_LOGIN,
        password: USER_PASSWORD,
        age: USER_AGE,
      },
      expected: StatusCodes.OK,
    },
    {
      user: {
        id: VALID_USER_ID,
        login: USER_LOGIN,
        password: USER_PASSWORD,
      },
      expected: StatusCodes.BAD_REQUEST,
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
        login: USER_LOGIN,
        password: USER_PASSWORD,
        age: USER_AGE,
      },
      expected: StatusCodes.CREATED,
    },
    {
      user: {
        login: USER_LOGIN,
        password: USER_PASSWORD,
      },
      expected: StatusCodes.BAD_REQUEST,
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
        id: INVALID_USER_ID,
      },
      expected: StatusCodes.OK,
    },
    {
      user: {
        username: USER_LOGIN,
      },
      expected: StatusCodes.BAD_REQUEST,
    },
  ])("Deleting a user", async ({ user, expected }) => {
    const data = await request(app)
      .delete("/user/")
      .send(user)
      .set("Authorization", "Bearer " + jwtToken);

    expect(data.statusCode).toBe(expected);
  });
});
