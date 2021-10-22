import * as Joi from 'joi';
import {
  ContainerTypes,
  // Extend from this to define a valid schema type/interface
  ValidatedRequestSchema,
  // Creates a validator that generates middlewares
  createValidator
} from 'express-joi-validation';

const validator = createValidator();
const id = Joi.string().required().messages({'string.required': 'Id is required.'});
const login = Joi.string().required();
const password = Joi.string()
.regex(/[a-zA-Z][0-9]/)
.required()
.messages({
	'string.pattern.base': 'Password must include letters and numbers.',
	'string.required': 'Password is required.'
});
const age = Joi.number()
.min(4)
.max(130)
.required()
.messages({
	'number.min': 'Age must be greater than 4.',
	'number.max': 'Age must be lower than 130.',
	'number.required': 'Age is required.'
})


const putSchema = Joi.object().keys({
	id: id,
	login: login,
	password: password,
	age: age,
})

const postSchema = Joi.object().keys({
	login: login,
	password: password,
	age: age,
})

interface CreateUserSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
		id: string;
    login: string,
		password: string,
		age: number
  }
}

export { validator, postSchema, putSchema, CreateUserSchema }