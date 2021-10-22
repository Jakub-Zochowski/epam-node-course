import { User } from './user';

const findUser = (users: User[], id: string) => users.find(user => user.id === id);

const sortUsers = (users: User[]) => users.sort((a, b) => {
	const textA = a.login.toLowerCase();
	const textB = b.login.toLowerCase();
	return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
})

const filterUsers = (users: User[], loginSubstring: string) => users.filter(user => user.login.toLowerCase().includes(loginSubstring.toLowerCase()))

const getAutoSuggestUsers = (users: User[], loginSubstring: string, limit: number) => {
	const sortedUsers = sortUsers(users)
	const filteredUsers = filterUsers(sortedUsers, loginSubstring);
	return filteredUsers.slice(0, limit)
}

export { findUser, sortUsers, filterUsers, getAutoSuggestUsers }