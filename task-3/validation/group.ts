import * as Joi from "joi";
import {
  ContainerTypes,
  // Extend from this to define a valid schema type/interface
  ValidatedRequestSchema,
  // Creates a validator that generates middlewares
  createValidator,
} from "express-joi-validation";

const validator = createValidator();
const id = Joi.number()
  .required()
  .messages({ "number.required": "Id is required." });
const name = Joi.string().required();
const permissions = Joi.array()
  .items(Joi.string().valid("READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"))
  .required()
  .messages({
    "array.items": "Permissions are invalid.",
    "array.required": "Permissions are required.",
  });

const putSchema = Joi.object().keys({
  id: id,
  name: name,
  permissions: permissions,
});

const postSchema = Joi.object().keys({
  name: name,
  permissions: permissions,
});

interface CreateGroupSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    id: number;
    name: string;
    permissions: string[];
  };
}

export { id, validator, postSchema, putSchema, CreateGroupSchema };
