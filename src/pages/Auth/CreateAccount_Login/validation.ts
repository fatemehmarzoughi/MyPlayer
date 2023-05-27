const Joi = require("react-native-joi-validation");

const emailSchema = Joi.object().keys({
  email: Joi.string().email()
});

const passwordSchema = Joi.object().keys({
  password: Joi.string().min(5).max(20)
});

export const validateEmail = (input: string) => {
  console.log("validate");
  let validation;

  Joi.validate({ email: input }, emailSchema, (err: any, val: any) => {
    if (err) {
      console.log("err = " + err);
      validation = false;
    } else {
      // email is valid
      validation = true;
    }
  });

  return validation;
}

export const validatePassword = (input: string) => {
  let validation;

  Joi.validate({ password: input }, passwordSchema, function (err: any, val: any) {
    if (err) {
      validation = false;
    } else {
      validation = true;
    }
  });
  return validation;
}