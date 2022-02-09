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
    return request(app)
      .get("/group/all")
      .set("Authorization", "Bearer " + jwtToken)
      .then((response: { statusCode: number; body: any }) => {
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toEqual(allGroups.length);
        expect(response.body[0].id).toBe(allGroups[0].id);
        expect(response.body[0].name).toBe(allGroups[0].name);
        expect(response.body[0].permissions).toStrictEqual(
          allGroups[0].permissions
        );
      });
  });

  test("Requesting specific group", async () => {
    const group: any = await GroupService.findGroup("1");
    return request(app)
      .get("/group/1")
      .set("Authorization", "Bearer " + jwtToken)
      .then((response: { statusCode: number; body: any }) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeTruthy();
        expect(response.body.id).toBe(group.id);
        expect(response.body.name).toBe(group.name);
        expect(response.body.permissions).toStrictEqual(group.permissions);
      });
  });

  test("Updating specific group", async () => {
    return request(app)
      .put("/group/")
      .send({
        id: "1",
        name: "testGroup99",
        permissions: ["READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"],
      })
      .set("Authorization", "Bearer " + jwtToken)
      .then((response: { statusCode: number; body: any }) => {
        expect(response.statusCode).toBe(200);
      });
  });

  test("Updating specific group with an invalid body", async () => {
    return request(app)
      .put("/group/")
      .send({
        id: "1",
        name: "testGroup99",
        permissions: ["READ1", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"],
      })
      .set("Authorization", "Bearer " + jwtToken)
      .then((response: { statusCode: number; body: any }) => {
        expect(response.statusCode).toBe(400);
      });
  });

  test("Creating a new group", async () => {
    return request(app)
      .post("/group/")
      .send({
        name: "testGroup99",
        permissions: ["READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"],
      })
      .set("Authorization", "Bearer " + jwtToken)
      .then((response: { statusCode: number; body: any }) => {
        expect(response.statusCode).toBe(201);
      });
  });

  test("Creating a new group with invalid body", async () => {
    return request(app)
      .post("/group/")
      .send({
        name: "testGroup99",
        permissions: ["READ1", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"],
      })
      .set("Authorization", "Bearer " + jwtToken)
      .then((response: { statusCode: number; body: any }) => {
        expect(response.statusCode).toBe(400);
      });
  });

  test("Deleting a group", async () => {
    return request(app)
      .delete("/group/")
      .send({
        id: "2",
      })
      .set("Authorization", "Bearer " + jwtToken)
      .then((response: { statusCode: number; body: any }) => {
        expect(response.statusCode).toBe(200);
      });
  });

  test("Deleting a group with an invalid body", async () => {
    return request(app)
      .delete("/group/")
      .send({
        name: "group99",
      })
      .set("Authorization", "Bearer " + jwtToken)
      .then((response: { statusCode: number; body: any }) => {
        expect(response.statusCode).toBe(400);
      });
  });

  test("Adding a user to a group", async () => {
    return request(app)
      .post("/group/add")
      .send({
        user_id: "7",
        group_id: "8",
      })
      .set("Authorization", "Bearer " + jwtToken)
      .then((response: { statusCode: number; body: any }) => {
        expect(response.statusCode).toBe(201);
      });
  });

  test("Adding a user to a group with an invalid body", async () => {
    return request(app)
      .post("/group/add")
      .send({
        user_id: "7",
        group_name: "8",
      })
      .set("Authorization", "Bearer " + jwtToken)
      .then((response: { statusCode: number; body: any }) => {
        expect(response.statusCode).toBe(400);
      });
  });
});
