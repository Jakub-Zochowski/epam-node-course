import express, { Request } from "express";
import { ValidatedRequest } from "express-joi-validation";
import { v4 as uuidv4 } from "uuid";

import { User } from "./user";
import { findUser, getAutoSuggestUsers } from "./utils";
import {
  validator,
  postSchema,
  putSchema,
  CreateUserSchema,
} from "./validation";

const router = express.Router();

const users: User[] = [];

users.push(new User(uuidv4(), "someUser", "password4", 11, false));

router.get(
  "/suggested",
  (
    req: Request<unknown, unknown, unknown, { login: string; limit: number }>,
    res
  ) => {
    const { login, limit } = req.query;
    const suggestedUsers = getAutoSuggestUsers(users, login, limit);
    res.json(suggestedUsers);
  }
);

router.get("/:id", (req, res) => {
  const user = findUser(users, req.params.id);
  res.json(user);
});

router.put(
  "/",
  validator.body(putSchema),
  (req: ValidatedRequest<CreateUserSchema>, res) => {
    const { id, login, password, age } = req.body;
    let user = findUser(users, id);
    if (user) {
      const userIndex = users.indexOf(user);
      user = {
        ...user,
        login: login,
        password: password,
        age: age,
      };
      users[userIndex] = user;
      res.json(user);
    } else {
      res.status(400);
      res.send("Update failed");
    }
  }
);

router.post(
  "/",
  validator.body(postSchema),
  (req: ValidatedRequest<CreateUserSchema>, res) => {
    const { login, password, age } = req.body;
    const newUser = new User(uuidv4(), login, password, age, false);
    users.push(newUser);
    res.json(newUser);
  }
);

router.delete("/", (req, res) => {
  const { id } = req.body;
  const user = findUser(users, id);
  if (!user) {
    res.status(404);
    res.send("User not found");
    return;
  }

  const userIndex = users.indexOf(user);
  user.isDeleted = true;
  users[userIndex] = user;
  res.send("Succesfully deleted");
});

export default router;
