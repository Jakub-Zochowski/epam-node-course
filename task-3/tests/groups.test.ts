import dotenv from "dotenv";
dotenv.config();

import { StatusCodes } from "http-status-codes";

import request from "supertest";
import app from "../app";

import { AuthService } from "../services/authentication";
import { GroupService } from "../services/group";

const jwtToken = AuthService.generateAccessToken({
  username: "newUser123",
  password: "somePassword",
});

	// GROUP ID
	const VALID_GROUP_ID = '29';

	// GROUP NAME
	const GROUP_NAME = 'testGroup99';

	// GROUP PERMISSIONS
	const VALID_GROUP_PERMISSIONS = ["READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"];
	const INVALID_GROUP_PERMISSIONS = ["READ1", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"];

	// USER ID
	const USER_ID = '94';


describe("Test Group Path", () => {
  test("Requesting all groups should return all groups", async () => {
    const allGroups: any[] = await GroupService.getAllGroups();
    const data = await request(app)
      .get("/group/all")
      .set("Authorization", "Bearer " + jwtToken);

    expect(data.statusCode).toBe(StatusCodes.OK);
    expect(Array.isArray(data.body)).toBeTruthy();
    expect(data.body.length).toEqual(allGroups.length);
    expect(data.body[0].id).toBe(allGroups[0].id);
    expect(data.body[0].name).toBe(allGroups[0].name);
    expect(data.body[0].permissions).toStrictEqual(allGroups[0].permissions);
  });

  test("Requesting specific group", async () => {
    const group: any = await GroupService.findGroup(VALID_GROUP_ID);
    const data = await request(app)
      .get("/group/29")
      .set("Authorization", "Bearer " + jwtToken);

    expect(data.statusCode).toBe(StatusCodes.OK);
    expect(data.body).toBeTruthy();
    expect(data.body.id).toBe(group.id);
    expect(data.body.name).toBe(group.name);
    expect(data.body.permissions).toStrictEqual(group.permissions);
  });

  test.each([
    {
      group: {
        id: VALID_GROUP_ID,
        name: GROUP_NAME,
        permissions: VALID_GROUP_PERMISSIONS,
      },
      expected: StatusCodes.OK,
    },
    {
      group: {
        id: VALID_GROUP_ID,
        name: GROUP_NAME,
        permissions: INVALID_GROUP_PERMISSIONS,
      },
      expected: StatusCodes.BAD_REQUEST,
    },
  ])("Updating specific group", async ({ group, expected }) => {
    const data = await request(app)
      .put("/group/")
      .send(group)
      .set("Authorization", "Bearer " + jwtToken);

    expect(data.statusCode).toBe(expected);
  });

  test.each([
    {
      group: {
        name: GROUP_NAME,
        permissions: VALID_GROUP_PERMISSIONS,
      },
      expected: StatusCodes.CREATED,
    },
    {
      group: {
        name: GROUP_NAME,
        permissions: INVALID_GROUP_PERMISSIONS,
      },
      expected: StatusCodes.BAD_REQUEST,
    },
  ])("Creating new group", async ({ group, expected }) => {
    const data = await request(app)
      .post("/group/")
      .send(group)
      .set("Authorization", "Bearer " + jwtToken);

    expect(data.statusCode).toBe(expected);
  });

  test.each([
    {
      group: {
        id: VALID_GROUP_ID,
      },
      expected: StatusCodes.OK,
    },
    {
      group: {
        name: GROUP_NAME,
      },
      expected: StatusCodes.BAD_REQUEST,
    },
  ])("Deleting a group", async ({ group, expected }) => {
    const data = await request(app)
      .delete("/group/")
      .send(group)
      .set("Authorization", "Bearer " + jwtToken);

    expect(data.statusCode).toBe(expected);
  });

  test.each([
    {
      group: {
        user_id: USER_ID,
        group_name: VALID_GROUP_ID,
      },
      expected: StatusCodes.BAD_REQUEST,
    },
  ])("Adding a user to a group", async ({ group, expected }) => {
    const data = await request(app)
      .post("/group/add")
      .send(group)
      .set("Authorization", "Bearer " + jwtToken);

    expect(data.statusCode).toBe(expected);
  });
});
