const Joi = require('joi');
const { regexENUM, statusCodeENUM } = require('../constants');
const { CustomErrorHandler } = require('../errors');

const nameValidator = Joi.string().alphanum().min(2).max(35)
  .trim();
const emailValidator = Joi.string()
  .regex(regexENUM.EMAIL)
  .lowercase()
  .trim()
  .error(
    new CustomErrorHandler('Email is`t valid', statusCodeENUM.BAD_REQUEST),
  );
const passwordValidator = Joi.string()
  .regex(regexENUM.PASSWORD)
  .error(
    new CustomErrorHandler('Password is`t valid', statusCodeENUM.BAD_REQUEST),
  );

const newUserValidator = Joi.object({
  username: nameValidator.required(),
  email: emailValidator.required(),
  password: passwordValidator.required(),
});

const updateUserValidation = Joi.object({
  username: nameValidator,
  email: emailValidator,
  password: passwordValidator,
});

const loginUserValidator = Joi.object({
  email: emailValidator
    .required()
    .error(
      new CustomErrorHandler(
        'Email or password not valid',
        statusCodeENUM.BAD_REQUEST,
      ),
    ),
  password: passwordValidator
    .required()
    .error(
      new CustomErrorHandler(
        'Email or password not valid',
        statusCodeENUM.BAD_REQUEST,
      ),
    ),
});

const userEmailValidator = Joi.object({
  email: emailValidator
    .required()
    .error(
      new CustomErrorHandler('Email not valid', statusCodeENUM.BAD_REQUEST),
    ),
});

const userPasswordValidator = Joi.object({
  password: passwordValidator
    .required()
    .error(
      new CustomErrorHandler('Password not valid', statusCodeENUM.BAD_REQUEST),
    ),
});

module.exports = {
  passwordValidator,
  updateUserValidation,
  loginUserValidator,
  userEmailValidator,
  userPasswordValidator,
  newUserValidator
};
