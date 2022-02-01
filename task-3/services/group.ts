import { Group } from "../models/Group";
import { UserGroup } from "../models/UserGroup";
import { UpdateGroupArguments, CreateGroupArguments } from "../types/group";
import { AddUsersToGroupArguments } from "../types/userGroup";
import LoggingService from "./logging";

const logger = new LoggingService("GroupService");
class GroupService {
  static async findGroup(id: string) {
    logger.serviceLogger("findGroup", arguments[0]);
    const group = await Group.findOne({
      where: {
        id: id,
      },
    });
    return group;
  }

  static async getAllGroups() {
    logger.serviceLogger("getAllGroups", arguments[0]);
    const groups = await Group.findAll();
    return groups;
  }

  static async updateGroup({ id, name, permissions }: UpdateGroupArguments) {
    logger.serviceLogger("updateGroup", arguments[0]);
    const group = { name: name, permissions: permissions };
    await Group.update(group, {
      where: {
        id: id,
      },
    });
  }

  static async createGroup({ name, permissions }: CreateGroupArguments) {
    logger.serviceLogger("createGroup", arguments[0]);
    const group = {
      name: name,
      permissions: permissions,
    };
    await Group.create(group);
  }

  static async deleteGroup(id: number) {
    logger.serviceLogger("deleteGroup", arguments[0]);
    await Group.destroy({
      where: {
        id: id,
      },
    });
  }

  static async addUsersToGroup({
    user_id,
    group_id,
  }: AddUsersToGroupArguments) {
    logger.serviceLogger("addUsersToGroup", arguments[0]);
    const userGroup = {
      user_id: user_id,
      group_id: group_id,
    };
    await UserGroup.create(userGroup);
  }
}

export { GroupService };
