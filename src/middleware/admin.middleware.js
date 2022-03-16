const Joi = require('joi');
exports.adminValidation = (req, res, next) => {
    const validateUser = (user) => {
      const JoiSchema = Joi.object({
        email: Joi.string().email(),
        password: Joi.string().required()
      }).or( "email");
      return JoiSchema.validate(user);
    };

    const response = validateUser(req.body);
    if (response.error) {
     return res.status(400).json({
        message: response.error.details[0].message,
        status: 400,
        success: false,
      });
    } else {
      next();
    }
}