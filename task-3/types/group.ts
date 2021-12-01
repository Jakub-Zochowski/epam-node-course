interface UpdateGroupArguments {
  id: number;
  name: string;
  permissions: string[];
}

interface CreateGroupArguments {
  name: string;
  permissions: string[];
}

export { UpdateGroupArguments, CreateGroupArguments };
