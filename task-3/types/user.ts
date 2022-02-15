import { Request } from "express";

interface UserInterface {
  id: string;
  login: string;
  password: string;
  age: number;
  is_deleted: boolean;
}
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
  UserInterface,
  UpdateUserArguments,
  CreateUserArguments,
  SuggestedUsersArguments,
  SuggestedUsersRequest,
};
