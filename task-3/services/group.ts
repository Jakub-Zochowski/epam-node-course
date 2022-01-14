import { Group } from "../models/Group";
import { UserGroup } from "../models/UserGroup";
import { UpdateGroupArguments, CreateGroupArguments } from "../types/group";
import { AddUsersToGroupArguments } from "../types/userGroup";
import LoggingService from './logging';


class GroupService {
  static async findGroup(id: string) {
		LoggingService.logger('findGroup', arguments[0]);
    const group = await Group.findOne({
      where: {
        id: id,
      },
    });
    return group;
  }

  static async getAllGroups() {
		LoggingService.logger('getAllGroups', arguments[0]);
    const groups = await Group.findAll();
    return groups;
  }

  static async updateGroup({ id, name, permissions }: UpdateGroupArguments) {
		LoggingService.logger('updateGroup', arguments[0]);
    const group = { name: name, permissions: permissions };
    await Group.update(group, {
      where: {
        id: id,
      },
    });
  }

  static async createGroup({ name, permissions }: CreateGroupArguments) {
		LoggingService.logger('createGroup', arguments[0]);
    const group = {
      name: name,
      permissions: permissions,
    };
    await Group.create(group);
  }

  static async deleteGroup(id: number) {
		LoggingService.logger('deleteGroup', arguments[0]);
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
		LoggingService.logger('addUsersToGroup', arguments[0]);
    const userGroup = {
      user_id: user_id,
      group_id: group_id,
    };
    await UserGroup.create(userGroup);
  }
}

export { GroupService };
