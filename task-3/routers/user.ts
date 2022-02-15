import express, { Request } from "express";
import { ValidatedRequest } from "express-joi-validation";
import { StatusCodes } from "http-status-codes";

import { UserService } from "../services/user";
import { SuggestedUsersRequest } from "../types/user";
import {
  validator,
  postSchema,
  putSchema,
  CreateUserSchema,
} from "../validation/user";
import LoggingService from "../services/logging";

const logger = new LoggingService("GroupService");

const router = express.Router();

router.get(
  "/suggested",
  logger.routeLogger,
  async (req: SuggestedUsersRequest, res) => {
    const { login, limit } = req.query;
    if (!login || !limit) res.send(StatusCodes.BAD_REQUEST);
    try {
      const users = await UserService.getSuggestedUsers({ login, limit });
      res.send(users);
    } catch (err) {
      res.status(StatusCodes.NOT_FOUND);
    }
  }
);

router.get("/:id", logger.routeLogger, async (req, res) => {
  try {
    const user = await UserService.findUser(req.params.id);
    if (!user) res.status(StatusCodes.NOT_FOUND);
    res.send(user);
  } catch (err) {
    res.status(StatusCodes.NOT_FOUND);
  }
});

router.put(
  "/",
  validator.body(putSchema),
  logger.routeLogger,
  async (req: ValidatedRequest<CreateUserSchema>, res) => {
    const { id, login, password, age } = req.body;
    try {
      await UserService.updateUser({ id, login, password, age });
      res.sendStatus(StatusCodes.OK);
    } catch (err) {
      res.sendStatus(StatusCodes.BAD_REQUEST);
    }
  }
);

router.post(
  "/",
  validator.body(postSchema),
  logger.routeLogger,
  async (req: ValidatedRequest<CreateUserSchema>, res) => {
    const { login, password, age } = req.body;
    try {
      await UserService.createUser({ login, password, age });
      res.sendStatus(StatusCodes.CREATED);
    } catch (err) {
      res.sendStatus(StatusCodes.BAD_REQUEST);
    }
  }
);

router.delete("/", logger.routeLogger, async (req, res) => {
  const { id } = req.body;
  try {
    await UserService.deleteUser(id);
    res.sendStatus(StatusCodes.OK);
  } catch (err) {
    res.sendStatus(StatusCodes.BAD_REQUEST);
  }
});

export default router;
