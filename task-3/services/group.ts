import { Group } from "../models/Group";
import { UserGroup } from "../models/UserGroup";
import { UpdateGroupArguments, CreateGroupArguments } from "../types/group";
import { AddUsersToGroupArguments } from "../types/userGroup";

class GroupService {
  static async findGroup(id: string) {
    const group = await Group.findOne({
      where: {
        id: id,
      },
    });
    return group;
  }

  static async getAllGroups() {
    const groups = await Group.findAll();
    return groups;
  }

  static async updateGroup({ id, name, permissions }: UpdateGroupArguments) {
    const group = { name: name, permissions: permissions };
    await Group.update(group, {
      where: {
        id: id,
      },
    });
  }

  static async createGroup({ name, permissions }: CreateGroupArguments) {
    const group = {
      name: name,
      permissions: permissions,
    };
    await Group.create(group);
  }

  static async deleteGroup(id: number) {
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
    const userGroup = {
      user_id: user_id,
      group_id: group_id,
    };
    await UserGroup.create(userGroup);
  }
}

export { GroupService };
