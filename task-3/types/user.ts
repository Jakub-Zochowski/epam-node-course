import { Request } from "express";

interface UpdateUserArguments {
  id: string;
  login: string;
  password: string;
  age: number;
}

interface CreateUserArguments {
  login: string;
  password: string;
  age: number;
}

interface SuggestedUsersArguments {
  login: string;
  limit: number;
}

type SuggestedUsersRequest = Request<
  unknown,
  unknown,
  unknown,
  { login: string; limit: number }
>;

export {
  UpdateUserArguments,
  CreateUserArguments,
  SuggestedUsersArguments,
  SuggestedUsersRequest,
};
