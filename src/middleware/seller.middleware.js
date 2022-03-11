const Joi = require('joi');
exports.signUpSellerValidation = (req, res, next) => {
    const validateUser = (user) => {
      const JoiSchema = Joi.object({
        name: Joi.string(),
        lastName: Joi.string(),
        email: Joi.string(),
        phone: Joi.number(),
        address: Joi.string(),
        role:Joi.string(),
        password: Joi.string().required()
      }).or("phone", "email");
      return JoiSchema.validate(user);
    };

    const response = validateUser(req.body);
    if (response.error) {
      res.status(400).json({
        message: response.error.details[0].message,
        status: 400,
        success: false,
      });
    } else {
      next();
    }
},

exports.loginsellerValidation = (req, res, next) => {
  const loginUser = (user) => {
    const JoiSchema = Joi.object({
      login: Joi.string().required(),
    //   email: Joi.string().email().min(5).max(50).required(),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    }).options({ abortEarly: false });
    return JoiSchema.validate(user);
  };
  const response = loginUser(req.body);
  if (response.error) {
    res.status(400).json({
      message: response.error.details[0].message,
      status: 400,
      success: false,
    });
  } else {
    next();
  }
}
