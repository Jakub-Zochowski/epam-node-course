import dotenv from "dotenv";
dotenv.config();

import request from "supertest";
import app from "../app";

import { AuthService } from "../services/authentication";
import { GroupService } from "../services/group";

const jwtToken = AuthService.generateAccessToken({
  username: "newUser123",
  password: "somePassword",
});

describe("Test Group Path", () => {
  test("Requesting all groups should return all groups", async () => {
    const allGroups: any[] = await GroupService.getAllGroups();
		const data = await request(app)
		.get("/group/all")
		.set("Authorization", "Bearer " + jwtToken);

    expect(data.statusCode).toBe(200);
		expect(Array.isArray(data.body)).toBeTruthy();
		expect(data.body.length).toEqual(allGroups.length);
		expect(data.body[0].id).toBe(allGroups[0].id);
		expect(data.body[0].name).toBe(allGroups[0].name);
		expect(data.body[0].permissions).toStrictEqual(allGroups[0].permissions);
  });

  test("Requesting specific group", async () => {
    const group: any = await GroupService.findGroup("1");
		const data = await request(app)
		.get("/group/1")
		.set("Authorization", "Bearer " + jwtToken);

		expect(data.statusCode).toBe(200);
		expect(data.body).toBeTruthy();
		expect(data.body.id).toBe(group.id);
		expect(data.body.name).toBe(group.name);
		expect(data.body.permissions).toStrictEqual(group.permissions);
  });

	test.each([
		{
			group: {
			id: "1",
			name: "testGroup99",
			permissions: ["READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"],
		}, expected: 200
		},
		{
			group: {
				id: "1",
				name: "testGroup99",
				permissions: ["READ1", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"],
			},
			expected: 400
		},
	])('Updating specific group', async ({group, expected}) => {
		const data = await request(app)
		.put("/group/")
		.send(group)
		.set("Authorization", "Bearer " + jwtToken);

		expect(data.statusCode).toBe(expected);
	});

	test.each([
		{
			group: {
				name: "testGroup99",
				permissions: ["READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"],
			}, 
			expected: 201
		},
		{
			group: {
				name: "testGroup99",
				permissions: ["READ1", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"],
			},
			expected: 400
		},
	])('Creating new group', async ({group, expected}) => {
		const data = await request(app)
		.post("/group/")
		.send(group)
		.set("Authorization", "Bearer " + jwtToken);

		expect(data.statusCode).toBe(expected);
	});

	test.each([
		{
			group: {
				id: "2",
			}, 
			expected: 200
		},
		{
			group: {
				name: "group99",
			},
			expected: 400
		},
	])('Deleting a group', async ({group, expected}) => {
		const data = await request(app)
		.delete("/group/")
		.send(group)
		.set("Authorization", "Bearer " + jwtToken);

		expect(data.statusCode).toBe(expected);
	});

	test.each([
		{
			group: {
				user_id: "7",
				group_id: "8",
			}, 
			expected: 201
		},
		{
			group: {
				user_id: "7",
				group_name: "8",
			},
			expected: 400
		},
	])('Adding a user to a group', async ({group, expected}) => {
		const data = await request(app)
		.post("/group/add")
		.send(group)
		.set("Authorization", "Bearer " + jwtToken);

		expect(data.statusCode).toBe(expected);
	});
});
