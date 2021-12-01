import * as Joi from "joi";
import {
  // Creates a validator that generates middlewares
  createValidator,
} from "express-joi-validation";

import { id as group_id } from "./group";
import { id as user_id } from "./user";

const validator = createValidator();

const postUserGroupSchema = Joi.object().keys({
  user_id: group_id,
  group_id: user_id,
});

export { validator, postUserGroupSchema };
