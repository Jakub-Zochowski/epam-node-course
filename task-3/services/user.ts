import { Op } from 'sequelize';

import { User } from "../models/User";

class UserService {
	static async findAllUsers(id: string) {
		const user = await User.findOne({
			where: {
				id: id
			} 
		});
		return user;
	};

	static async updateUser(id: string, login: string, password: string, age: number) {
		await User.update({ login: login,
			password: password,
			age: age }, {
			where: {
				id: id
			}
		});
	};

	static async createUser(login: string, password: string, age: number) {
		await User.create({
			login: login,
			password: password,
			age: age
		});
	};

	static async deleteUser(id: string) {
		await User.update({ is_deleted: true }, {
			where: {
				id: id
			}
		});
	};

	static async getSuggestedUsers(login: string, limit: number) {
		const users = await User.findAll({
			limit: limit,
			where: {
				login: {[Op.iLike]: `%${login}%`},
				is_deleted: {[Op.not]: true}
			},
			order: [
				['login', 'ASC']
			]
		});
		return users
	};

}

export { UserService }