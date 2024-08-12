const Joi = require('joi');

const PASSWORD_REGEX = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\\-=[\\]{};':\"\\|,.<>/?]).{8,}$"
);

const authSignup = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
        .pattern(PASSWORD_REGEX)
        .required()
        .messages({
        "string.pattern.base": `Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.`,
    }),
});

module.exports = { authSignup };

