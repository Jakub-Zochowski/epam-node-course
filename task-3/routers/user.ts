import express, { Request } from "express";
import { ValidatedRequest } from "express-joi-validation";

import { UserService } from "../services/user";
import {
  validator,
  postSchema,
  putSchema,
  CreateUserSchema,
} from "../validation";

const router = express.Router();

router.get(
  "/suggested",
  async (
    req: Request<unknown, unknown, unknown, { login: string; limit: number }>,
    res
  ) => {
    const { login, limit } = req.query;
		try {
			const users = UserService.getSuggestedUsers(login, limit);
			res.send(users)
		} catch (err) {
			res.status(404)
		}
  }
);

router.get("/:id", async (req, res) => {
	try {
		const user = await UserService.findAllUsers(req.params.id)
		res.send(user)
	} catch (err) {
		res.status(404)
	}
});

router.put(
  "/",
  validator.body(putSchema),
  async (req: ValidatedRequest<CreateUserSchema>, res) => {
    const { id, login, password, age } = req.body;
		try {
			await UserService.updateUser(id, login, password, age);
			res.sendStatus(200);
		} catch (err) {
			res.sendStatus(400);
		}
  }
);

router.post(
  "/",
  validator.body(postSchema),
  async (req: ValidatedRequest<CreateUserSchema>, res) => {
    const { login, password, age } = req.body;
		try {
			await UserService.createUser(login, password, age);
			res.sendStatus(200);
		} catch (err) {
			res.sendStatus(400);
		}
  }
);

router.delete("/", async (req, res) => {
  const { id } = req.body;
	try {
		await UserService.deleteUser(id);
		res.sendStatus(200);
	} catch (err) {
		res.sendStatus(400);
	}
});

export default router;
