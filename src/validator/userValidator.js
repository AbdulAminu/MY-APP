import Joi from "joi";

export const signUpValidation = Joi.object({
    username: Joi.string().min(3).max(19).required(),
    email: Joi.string().email().required(),
    password:Joi.string()
    .max(15)
    .required()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{6,}$/)
    .messages({
      "string.pattern.base":
        "⚠️ Password must contain uppercase, lowercase, number and special character",
      "string.empty": "Password is required",
      "any.required": "Password is required",
      "string.max": " ⚠️ Password must not exceed 15 characters",
    }),
})

// login validation

export const loginValidation = Joi.object({
    email: Joi.string().email().required(),
    password:Joi.string()
    .max(15)
    .required()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{6,}$/)
    .messages({
      "string.pattern.base":
        " ⚠️ Password must contain uppercase, lowercase, number and special character",
      "string.empty": "Password is required",
      "any.required": "Password is required",
      "string.max": " ⚠️Password must not exceed 15 characters",
    }),
})