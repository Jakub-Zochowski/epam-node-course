import express from "express";
import { ValidatedRequest } from "express-joi-validation";
import { StatusCodes } from "http-status-codes";

import { GroupService } from "../services/group";
import {
  validator,
  postSchema,
  putSchema,
  CreateGroupSchema,
} from "../validation/group";
import { postUserGroupSchema } from "../validation/userGroup";
import LoggingService from "../services/logging";

const logger = new LoggingService("GroupRouter");

const router = express.Router();

router.get("/all", logger.routeLogger, async (req, res) => {
  try {
    const groups = await GroupService.getAllGroups();
    res.send(groups);
  } catch (err) {
    res.status(StatusCodes.NOT_FOUND);
  }
});

router.get("/:id", logger.routeLogger, async (req, res) => {
  try {
    const group = await GroupService.findGroup(req.params.id);
    res.send(group);
  } catch (err) {
    res.status(StatusCodes.NOT_FOUND);
  }
});

router.put(
  "/",
  validator.body(putSchema),
  logger.routeLogger,
  async (req: ValidatedRequest<CreateGroupSchema>, res) => {
    const { id, name, permissions } = req.body;
    try {
      await GroupService.updateGroup({ id, name, permissions });
      res.sendStatus(StatusCodes.OK);
    } catch (err) {
      res.sendStatus(StatusCodes.BAD_REQUEST);
    }
  }
);

router.post(
  "/add",
  validator.body(postUserGroupSchema),
  logger.routeLogger,
  async (req: ValidatedRequest<any>, res) => {
    const { user_id, group_id } = req.body;
    try {
      await GroupService.addUsersToGroup({ user_id, group_id });
      res.sendStatus(StatusCodes.CREATED);
    } catch (err) {
      console.log(err);
      res.sendStatus(StatusCodes.BAD_REQUEST);
    }
  }
);

router.post(
  "/",
  validator.body(postSchema),
  logger.routeLogger,
  async (req: ValidatedRequest<any>, res) => {
    const { name, permissions } = req.body;
    try {
      await GroupService.createGroup({ name, permissions });
      res.sendStatus(StatusCodes.CREATED);
    } catch (err) {
      res.sendStatus(StatusCodes.BAD_REQUEST);
    }
  }
);

router.delete("/", logger.routeLogger, async (req, res) => {
  const { id } = req.body;
  try {
    await GroupService.deleteGroup(id);
    res.sendStatus(StatusCodes.OK);
  } catch (err) {
    res.sendStatus(StatusCodes.BAD_REQUEST);
  }
});

export default router;
