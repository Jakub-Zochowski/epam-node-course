import express from "express";
import { StatusCodes } from "http-status-codes";
import { AuthService } from "../services/authentication";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
		const { username, password } = req.body;
		const token = AuthService.generateAccessToken({ username: username, password: password });
  	res.json(token);
  } catch (err) {
		res.send(StatusCodes.BAD_REQUEST);
  }
});


export default router;
