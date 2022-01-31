import { Op } from "sequelize";

import { User } from "../models/User";
import {
  UpdateUserArguments,
  CreateUserArguments,
  SuggestedUsersArguments,
} from "../types/user";
import LoggingService from "./logging";

const logger = new LoggingService("UserService");

class UserService {
  static async findUser(id: string) {
    logger.serviceLogger("findUser", arguments[0]);
    const user = await User.findOne({
      where: {
        id: id,
      },
    });
    return user;
  }

  static async updateUser({ id, login, password, age }: UpdateUserArguments) {
    logger.serviceLogger("updateUser", arguments[0]);
    const user = { login: login, password: password, age: age };
    await User.update(user, {
      where: {
        id: id,
      },
    });
  }

  static async createUser({ login, password, age }: CreateUserArguments) {
    logger.serviceLogger("createUser", arguments[0]);
    const user = {
      login: login,
      password: password,
      age: age,
    };
    await User.create(user);
  }

  static async deleteUser(id: number) {
    logger.serviceLogger("deleteUser", arguments[0]);
    await User.destroy({
      where: {
        id: id,
      },
    });
  }

  static async getSuggestedUsers({ login, limit }: SuggestedUsersArguments) {
    logger.serviceLogger("getSuggestedUsers", arguments[0]);
    const users = await User.findAll({
      limit: limit,
      where: {
        login: { [Op.iLike]: `%${login}%` },
        is_deleted: { [Op.not]: true },
      },
      order: [["login", "ASC"]],
    });
    return users;
  }
}

export { UserService };
