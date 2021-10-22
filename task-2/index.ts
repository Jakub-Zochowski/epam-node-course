
import express, { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { ValidatedRequest } from 'express-joi-validation';

import { User } from './user';
import { findUser, getAutoSuggestUsers } from './utils';
import { validator, postSchema, putSchema, CreateUserSchema } from './validation';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({
	extended: false
}));

let users: User[] = [];

users.push(new User(uuidv4(), 'someUser', 'password4', 11, false));

app.get('/user/suggested', (req: Request<unknown, unknown, unknown,  {login: string, limit: number }>, res) => {
	const { login, limit } = req.query;
	const suggestedUsers = getAutoSuggestUsers(users, login, limit);
	res.json(suggestedUsers);
})

app.get('/user/:id', (req, res) => {
	const user = findUser(users, req.params.id);
	res.json(user);
});

app.put('/user', validator.body(putSchema), (req: ValidatedRequest<CreateUserSchema>, res) => {
	const { id, login, password, age } = req.body;
	let user = findUser(users, id);
	if (user) {
		const userIndex = users.indexOf(user)
		user = {
			...user,
			login: login,
			password: password,
			age: age
		}
		users[userIndex] = user;
		res.json(user);
	} else {
		res.status(400);
		res.send('Update failed');
	}
});

app.post('/user', validator.body(postSchema), (req: ValidatedRequest<CreateUserSchema>, res) => {
	const { login, password, age } = req.body;
	const newUser = new User(uuidv4(), login, password, age, false);
	users.push(newUser);
	res.json(newUser);
});

app.delete('/user', (req, res) => {
	const { id } = req.body;
	const user = findUser(users, id);
	if (user) {
		const userIndex = users.indexOf(user);
		user.isDeleted = true;
		users[userIndex] = user;
		res.send('Succesfully deleted');
	} else {
		res.status(404);
		res.send('User not found');
	}
});


app.listen(PORT, () => console.log(`The app is listening to ${PORT}`));